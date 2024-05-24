import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';
import { createFakeContact } from '../createFakeContact/createFakeContact.js';

export const addOneContact = async () => {
  const oneContact = createFakeContact();

  let data;

  try {
    data = await fs.readFile(PATH_DB);
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }

  const newContactsArr = JSON.parse(data);
  newContactsArr.push(oneContact);
  const newData = JSON.stringify(newContactsArr);

  try {
    await fs.writeFile(PATH_DB, newData);
    console.log('Дані успішно записані у файл.');
  } catch (err) {
    console.error('Помилка запису у файл:', err);
  }
};

addOneContact();
