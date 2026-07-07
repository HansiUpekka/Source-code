const { randomBytes, scryptSync } = require("crypto");

const db = require("../config/db");

const normalizeEmail = email => email.trim().toLowerCase();

const hashPassword = password => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${derivedKey}`;
};

const createAccount = async (req, res) => {
  try {
    const fullName = (req.body.fullName || req.body.name || "").trim();
    const email = (req.body.email || "").trim();
    const password = req.body.password || "";
    const confirmPassword = req.body.confirmPassword || req.body.confirm_password || password;

    if (!fullName || !email || !password) {
      return res.status(400).send({
        working: false,
        message: "Full name, email, and password are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({
        working: false,
        message: "Password and confirmation do not match.",
      });
    }

    if (password.length < 8) {
      return res.status(400).send({
        working: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const emailAddress = normalizeEmail(email);

    const existingUser = await db.query("SELECT id FROM users WHERE email = $1", [emailAddress]);

    if (existingUser.rows.length > 0) {
      return res.status(409).send({
        working: false,
        message: "An account with that email already exists.",
      });
    }

    const passwordHash = hashPassword(password);

    const createdUser = await db.query(
      `INSERT INTO users (full_name, email, password_hash, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, full_name, email, created_at`,
      [fullName, emailAddress, passwordHash]
    );

    return res.status(201).send({
      working: true,
      message: "Account created successfully.",
      user: createdUser.rows[0],
    });
  } catch (error) {
    console.error("Create account error:", error);
    return res.status(500).send({
      working: false,
      message: "Unable to create account.",
    });
  }
};

module.exports = {
  createAccount,
};