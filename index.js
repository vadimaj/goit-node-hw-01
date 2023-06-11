const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./contacts");

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getContactsList();
      console.table(allContacts);
      break;
    case "getContactById":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;
    case "removeById":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
