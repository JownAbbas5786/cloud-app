const pool = require('../db');
const bcrypt = require('bcrypt');
const client = require('../redisClient');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users(username, password) VALUES($1, $2) RETURNING id',
    [username, hashed]
  );
  res.status(201).json({ message: 'User created', id: result.rows[0].id });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (!user.rows.length) return res.status(400).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  await client.set(`user:${username}`, JSON.stringify(user.rows[0]), 'EX', 3600);
  res.status(200).json({ message: 'Login successful' });
};
