const { log } = require("console");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

//showing the list of contacts
 async function listContacts() {
   try {
     const data = await fs.readFile(contactsPath, "utf8");
    //  console.log("List of contacts:",'\n',JSON.parse(data).map((item=>item.name)).join('\n'));
     console.table(JSON.parse(data));
   } catch (error) {
     console.log("error", error);
   }
 
 }
  
 async function getContactById(contactId) {
// console.log('helooooooooooooooo',contactId);  
try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data).find(item=>item.id==contactId));
  } catch (error) {
    console.log("error", error);
  }
}
  
  async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        // console.table(JSON.parse(data).filter(item=>item.id!=contactId));
////////
let afterRemoveData= JSON.parse(data).filter(item=>item.id!=contactId)

      await fs.writeFile(contactsPath, JSON.stringify(afterRemoveData),'utf8',(err)=>{ 
        if (err) throw err;}
        )

        listContacts()
////////


      } catch (error) {
        console.log("error", error);
      }
  }
  
  async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      let newContent= JSON.parse(data)
newContent.push(
  {
    id: `${Math.max.apply(null,JSON.parse(data).map(item=>item.id))+1}`,
    name,
    email,
    phone
  }
)

      await fs.writeFile(contactsPath, JSON.stringify(newContent),'utf8',(err)=>{ 
        if (err) throw err;}
        )

        listContacts()

    } catch (error) {
      console.log("error", error);
    }  
  }
  module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact


}