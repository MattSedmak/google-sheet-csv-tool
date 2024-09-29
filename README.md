# Google Sheet Tool

An automation tool that parses a CSV file containing monthly transactions from my internet bank and imports them into a Google Spreadsheet set up for expense tracking and budgeting.

## How to Use

1. Place the CSV file in the same directory as the tool.
2. Run the following command, providing two arguments:
   - `args[2]`: The name of the Google Sheet.
   - `args[3]`: The name of the CSV file (e.g., `transactions.csv`).

### Example:

```bash
npx ts-node src/index.ts May2024 transactions.csv
```
