const chalk = require('chalk')
const { Command } = require('commander')

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require('./contacts')

const program = new Command()

program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break

    case 'get':
      const contactById = await getContactById(id)
      if (contactById) {
        console.log(chalk.green.bgBlack.underline.bold('Contact found'))
        console.log(contactById)
        return
      }
      console.log(chalk.blue.bgBlack.underline.bold('Contact not found'))

      break

    case 'add':
      const contactToAdd = await addContact(name, email, phone)
      console.log(chalk.green.bgBlack.underline.bold('Add new contact'))
      console.log(contactToAdd)
      break

    case 'remove':
      const contactToRemove = await removeContact(id)
      console.log(chalk.yellowBright.bgBlack.underline.bold('Contact removed'))
      console.table(contactToRemove)
      break

    default:
      console.warn(chalk.red.bgBlack.underline.bold('Unknown action type!'))
  }
}

invokeAction(argv).then(() =>
  console.log(chalk.blue.bgBlack.underline.bold('Operation success')),
)
