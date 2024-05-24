import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';

export const removeAllContacts = async () => {
  const contactsArr = JSON.stringify([]);

  try {
    await fs.writeFile(PATH_DB, contactsArr);
    console.log('Дані успішно видалені.');
  } catch (err) {
    console.error('Помилка видалення:', err);
  }
};

removeAllContacts();
