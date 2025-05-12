var mysql = require("mysql2/promise");
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 100,
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT) || 100,
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "payroll",
  connectTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 10000,
  waitForConnections: true,
  acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT) || 10000,
  debug: false,
  insecureAuth: true,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL Connection Error:", err.code, err.message);
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

async function transaction(callback) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();

    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  pool,
  transaction,
};
