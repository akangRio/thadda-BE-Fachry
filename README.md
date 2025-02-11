# 📚 Book Management API

## 📖 Overview
This project is a simple **Book Management API** built using **Node.js, Express, Prisma, and SQLite**. It allows users to **create, retrieve, update, and delete books** while implementing **user authentication with JWT**.

---

## 🚀 Getting Started
Follow these steps to set up and run the project locally.

### 📌 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 📌 2. Install Dependencies
```bash
npm install
```
This will install required packages such as:
- **Express** (Web framework)
- **Prisma** (Database ORM)
- **JWT** (Authentication)
- **Swagger** (API documentation)

---

## 🗄️ Database Setup

### 📌 3. Initialize Prisma and SQLite
```bash
npx prisma generate
```

### 📌 4. Apply Database Migrations
```bash
npx prisma migrate dev --name init
```

### 📌 5. Seed the Database (Optional)
```bash
npx prisma db seed
```

---

## 🔑 Authentication
This project uses **JWT Bearer Token** authentication for managing books. **User authentication is required for book-related endpoints.**

---

## ▶️ Running the Project

### 📌 6. Start the Server
```bash
npm start
```
By default, the server runs on **http://localhost:3000**

---

## 📖 API Documentation (Swagger)
Once the server is running, open your browser and go to:
```
http://localhost:3000/api-docs
```
Here you can explore and test the API endpoints interactively.

---

## 🔥 API Endpoints

### 🛠️ User Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/login` | Login user and get JWT token |
| POST | `/api/createUser` | Create a new user |

### 📚 Book Management (Requires Bearer Token)
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Create a new book |
| GET | `/api/books/:id` | Get a book by ID |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

---

## ⚙️ Environment Variables
Before running the project, make sure to set up the `.env` file:
```ini
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3000
```

---

## 🛠️ Development Tools
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **SQLite** - Lightweight database
- **JWT** - Authentication mechanism
- **Swagger** - API documentation

---

## 🤝 Contributing
Feel free to submit issues and pull requests to improve this project!

---

## 📝 License
This project is licensed under **MIT License**.
