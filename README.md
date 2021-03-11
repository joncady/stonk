# Stonk

## "App" that pulls in your stocks from google spreadsheet and displays them conveniently on a page.

To use, add in service account credentials: Follow https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
Google spreadsheet usage: https://www.npmjs.com/package/google-spreadsheet

Create Google spreadsheet with column called `stocks` and stocks below in the rows

Add `.env` file in root directory with value:
```
SPREADSHEET=<SPREADSHEET_ID>
```

Intended for Raspberry PI / small screen device as a quick ticker to see saved stocks stocks.

Updates at configurable interval.

To update:
- Add sound effect