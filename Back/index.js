const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database('./reservations.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the reservations database.');
});

app.use(express.json());

// GET all products
app.get('/reservations', (req, res) => {
  db.all('SELECT * FROM reserv_table', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.send(rows);
    }
  });
});

// GET single product by ID
app.get('/reservation/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).send('Invalid ID format');
  }
  db.get('SELECT * FROM reserv_table WHERE id = ?', id, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (!row) {
      res.status(404).send('Product not found');
    } else {
      res.send(row);
    }
  });
});

// POST new product
app.post('/reservation', (req, res) => {
  const { name, nbr_personne, phone_number, date_heure } = req.body;
  if (!name || !phone_number) {
    res.status(400).send('Name and phone_number are required');
  } else {
    const sql = 'INSERT INTO reserv_table (name, nbr_personne, phone_number, date_heure) VALUES(?, ?, ?, ?);';
    db.run(sql, [name, nbr_personne, phone_number, date_heure], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else {
        const id = this.lastID;
        res.status(201).send({ id, name, nbr_personne, phone_number, date_heure });
      }
    });
  }
});

// PUT update product by ID
app.put('/reservation/:id', (req, res) => {
  const { id } = req.params;
  const { name, nbr_personne, phone_number, date_heure } = req.body;
  if (!name || !phone_number) {
    res.status(400).send('Name and phone_number are required');
  } else {
    const sql = 'UPDATE reserv_table SET name=?, nbr_personne=?, phone_number=?, date_heure=? WHERE id=?;';
    db.run(sql, [name, nbr_personne, phone_number, date_heure, id], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (this.changes === 0) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).send({ id, name, nbr_personne, phone_number, date_heure });
      }
    });
  }
});

// DELETE product by ID
app.delete('/reservation/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM reserv_table WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (this.changes === 0) {
      res.status(404).send('Product not found');
    } else {
      res.status(204).send();
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});