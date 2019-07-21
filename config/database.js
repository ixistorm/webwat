import mysql from "mysql";

const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "admin",
  password: "",
  database: "webwat"
});
export default connection;
