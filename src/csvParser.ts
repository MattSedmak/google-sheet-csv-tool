import { parse } from 'csv-parse';
import fs from 'fs';
import { finished } from 'stream/promises';
import { getCategory } from './helpers/getCategory';
import path from 'path';

const csvFileName = process.argv[3];

export const processFile = async () => {
  const expenses: any[] = [];
  const parser = fs
    .createReadStream(path.join(__dirname, '../../', csvFileName))
    .pipe(
      parse({
        delimiter: ';',
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
    );
  // Use 'readable' for large amount of data otherwise 'data' is fine.
  parser.on('readable', () => {
    let expense;
    while ((expense = parser.read()) !== null) {
      const category = getCategory(expense['Text']);
      expenses.push([
        expense['Valutadatum'],
        parseFloat(expense['Belopp']),
        category,
        expense['Text'],
      ]);
    }
  });
  await finished(parser);
  return expenses;
};
