
const axios = require('axios');

const BASE_URL = 'http://localhost:8800';

// Helper function to retrieve all books
async function fetchAllBooks() {
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Accept: 'application/json' }
    });

    if (response.status === 200) {
      return response.data;
    }

    return { message: 'Unable to retrieve books' };

  } catch (error) {
    if (error.response) {
      return {
        message: 'Request failed',
        status: error.response.status
      };
    }

    return { message: error.message };
  }
}

// Retrieve all books
async function getAllBooks() {
  const books = await fetchAllBooks();

  if (!books || books.message) {
    return books;
  }

  return books;
}

// Retrieve book by ISBN
async function getBooksByISBN(isbn) {
  try {
    const books = await fetchAllBooks();

    if (!books || books.message) {
      return books;
    }

    const result = Object.entries(books)
      .filter(([bookISBN]) => bookISBN === String(isbn))
      .map(([bookISBN, book]) => ({
        isbn: bookISBN,
        ...book
      }));

    if (result.length === 0) {
      return { message: 'Book not found' };
    }

    return result;

  } catch (error) {
    return { message: error.message };
  }
}

// Retrieve books by author
async function getBooksByAuthor(author) {
  try {
    const books = await fetchAllBooks();

    if (!books || books.message) {
      return books;
    }

    const result = Object.entries(books)
      .filter(([isbn, book]) =>
        book.author.toLowerCase().includes(author.toLowerCase())
      )
      .map(([isbn, book]) => ({
        isbn,
        ...book
      }));

    if (result.length === 0) {
      return { message: 'No books found for this author' };
    }

    return result;

  } catch (error) {
    return { message: error.message };
  }
}

// Retrieve books by title
async function getBooksByTitle(title) {
  try {
    const books = await fetchAllBooks();

    if (!books || books.message) {
      return books;
    }

    const result = Object.entries(books)
      .filter(([isbn, book]) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      )
      .map(([isbn, book]) => ({
        isbn,
        ...book
      }));

    if (result.length === 0) {
      return { message: 'No books found with this title' };
    }

    return result;

  } catch (error) {
    return { message: error.message };
  }
}

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
