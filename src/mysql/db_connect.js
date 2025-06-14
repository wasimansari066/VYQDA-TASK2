const mysql = require("mysql2/promise");

// createPool is more appropriate when using connectionLimit
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
db.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

module.exports = db;

/*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
