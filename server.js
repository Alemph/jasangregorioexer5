import express from 'express';
import fs from 'fs'; // Import filesystem module for reading and writing files

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST method to add books
app.post('/add-book', (req, res) => {
  const { Bookname, ISBN, Author, Year_Published } = req.body;
  if (!Bookname || !ISBN || !Author || !Year_Published) {
    return res.json({ success: false });
  }

  const bookEntry = `${Bookname},${ISBN},${Author},${Year_Published}\n`;
  fs.appendFile('books.txt', bookEntry, (err) => {
    if (err) {
      console.error(err);
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

// GET method to retrieve book details by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
  const { isbn, author } = req.query;

  fs.readFile('books.txt', "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.send([]);
    }

    const books = data.split('\n');
    const results = books.filter(book => book.includes(isbn) && book.includes(author));

    res.send(results);
  });
});

app.get('/find-by-author', (req, res) => {
  fs.readFile('books.txt', "utf8", (err, data) => { // Correctly use fs.readFile
    if (err) {
      console.error(err);
      res.status(500).send('Error reading book data.');
      return;
    }

    const lines = data.split('\n');
    const results = [];

    lines.forEach(line => {
      const lineElements = line.split(',');
      if (lineElements[2] === req.query.author) {
        console.log('Found it:' + line);
        results.push(line);
      }
    });

    res.json(results); // Send the results as a JSON response
  });
});


app.listen(3000, () => {
  console.log('Server started at port 3000');
});
