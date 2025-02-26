import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'bookshelf_app'
}).promise()

const result = await pool.query('SELECT * FROM books')
console.log(result)