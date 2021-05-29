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

// Routes

//Home Page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

//Notes Page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// Displays api Notes
router.get("/api/notes", (req, res) => res.json(noteList));

// Create New notes using req.body
router.post("/api/notes", (req, res) => {
  const newNote = req.body;
  //unique id from the npm uniqid.
  newNote.id = uniqid();
  console.log(newNote);
  //pushing the new note to the note list
  noteList.push(newNote);
  //respond with the json of the new note
  res.json(newNote);
});

// Starts the server to begin listening
app.use(router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
