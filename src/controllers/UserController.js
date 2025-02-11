const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hasher, passValidator } = require("../helpers/bycrypt");
const { signToken } = require("../helpers/jwt");

const prisma = new PrismaClient();

class UserController {
  static async createUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const hashedPassword = hasher(password);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      delete user.user.password;

      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = passValidator(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = signToken({ userId: user.id });
      res.json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
