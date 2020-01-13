// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require('fs');
const fileName = './db/db.json';


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//dirname modification
app.use( express.static(path.join(__dirname, 'public')))

// ------------------- Objects -----------------------------------
//  Notes object array,    schema: id: "note1",  title: "Test Note 1",  text: "Test Note Text"
let notesArray = [
    {
        id: "note1",
        title: "Test Note 1",
        text: "Test Note Text"
    }
];
//notes counter to establish unique IDs
let counter = 0;


// Routes
// ================ Page Routes =============================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//  ============== API Routes ===========================

app.get("/api/notes", function (req, res) {
    // console.log("api hit with notes (GET)");
    fs.readFile(fileName, (err, json) => {
        if (err) return console.log(err);
        let obj = JSON.parse(json);
        // console.log(obj);
        res.json(obj);
    });
});

app.post("/api/notes", function (req, res) {
    //take post info and add an id, add to notes array
    let newNote = req.body;
    newNote.id = 'note' + counter;
    counter++;
    notesArray.push(newNote);

    fs.writeFile(fileName, JSON.stringify(notesArray), function (err) {
        if (err) return console.log(err);
        console.log('Notes updated in ' + fileName);
    });

    res.json({ ok: true });

});

// Displays a single note, or returns false
app.get("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;

    for (var i = 0; i < notesArray.length; i++) {
        if (chosen === notesArray[i].id) {
            return res.json(notesArray[i]);
        }
    }
    res.json({ ok: false });
});

// Deletes a single note
app.delete("/api/notes/:id", function (req, res) {
    var chosen = req.params.id;

    for (var i = 0; i < notesArray.length; i++) {
        if (chosen === notesArray[i].id) {
            notesArray.splice(i, 1);
        }
    }

    fs.writeFile(fileName, JSON.stringify(notesArray), function (err) {
        if (err) return console.log(err);
        // console.log(JSON.stringify(notesArray));
        console.log('Updating ' + fileName);
    });

    res.json({ ok: true });
});

// Code to clear out array
app.post("/api/clearnotes", function (req, res) {
    // Empty out the arrays of data
    notesArray.length = 0;
    counter = 0;

    res.json({ ok: true });
});

// If no matching route is found default to home

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// ============= Start server =================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
