import fs from 'fs/promises';
import { PATH_DB } from '../constants/constants.js';
import { createFakeContact } from '../createFakeContact/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const data = await fs.readFile(PATH_DB);
    const contactsArr = JSON.parse(data);
    for (let i = 0; i < number; i += 1) {
      contactsArr.push(createFakeContact());
    }
    const newData = JSON.stringify(contactsArr, null, 2);
    await fs.writeFile(PATH_DB, newData);
    console.log('Дані успішно записані у файл.');
  } catch (err) {
    console.error(err);
  }
};

generateContacts(5);
