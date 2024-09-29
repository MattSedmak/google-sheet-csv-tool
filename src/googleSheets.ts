import { sheets_v4 } from 'googleapis';
import 'dotenv/config';
const { google } = require('googleapis');

const args = process.argv;

// Create client
export async function getSheetsClient(): Promise<sheets_v4.Sheets> {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets: sheets_v4.Sheets = google.sheets({
    version: 'v4',
    auth: client,
  });

  return sheets;
}

export async function updateGoogleSheet(sheets: sheets_v4.Sheets, expenses: any[]) {
  const spreadsheetId = process.env.SPREAD_SHEET_ID;
  const range = args[2] + '!A:D';

  const resource = {
    values: expenses,
  };

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: resource,
    });
    console.log(`${res.data.updates?.updatedCells} cells updated.`);
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
  }
}
