import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';

export const countContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB);
    return JSON.parse(data).length;
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
};

console.log(countContacts());
