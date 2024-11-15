const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const axios = require("axios");
const qs = require("qs");

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "xampp_db",
    port: 3306,
});
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "front_end_admin",
//     password: "root",
//     database: "xampp_db",
//     port: 3306,
// });

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.stack);
        return;
    }
    console.log("Connected to MySQL");
});

app.post("/api/supervisors", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required" });
    }

    let sqlQuery = `SELECT id FROM supervisors WHERE username='${username}' AND password='${password}'`;
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error querying database" });
        } else {
            // console.log(results);
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

app.post("/api/change_order_status", (req, res) => {
    const { placed_order_id, supervisor_id, next_order_status } = req.body;

    if (!placed_order_id || !supervisor_id || !next_order_status) {
        return res.status(400).json({
            error: "Order ID and order_status are required",
        });
    }

    // let sqlQuery = `UPDATE placed_orders SET order_status = '${order_status}' WHERE id = ${id}`;
    let sqlQuery = `INSERT INTO order_process_approvals (placed_order_id, supervisor_id, next_order_status) VALUES (${placed_order_id}, ${supervisor_id}, '${next_order_status}')`;

    // console.log(sqlQuery);

    db.query(sqlQuery, (error) => {
        if (error) {
            res.status(500).json({
                error: "Error updating status in database",
            });
        } else {
            res.json({
                success: true,
                message: "Order status updated successfully",
                updatedOrder: {
                    placed_order_id,
                    next_order_status,
                },
            });
        }
    });
});

app.post("/api/get_customer_email", (req, res) => {
    const { customer_id } = req.body;
    let sqlQuery = `SELECT email FROM users WHERE id = ${customer_id}`;
    // console.log(sqlQuery);
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error querying database" });
        } else {
            if (results.length > 0) {
                res.json({
                    email: results[0]["email"],
                });
            } else {
                res.status(500).json({
                    error: "Error finding email. User not found",
                });
            }
        }
    });
});

app.post("/api/listing/insert", async (req, res) => {
    const { name, description, price, category, img_url, brand, rating } =
        req.body;

    let sqlQuery = `INSERT INTO listings (name, description, price, category, img_url, brand, rating) VALUES ('${name}', '${description}', ${price}, '${category}', '${img_url}', '${brand}', ${rating})`;

    // console.log(sqlQuery);
    // res.status(200).send();
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error inserting to database" });
        } else {
            res.status(200).send();
        }
    });
});

app.post("/api/listing/get", async (req, res) => {
    const { id } = req.body;

    const sqlQuery = `SELECT * FROM listings WHERE id=${id}`;
    // console.log(sqlQuery);
    // res.status(200).send();
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error getting database" });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.json(null);
            }
        }
    });
});

app.post("/api/listing/change", async (req, res) => {
    const { id, name, description, price, category, img_url, brand, rating } =
        req.body;

    let sqlQuery = `UPDATE listings SET 
        name = '${name}', 
        description = '${description}', 
        price = ${price}, 
        category = '${category}', 
        img_url = '${img_url}', 
        brand = '${brand}', 
        rating = ${rating} 
        WHERE id = ${id}`;
    // console.log(sqlQuery);
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({
                error: "Error cchangeing listing in database",
            });
        } else {
            res.status(200).send();
        }
    });
});

app.post("/api/listing/remove", async (req, res) => {
    const { id } = req.body;

    let sqlQuery = `DELETE FROM listings WHERE id = ${id}`;
    console.log(sqlQuery);
    db.query(sqlQuery, (error, results) => {
        if (error) {
            res.status(500).json({ error: "Error removing teh lisitng" });
        } else {
            res.status(200).send();
        }
    });
});

// Email Part

// Standard Email using PHP default
app.post("/api/send_customer_update_email", async (req, res) => {
    const { customer_email, order_status, order_id } = req.body;
    try {
        // json to htmlquery thing
        const body = qs.stringify({
            customer_email: customer_email,
            order_status: order_status,
        });

        const response = await axios.post(
            "http://localhost:3000/_mail/mail.php",
            body,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        res.status(200).send();
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email");
    }
});

// Using Mailersend

const { MailerSend, Recipient, EmailParams, Sender } = require("mailersend");

app.post("/api/send_customer_update_email_mailersend", async (req, res) => {
    const { customer_email, order_status, order_id } = req.body;
    try {
        const mailersend = new MailerSend({
            // shhhhh
            apiKey: "mlsn.2effd08a0b6f5291cb4addcf36c5c22f2682eab25e2ad9d468b62bb3c489ecfe",
        });

        const recipients = [new Recipient(customer_email, "Customer")];

        const sentFrom = new Sender(
            "noreply@trial-3yxj6lj0qp54do2r.mlsender.net",
            "IE4727 Project Automatic System"
        );

        const emailParams = new EmailParams()
            .setFrom(sentFrom) // Sender email address
            .setTo(recipients) // Recipient list
            .setReplyTo(sentFrom)
            .setSubject("Update on Your Order Status") // Email subject
            .setHtml(`
          <p>Dear Customer,</p>
          <p>We are writing to update you on the status of your order of id <strong>${order_id}</strong>. Your order is currently: <strong>${order_status}</strong>.</p>
          <p>Thank you for shopping with us!</p>
          <p>Best Regards,<br>IE4727</p>
        `) // HTML version of the email
            .setText(`
          Dear Customer,
      
          We are writing to update you on the status of your order of id ${order_id}.
          Your order is currently: ${order_status}.
      
          Thank you for shopping with us!
      
          Best Regards,
          IE4727
        `); // Plain-text version of the email

        const response = await mailersend.email.send(emailParams);

        res.status(200).json({ message: "Email sent successfully", response });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            message: "Failed to send email",
            error: error.message,
        });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
