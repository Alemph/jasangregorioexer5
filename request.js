import needle from 'needle';

// Example data for testing the POST method
const bookData = {
  Bookname: "Harry Potter and the Philosopher’s Stone",
  ISBN: "978-0-7475-3269-9",
  Author: "J.K Rowling",
  Year_Published: "1997"
};

needle.post('http://localhost:3000/add-book', bookData, (err, res) => {
  if (err) throw err;
  console.log(res.body);   // Should print { success: true } or { success: false }
});
