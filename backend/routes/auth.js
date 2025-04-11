import express from 'express';
import db from '../db.js';

const router = express.Router();

// Signup
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'Missing fields' });
  
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, result) => {
      if (err) return res.status(500).json({ error: 'Signup failed' });
      res.status(201).json({ message: 'User created', id: result.insertId });
    });
  });
  
// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
        if (err || results.length === 0)
            return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
        }
    );
});
export default router;
