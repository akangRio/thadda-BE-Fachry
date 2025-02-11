const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class BookController {
  // Create a new book
  static async createBook(req, res) {
    try {
      const { title, author, publishedDate, numberOfPages } = req.body;
      const { userId } = req.identity;
      if (!title || !author || !publishedDate || !numberOfPages || !userId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const book = await prisma.book.create({
        data: {
          title,
          author,
          publishedDate: new Date(publishedDate),
          numberOfPages,
          userId,
        },
      });

      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all books
  static async getBooks(req, res) {
    try {
      const books = await prisma.book.findMany();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get a book by ID
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await prisma.book.findUnique({ where: { id } });

      if (!book) return res.status(404).json({ message: "Book not found" });

      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update a book
  static async editBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, publishedDate, numberOfPages } = req.body;

      const existingBook = await prisma.book.findUnique({ where: { id } });
      if (!existingBook)
        return res.status(404).json({ message: "Book not found" });

      const book = await prisma.book.update({
        where: { id },
        data: {
          title: title || existingBook.title,
          author: author || existingBook.author,
          publishedDate: publishedDate
            ? new Date(publishedDate)
            : existingBook.publishedDate,
          numberOfPages: numberOfPages || existingBook.numberOfPages,
        },
      });

      res.json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Delete a book
  static async deleteBook(req, res) {
    try {
      const { id } = req.params;

      const existingBook = await prisma.book.findUnique({ where: { id } });
      if (!existingBook)
        return res.status(404).json({ message: "Book not found" });

      await prisma.book.delete({ where: { id } });

      res.json({ message: "Book successfully deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = BookController;
