const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "front_end_admin",
    password: "root",
    database: "xampp_db",
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.stack);
        return;
    }
    console.log("Connected to MySQL");
});

app.post("/api/supervisors", (req, res) => {
    const username = req.body["username"];
    const password = req.body["password"];
    let sqlQuery = `SELECT id FROM supervisors WHERE username='${username}' AND password='${password}'`;
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error querying database" });
        } else {
            console.log(results);
            if (results.length > 0) {
                res.json({
                    success: true,
                    userId: results[0]["id"],
                });
            } else {
                res.json({ success: false });
            }
        }
    });
});

app.post("/api/placed_orders", (req, res) => {
    let sqlQuery = `SELECT * FROM placed_orders`;
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error querying database" });
        } else {
            res.json(results);
        }
    });
});

app.get("/api/placed_orders", (req, res) => {
    let sqlQuery = `SELECT * FROM placed_orders`;
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error querying database" });
        } else {
            res.json(results);
        }
    });
});

// app.post("/api/test", (req, res) => {
//     console.log(req.body']);
// });

// app.get("/api/listings", (req, res) => {
//     db.query("SELECT * FROM listings", (error, results) => {
//         if (error) {
//             res.status(500).json({ error: "Error querying database" });
//         } else {
//             res.json(results);
//         }
//     });
// });

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
