let db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid/v4");
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.send(db);
  });
  app.post("/api/notes", function (req, res) {
    let noteId = uuid();
    let newNote = {
      id: noteId,
      title: req.body.title,
      text: req.body.text
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const allNotes = JSON.parse(data);
      allNotes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
        if (err) throw err;
        db = allNotes
        res.send(db);
      });
    });
  });
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    // reread();
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const allNotes = JSON.parse(data);
      const newAllNotes = allNotes.filter(note => note.id != noteId);
      fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
        if (err) throw err;
        // reread();
        db = newAllNotes
        res.send(db);
        console.log("Note deleted!")
      });
    });
  });
};