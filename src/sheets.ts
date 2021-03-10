import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
const creds = require("./creds/creds.json");

// Fetches list of stocks from google doc
export async function authAndFetchSheet() {
    const spreadsheetId = process.env.SPREADSHEET || "";
    if (!spreadsheetId) {
        return [];
    }
    const doc = new GoogleSpreadsheet(spreadsheetId);

    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    let stocks: string[] = []
    if (rows) {
        return rows.map((row: GoogleSpreadsheetRow) => {
            return row["stocks"];
        })
    } else {
        return stocks;
    }
}

