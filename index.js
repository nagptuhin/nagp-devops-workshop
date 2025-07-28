const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});


app.get('/', (req, res) => {
  console.log("Checking App Health");
  res.status(200).send('OK');
});

// Get all entries
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /data?name=John - search entries by name (case-insensitive, partial match)
app.get('/data', async (req, res) => {
  const name = req.query.name;
  try {
    let result;
    if (name) {
      result = await pool.query(
        'SELECT * FROM items WHERE LOWER(name) LIKE LOWER($1)',
        [`%${name}%`]
      );
    } else {
      result = await pool.query('SELECT * FROM items');
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});

// POST /data - insert new record
app.post('/data', async (req, res) => {
  const { name, age, gender, contact_info } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO items (name, age, gender, contact_info)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, age, gender || null, contact_info || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to insert record');
  }
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
