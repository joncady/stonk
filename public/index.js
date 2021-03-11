
const socket = io()

let stockLink = "https://thestockmarketwatch.com/stock/?stock=";

socket.on("update", (message) => {
    let stocks = message.quotes;
    if (stocks) {
        fillList(stocks);
        document.getElementById("lastUpdated").innerHTML = "<b>Last updated: </b>" + new Date().toLocaleString()
    }
})

function fillList(stocks) {
    let cardList = document.getElementById("stocks");
    cardList.innerHTML = "";
    stocks.forEach((stock) => {
        cardList.appendChild(createRow(stock));
    })
}

function createRow(stock) {

    const color = (stock) => {
        if (stock.regularMarketChangePercent > 0) {
            return "green";
        } else if (stock.regularMarketChangePercent < 0) {
            return "red";
        } else {
            return "";
        }
    }

    let card = document.createElement("div");
    card.classList.add("card");
    let positive = stock.regularMarketChangePercent > 0;
    card.innerHTML = `
    <div class="card-body" data-target="#modal" data-toggle="modal">
      <h5 class="card-title">${stock.symbol} - ${stock.shortName} </h5>
      <p class="card-text bigger">${stock.regularMarketPrice.toFixed(2)}</p>
      <p class="card-text ${color(stock)}">${positive ? "+" : ""}${stock.regularMarketChange.toFixed(2)} (${positive ? "+" : ""}${stock.regularMarketChangePercent.toFixed(2)})</p>
  </div>
    `;
    card.addEventListener("click", () => {
        new TradingView.widget(
            {
            "width": "100%",
            "height": "100%",
            "symbol": stock.symbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "stockFrame"
          }
            );
    });
    return card;
}

/** for robinhood flow
let input = "";

function changeInput(number) {
    if (number === "C") {
        input = "";
    } else if (number === "D") {
        if (!input) return;
        input = input.substring(0, input.length - 1);
    } else {
        input += number;
    }
    document.getElementById("output").innerText = input;
}

document.querySelectorAll(".digit").forEach((el) => {
    el.addEventListener("click", (element) => {
        changeInput(element.target.innerText)
    })
})

document.getElementById("submit").addEventListener("click", () => {
    if (input.length !== 6) return;
    socket.emit("login_code", { code: input });
});
*/

let fullscreen = document.getElementById("fullscreen");
let exit = document.getElementById("exit");
let refreshStocks = document.getElementById("refreshStocks");

fullscreen.addEventListener("click", () => {
    document.getElementById("stockWindow").requestFullscreen();
    fullscreen.classList.add("hide");
    exit.classList.remove("hide");
})

exit.addEventListener("click", () => {
    document.exitFullscreen();
    fullscreen.classList.remove("hide");
    exit.classList.add("hide");
})

refreshStocks.addEventListener("click", () => {
    socket.emit("refreshStocks");
});