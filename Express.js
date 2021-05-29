// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//tables (DATA)

let noteList = require("./db/db.json");

// let student = JSON.parse(rawdata);

// Routes

// Basic route that sends the user first to the AJAX Page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// Displays all tables
router.get("/api/notes", (req, res) => res.json(noteList));

// Create New tables - takes in JSON input
router.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;
  newNote.id = uniqid();
  console.log(newNote);

  noteList.push(newNote);

  res.json(newNote);
});

// Starts the server to begin listening
app.use(router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
