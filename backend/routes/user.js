import express from 'express';
import db from '../db.js';

const router = express.Router();

// Signup
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// Login (simple match check)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length > 0) {
        res.json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );
});

export default router;
