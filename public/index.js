
const socket = io()

let loggedIn = false;

socket.on("update", (message) => {
    showStocks();
    let stocks = message.quotes;
    if (stocks) {
        fillList(stocks);
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
    let card = document.createElement("div");
    card.classList.add("card");
    let positive = stock.regularMarketChangePercent > 0;
    card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${stock.symbol} - ${stock.shortName} </h5>
      <p class="card-text bigger">${stock.regularMarketPrice.toFixed(2)}</p>
      <p class="card-text ${positive ? "green" : "red"}">${positive && "+"}${stock.regularMarketChange.toFixed(2)} (${positive && "+"}${stock.regularMarketChangePercent.toFixed(2)})</p>

  </div>
    `;
    return card;
}

socket.on("logged_in", () => {
    loggedIn = true;
    showStocks();
})

function showStocks() {
    document.getElementById("two_factor").classList.add("hidden");
    document.getElementById("stocks").classList.remove("hidden");
}

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


let fullscreen = document.getElementById("fullscreen");
let exit = document.getElementById("exit");

fullscreen.addEventListener("click", () => {
    document.getElementById("stocks").requestFullscreen();
    fullscreen.classList.add("hidden");  
    exit.classList.remove("hidden");
})

exit.addEventListener("click", () => {
    document.exitFullscreen();
    fullscreen.classList.remove("hidden");   
    exit.classList.add("hidden"); 
})