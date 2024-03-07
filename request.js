import needle from 'needle';

// Example data for testing the POST method
const bookData = {
  Bookname: "Harry Potter and the Chamber of Secrets",
  ISBN: "0-7475-3849-2",
  Author: "J.K Rowling",
  Year_Published: "1998"
};

needle.get('http://localhost:3000/find-by-author?author=J.K+Rowling', (err, res) => {
  if (err) throw err;
  console.log('Books by J.K Rowling:', res.body);
});

needle.get('http://localhost:3000/find-by-isbn-author?isbn=0-7475-3849-2&author=J.K+Rowling', (err, res) => {
  if (err) throw err;
  console.log('Book found:', res.body);
});

needle.post('http://localhost:3000/add-book', bookData, (err, res) => {
  if (err) throw err;
  console.log(res.body);   // Should print { success: true } or { success: false }
});
