interface Quote {
    quoteType:string;
    currency: string;
    postMarketChangePercent: number;
    postMarketTime: number
    postMarketPrice: number;
    postMarketChange: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: number
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
    fullExchangeName:string
    regularMarketOpen: number;
    averageDailyVolume3Month: number;
    averageDailyVolume10Day: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh:number;
    earningsTimestamp: number;
    earningsTimestampStart: number;
    earningsTimestampEnd: number;
    trailingPE: number;
    epsTrailingTwelveMonths: number;
    epsForward: number;
    epsCurrentYear: number;
    priceEpsCurrentYear: number;
    sharesOutstanding: number;
    bookValue: number;
    fiftyDayAverage: number;
    fiftyDayAverageChange: number;
    fiftyDayAverageChangePercent: number;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
    marketCap: number;
    forwardPE: number;
    priceToBook: number;
    tradeable: boolean;
    marketState: string;
    shortName: string;
    longName: string;
    displayName: string;
    symbol: string;
}

export default Quote;