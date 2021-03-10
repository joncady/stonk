// code not needed for current impl, feel free to modify in away way
// Uses puppeteer to log in to robinhood, and get top stocks. can do other things


/**
const username = process.env.ROBINHOOD_USERNAME || "";
const password = process.env.ROBINHOOD_PASSWORD || "";

async function logInToRobinhood(socket: Socket, page: Page) {

    const logIn = async () => {
        // not logged in:
        await page.goto("https://robinhood.com/login", { waitUntil: 'networkidle0' });

        await page.type("input[name=username]", username);
        await page.type("input[type=password]", password);
        await page.click('button[type="submit"]');

        await Promise.race([
            page.waitForXPath('//span[contains(text(), "SMS")]'),
            page.waitForSelector('div[data-testid="PortfolioDetail"]')
        ]);

        let pageTitle = await page.title();
        console.log(pageTitle)
        if (pageTitle.includes("Portfolio")) {
            fetchSymbols(page, socket);
        } else {
            await page.click("button")

            socket.on("login_code", async (message) => {
                let code = message.code;

                await page.type("input", code);
                await page.click("button[type=submit]");

                fetchSymbols(page, socket);
            })
        }
    }

    logIn();

}

async function checkLogIn(socket: Socket) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        const cookies = fs.readFileSync('cookies.json', 'utf8');
        const deserializedCookies = JSON.parse(cookies);
        await page.setCookie(...deserializedCookies);
    } catch {
        console.log("No cookies found.");
    }

    await page.goto("https://robinhood.com", { waitUntil: 'networkidle0' });
    const pageTitle = await page.title();
    console.log(pageTitle)
    if (pageTitle !== "" && pageTitle.includes("Portfolio")) {
        fetchSymbols(page, socket);
    } else {
        logInToRobinhood(socket, page);
    }
}

async function fetchSymbols(page: Page, socket: Socket) {
    socket.emit("logged_in");

    await page.waitForSelector('div[data-testid="PositionCell"]');
    console.log("entered fetch")
    let stocks = await page.evaluate(() => {
        let total: string[] = [];
        let elements = document.querySelectorAll('.sidebar-content div[data-testid="PositionCell"]');
        console.log(elements);
        elements.forEach((el: any) => {
            total.push(el.innerText.split("\n")[0]);
        })
        return total;
    })
    // let cryptos = await page.evaluate(() => {
    //     let total: string[] = [];
    //     document.querySelectorAll('.sidebar-content div[data-testid="CryptoCell"]')
    //         .forEach((el: any) => {
    //             total.push(el.innerText.split("\n")[0]);
    //         })
    //     return total;
    // })
    stockSymbols = new Set(stocks);

    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies);

    fs.writeFileSync('cookies.json', cookieJson);

    if (stocks.length > 0) {
        startFetchingStockData(io);
    }

    page.close();
}

*/