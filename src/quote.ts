import fetch from 'node-fetch';
import Quote from './model/Quote';

const BASE_URL = "https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com"

export const getQuotes = async (quoteList: String[]) => {
    const response = await fetch(`${BASE_URL}&symbols=${quoteList.join(",")}`)
    if (response.ok) {
        console.log("Fetched stock updates")
        const data = await response.json();
        const stocks = data.quoteResponse.result;
        return stocks as Quote;
    } else {
        console.log(response.statusText)
    }
}