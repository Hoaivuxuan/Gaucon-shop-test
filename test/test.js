const express = require('express');
const app = express();

const books = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.json(book);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
