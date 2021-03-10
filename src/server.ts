import express from 'express';
import { Socket } from 'socket.io';
import { getQuotes } from './quote';
import { authAndFetchSheet } from './sheets';
const PORT = 3000;
const INTERVAL = 60000;

require('dotenv').config()

let stockSymbols = new Set<String>();

let interval: NodeJS.Timeout | null = null;

const app = express()

const httpServer = require('http').Server(app);

app.use(express.static('public'))

const io = require("socket.io")(httpServer);

// Set up persistent interval that publishes new stock data to connected clients
io.on("connection", async (socket: Socket) => {

    if (stockSymbols.size > 0 && !interval) {
        startFetchingStockData();
    } else {
        let stocks = await authAndFetchSheet();
        stockSymbols = new Set(stocks);
        startFetchingStockData();
    }

    socket.on("refreshStocks", async () => {
        console.log("Updating stocks...")
        let stocks = await authAndFetchSheet();
        stockSymbols = new Set(stocks);
        startFetchingStockData();
    })

    socket.on("disconnect", () => {
        if (io.engine.clientsCount === 0) {
            clearInterval(interval!);
            interval = null;
        }
    })
})

function startFetchingStockData() {

    const fetch = async () => {
        const quotes = await getQuotes(Array.from(stockSymbols));
        io.emit("update", {
            quotes
        });
    }

    fetch();

    return setInterval(fetch, INTERVAL);
}

app.get('/', async (req, res) => {
    res.sendFile("index.html")
})

httpServer.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
