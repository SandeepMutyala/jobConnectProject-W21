const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { use } = require("express/lib/router");
const app = express();
app.use(bodyParser.json());
app.use(express.json());

const SeedDb = require("./seedDb");

const User = require("./model/user");

const mongoURI =
  "mongodb+srv://admin:12345@cluster0.2ix5s.mongodb.net/t7?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  });

// const seedDb = new SeedDb();
// seedDb.seedDb();

app.get("/users", (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(422).json({ message: err, success: false });
    }
    return res.status(200).json({
      message: "Users retrieved",
      success: true,
      users: users,
    });
  });
});

app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "UserId not defined",
      success: false,
    });
  }
  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: `No user with the id of ${req.params.id}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: "User updated",
      success: true,
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      message: "UserId not defined",
      success: false,
    });
  }
  User.findByIdAndDelete(userId, (err) => {
    if (err) {
      return res.status(400).json({
        message: `No user with the id of ${req.params.id}`,
        success: false,
      });
    }
    return res.status(200).json({
      message: "User deleted",
      success: true,
    });
  });
});

app.post("/add", (req, res) => {
  const { username, email } = req.body;
  if (!email || !username) {
    return res
      .status(400)
      .json({ message: "Invalid message body", success: false });
  }

  const user = new User({ username, email });
  user.save();
  return res.status(200).json({
    message: "User added",
    success: true,
    user: user,
  });
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  if (userId) {
    User.findById(userId, function (err, foundUser) {
      if (err) {
        return res.status(200).json({
          message: `No user found with the id of ${req.params.id}`,
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        user: foundUser,
      });
    });
  } else {
    return res.status(400).json({
      message: "UserId not defined",
      success: false,
    });
  }
});

app.use((req, res) => {
  res.status(200).json({
    message: "Hello, Welcome to T5 API",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App is running!");
});
