const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (body) => {
  const { email, password } = body;

  // find user
  const { rows } = await db.query('SELECT * FROM "users" WHERE email = $1', [email]);
  if (rows.length === 0) {
    throw new Error('Email or password is incorrect');
  }

  // compare password
  const validPassword = await bcrypt.compare(password, rows[0].password);
  if (!validPassword) {
    throw new Error('Invalid credentials');
  }

  // generate token
  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

exports.active = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { rows } = await db.query('SELECT * FROM "users" WHERE id = $1', [decoded.id]);
  return rows[0];
};