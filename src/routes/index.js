const express = require("express");
const BookController = require("../controllers/BookController");
const authenticating = require("../middleware/authenticator");
const errorHandler = require("../middleware/errorHandler");
const UserController = require("../controllers/UserController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Users
 *     description: User authentication
 *   - name: Books
 *     description: Book management (requires authentication)
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secretpassword
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 */

/**
 * @swagger
 * /api/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/login", UserController.login);
router.post("/createUser", UserController.createUser);

router.use(authenticating);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/books", BookController.getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 example: "1925-04-10"
 *               numberOfPages:
 *                 type: integer
 *                 example: 180
 *               userId:
 *                 type: string
 *                 example: "user-uuid"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/books", BookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.get("/books/:id", BookController.getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book's details
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby - Updated Edition"
 *               numberOfPages:
 *                 type: integer
 *                 example: 200
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.put("/books/:id", BookController.editBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.delete("/books/:id", BookController.deleteBook);

router.use(errorHandler);

module.exports = router;
