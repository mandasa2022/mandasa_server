const mysql = require('mysql')
const db = mysql.createConnection({
host: "pscadda.com",
user: "pscadda_drillcut",
password: "Pscaddadrillcut",
database:"pscadda_drillcut",
port: 3306,
insecureAuth: true
// host: "localhost",
// user: "root",
// password: "",
// database:"drillcut" 
})

module.exports = db;