var mysql = require("mysql2/promise");

var pool = mysql.createPool({
  connectionLimit: 10,
  queueLimit: 100,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "V0ltP@ssw0rd",
  database: "payroll",
  connectTimeout: 10000,
  waitForConnections: true,
  acquireTimeout: 10000,
  debug: false,
  insecureAuth: true,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL Connection Error:", err.code, err.message);
    console.error("Full Error:", err);
    return;
  }

  conn.query("SELECT * FROM employee;", (err, results) => {
    conn.release();
    if (err) console.error("Query Test Failed:", err);
    else console.log("Connection Successful! Test Result:", results);
  });
});

pool.on("connection", function (connection) {
  console.log("MySQL DB Connection established");
});

pool.on("acquire", function (connection) {
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("enqueue", function () {
  console.log("Waiting for available connection slot...");
});

pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

module.exports = pool;
