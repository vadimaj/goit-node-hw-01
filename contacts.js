const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getContactsList = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await getContactsList();
  const contactId = String(id);
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (data) => {
  const allContacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await getContactsList();
  const contactId = String(id);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = { getContactsList, getContactById, addContact, removeContact };
