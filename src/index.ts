import { processFile } from './csvParser';
import { getSheetsClient, updateGoogleSheet } from './googleSheets';

async function main() {
  try {
    const sheets = await getSheetsClient();
    const expenses = await processFile();
    if (expenses.length > 0) {
      await updateGoogleSheet(sheets, expenses);
    } else {
      console.log('No expenses found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error);

//npx ts-node src/index.ts month filename
//eg. npx ts-node src/index.ts Aug2024 kontoutdragAug.csv
