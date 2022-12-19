const {createPool}=require("mysql");
const pool= createPool({
    port:3306,
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'databasename',
    connectionLimit:10 
  });
  console.log("hi");
  module.exports=pool;
  //connection.connect()