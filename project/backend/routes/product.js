import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add product
router.post('/', (req, res) => {
  const { name, price, image_url } = req.body;
  db.query(
    'INSERT INTO products (name, price, image_url) VALUES (?, ?, ?)',
    [name, price, image_url],
    (err, result) => {
      if (err) return res.status(500).send(err);
      // res.json({ id: result.insertId });
      const insertedId = result.insertId;

      // Fetch the newly inserted product
      db.query('SELECT * FROM products WHERE id = ?', [insertedId], (err, rows) => {
        if (err) return res.status(500).send(err);
        // return the new product
        res.status(201).json(rows[0]); 
      });

    }
  );
});

// Delete product
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

// Update product (PATCH request)
router.patch('/:id', (req, res) => {
  const { name, price, image_url } = req.body;
  // updateFields store field names for which the values weren't undefined
  const updateFields = [];
  // actual values to insert
  const values = [];

  // determine which fields are to be updated,

  if (name) {
    updateFields.push('name = ?');
    values.push(name);
  }
  if (price) {
    updateFields.push('price = ?');
    values.push(price);
  }
  if (image_url) {
    updateFields.push('image_url = ?');
    values.push(image_url);
  }

  if (updateFields.length === 0) {
    return res.status(400).send('No fields to update');
  }

  // add product id to the end of values arr
  values.push(req.params.id);

  // create sql query
  const sql = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    // Fetch and return the updated product
    db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows[0]);
    });
  });
});

export default router;
