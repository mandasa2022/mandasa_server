const mysql = require('mysql')
const db = mysql.createConnection({
// host: "34.68.150.185",
// user: "root",
// password: "Drillcut@2022",
// database:"Drillcut" 
host: "localhost",
user: "root",
password: "",
database:"drillcut" 
})

module.exports = db;