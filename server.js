const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();

const PORT = process.env.PORT || 3000;

/*
=====================================================
CONFIG
=====================================================
*/

const USERS_FILE = path.join(__dirname, "users.json");

/*
=====================================================
MIDDLEWARE
=====================================================
*/

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

/*
=====================================================
USERS DATABASE
Simple JSON database for this stage.
=====================================================
*/

function ensureUsersFile() {

  if (!fs.existsSync(USERS_FILE)) {

    fs.writeFileSync(
      USERS_FILE,
      "[]",
      "utf8"
    );

  }

}

function readUsers() {

  ensureUsersFile();

  try {

    const data =
      fs.readFileSync(
        USERS_FILE,
        "utf8"
      );

    const users =
      JSON.parse(data);

    return Array.isArray(users)
      ? users
      : [];

  } catch (error) {

    console.error(
      "Users database read error:",
      error
    );

    return [];

  }

}

function writeUsers(users) {

  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify(
      users,
      null,
      2
    ),
    "utf8"
  );

}

/*
=====================================================
PASSWORD HASHING
=====================================================
*/

function hashPassword(password) {

  const salt =
    crypto.randomBytes(16).toString("hex");

  const hash =
    crypto.scryptSync(
      password,
      salt,
      64
    ).toString("hex");

  return {
    salt,
    hash
  };

}

function verifyPassword(
  password,
  storedHash,
  salt
) {

  const hash =
    crypto.scryptSync(
      password,
      salt,
      64
    ).toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(storedHash, "hex")
  );

}

/*
=====================================================
SESSIONS
=====================================================
*/

const sessions = new Map();

function createSession(userId) {

  const token =
    crypto.randomBytes(32).toString("hex");

  sessions.set(
    token,
    {
      userId,
      createdAt: Date.now()
    }
  );

  return token;

}

function getTokenFromRequest(req) {

  const header =
    req.headers.authorization || "";

  if (
    !header.startsWith("Bearer ")
  ) {

    return null;

  }

  return header.slice(7).trim();

}

function requireAuth(req, res, next) {

  const token =
    getTokenFromRequest(req);

  if (!token) {

    return res.status(401).json({

      success: false,

      message:
        "Please login first."

    });

  }

  const session =
    sessions.get(token);

  if (!session) {

    return res.status(401).json({

      success: false,

      message:
        "Your session has expired. Please login again."

    });

  }

  const users =
    readUsers();

  const user =
    users.find(
      item =>
        item.id === session.userId
    );

  if (!user) {

    sessions.delete(token);

    return res.status(401).json({

      success: false,

      message:
        "User account was not found."

    });

  }

  req.user = user;
  req.token = token;

  next();

}

/*
=====================================================
PUBLIC USER DATA
=====================================================
*/

function publicUser(user) {

  return {

    id: user.id,

    name: user.name,

    mobile: user.mobile,

    email: user.email,

    role: user.role,

    createdAt: user.createdAt

  };

}

/*
=====================================================
SERVE FRONTEND
=====================================================
*/

app.use(
  express.static(
    path.join(__dirname)
  )
);

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "index.html"
    )
  );

});

/*
=====================================================
HEALTH CHECK
=====================================================
*/

app.get(
  "/api/health",
  (req, res) => {

    res.json({

      success: true,

      message:
        "BismiMart server is running.",

      time:
        new Date().toISOString()

    });

  }
);

/*
=====================================================
CREATE ACCOUNT
=====================================================
*/

