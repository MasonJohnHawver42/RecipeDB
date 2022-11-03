const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

let db = new sqlite3.Database('recipes.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the Recipes SQlite database.');
});

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(8000, () => console.log('App is listening on port http://127.0.0.1:8000.'));

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
