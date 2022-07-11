const mysql = require("mysql");

const env = {
    DB_HOST : "localhost",
    DB_USER : "root",
    DB_PASS : "Itrustingod1998",
    DB_NAME : "authen",
    DB_PORT : "3307",
  };

let connection = mysql.createPool({
    port : env.DB_PORT,
    host : env.DB_HOST,
    user : env.DB_USER,
    password : env.DB_PASS,
    database: env.DB_NAME
});

module.exports = connection;