app.post(
  "/api/signup",
  (req, res) => {

    try {

      const {
        name,
        mobile,
        email,
        password
      } = req.body;

      const cleanName =
        String(name || "").trim();

      const cleanMobile =
        String(mobile || "").trim();

      const cleanEmail =
        String(email || "")
          .trim()
          .toLowerCase();

      const cleanPassword =
        String(password || "");

      /*
      VALIDATION
      */

      if (!cleanName) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter your full name."

        });

      }

      if (cleanName.length < 2) {

        return res.status(400).json({

          success: false,

          message:
            "Name must contain at least 2 characters."

        });

      }

      if (!cleanMobile) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter your mobile number."

        });

      }

      if (!/^[0-9+\-\s]{7,20}$/.test(cleanMobile)) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid mobile number."

        });

      }

      if (
        cleanEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a valid email address."

        });

      }

      if (cleanPassword.length < 6) {

        return res.status(400).json({

          success: false,

          message:
            "Password must be at least 6 characters."

        });

      }

      /*
      CHECK EXISTING USERS
      */

      const users =
        readUsers();

      const mobileExists =
        users.some(
          user =>
            user.mobile === cleanMobile
        );

      if (mobileExists) {

        return res.status(409).json({

          success: false,

          message:
            "This mobile number is already registered."

        });

      }

      if (cleanEmail) {

        const emailExists =
          users.some(
            user =>
              user.email === cleanEmail
          );

        if (emailExists) {

          return res.status(409).json({

            success: false,

            message:
              "This email is already registered."

          });

        }

      }

      /*
      PASSWORD HASH
      */

      const passwordData =
        hashPassword(
          cleanPassword
        );

      /*
      NEW USER
      */

      const user = {

        id:
          crypto.randomUUID(),

        name:
          cleanName,

        mobile:
          cleanMobile,

        email:
          cleanEmail,

        passwordHash:
          passwordData.hash,

        passwordSalt:
          passwordData.salt,

        role:
          "customer",

        createdAt:
          new Date().toISOString()

      };

      users.push(user);

      writeUsers(users);

      /*
      LOGIN USER IMMEDIATELY
      */

      const token =
        createSession(user.id);

      return res.status(201).json({

        success: true,

        message:
          "Account created successfully.",

        token,

        user:
          publicUser(user)

      });

    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Unable to create account."

      });

    }

  }
);

/*
=====================================================
LOGIN
=====================================================
*/

app.post(
  "/api/login",
  (req, res) => {

    try {

      const {
        identifier,
        password
      } = req.body;

      const cleanIdentifier =
        String(identifier || "")
          .trim()
          .toLowerCase();

      const cleanPassword =
        String(password || "");

      if (!cleanIdentifier) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter your email or mobile number."

        });

      }

      if (!cleanPassword) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter your password."

        });

      }

      const users =
        readUsers();

      const user =
        users.find(
          item => {

            const mobile =
              String(
                item.mobile || ""
              ).toLowerCase();

            const email =
              String(
                item.email || ""
              ).toLowerCase();

            return (
              mobile === cleanIdentifier ||
              email === cleanIdentifier
            );

          }
        );

      if (!user) {

        return res.status(401).json({

          success: false,

          message:
            "Account not found."

        });

      }

      const passwordCorrect =
        verifyPassword(
          cleanPassword,
          user.passwordHash,
          user.passwordSalt
        );

      if (!passwordCorrect) {

        return res.status(401).json({

          success: false,

          message:
            "Incorrect password."

        });

      }

      const token =
        createSession(user.id);

      return res.json({

        success: true,

        message:
          "Login successful.",

        token,

        user:
          publicUser(user)

      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Unable to login."

      });

    }

  }
);

/*
=====================================================
CURRENT USER
=====================================================
*/

app.get(
  "/api/me",
  requireAuth,
  (req, res) => {

    res.json({

      success: true,

      user:
        publicUser(req.user)

    });

  }
);

/*
=====================================================
LOGOUT
=====================================================
*/

app.post(
  "/api/logout",
  requireAuth,
  (req, res) => {

    sessions.delete(
      req.token
    );

    res.json({

      success: true,

      message:
        "Logged out successfully."

    });

  }
);

/*
=====================================================
CREATE ORDER
=====================================================
*/

app.post(
  "/api/create-order",
  (req, res) => {

    const {
      id,
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      items,
      total
    } = req.body;

    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !paymentMethod ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Missing required order information."

      });

    }

    const allowedPaymentMethods = [
      "cod",
      "easypaisa",
      "jazzcash"
    ];

    if (
      !allowedPaymentMethods.includes(
        paymentMethod
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid payment method."

      });

    }

    console.log(
      "New BismiMart order:",
      {
        id,
        customerName,
        customerPhone,
        customerAddress,
        paymentMethod,
        items,
        total
      }
    );

    return res.status(201).json({

      success: true,

      message:
        "Order received successfully.",

      orderId:
        id,

      status:
        "Order Placed"

    });

  }
);

/*
=====================================================
404
=====================================================
*/

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "BismiMart resource not found."

    });

  }
);

/*
=====================================================
START SERVER
=====================================================
*/

app.listen(
  PORT,
  () => {

    ensureUsersFile();

    console.log(
      `BismiMart server running on port ${PORT}`
    );

  }
);
