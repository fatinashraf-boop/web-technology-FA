const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

dotenv.config();

const db = require("./db");
const auth = require("./authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

/* ---------------- MULTER CONFIG ---------------- */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

/* ---------------- AUTHENTICATION ---------------- */

// Corrected: Uses 'students' table and includes student_id [cite: 212, 224]
app.post("/register", async (req, res) => {
    const { student_id, name, email, password } = req.body;
    
    try {
        // Hash the password for security
        const hashed = await bcrypt.hash(password, 10);
        
        // Insert into the 'students' table as identified in the database dump
        const query = "INSERT INTO students (student_id, name, email, password) VALUES (?, ?, ?, ?)";
        db.query(query, [student_id, name, email, hashed], (err) => {
            if (err) {
                // Handle duplicate student_id or email
                return res.status(400).json({ message: "Student ID or Email already exists" });
            }
            res.json({ message: "Student registered successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
});

// Unified Login: Ensures student_id is used for JWT payload 
app.post("/api/auth/login", (req, res) => {
    const { student_id, password } = req.body;
    db.query("SELECT * FROM students WHERE student_id = ?", [student_id], async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.length === 0) return res.status(401).json({ message: "Invalid Student ID" });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid password" });

        // Payload uses internal DB 'id' for consistency with authMiddleware 
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    });
});

// handle the Admin Login request
app.post("/api/auth/admin-login", (req, res) => {
    const { username, password } = req.body;

    // Based on your screenshot, the admin account is in the 'admins' table
    db.query("SELECT * FROM admins WHERE username = ?", [username], async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (result.length === 0) return res.status(401).json({ message: "Admin user not found" });

        const admin = result[0];

        // If your DB password is plain text (like 'admin123' in your screenshot), use direct comparison
        // If it's hashed, use: await bcrypt.compare(password, admin.password)
        if (password === admin.password) {
            const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    });
});
/* ---------------- LOST & FOUND API ---------------- */

app.get("/api/items", auth, (req, res) => {
    db.query("SELECT * FROM items ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching items" });
        res.json(result);
    });
});

app.post("/api/items", auth, upload.single("photo"), (req, res) => {
    const { title, description, category, location, item_date, contact } = req.body;
    const photo = req.file ? "/uploads/" + req.file.filename : null;
    
    // Uses req.user.id from the decoded JWT token 
    const query = `INSERT INTO items (student_id, title, description, category, location, item_date, contact, photo_path) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [req.user.id, title, description, category, location, item_date, contact, photo], (err) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json({ message: "Item reported successfully" });
    });
});

// Route to update status
app.put("/api/items/status/:id", auth, (req, res) => {

const id = req.params.id;
const { status } = req.body;

db.query(
"UPDATE items SET status=? WHERE id=?",
[status, id],
(err) => {

if(err){
console.error(err);
return res.status(500).json({message:"Database error"});
}

res.json({message:"Status updated successfully"});

});

});

// Route to delete item
app.delete("/api/items/:id", auth, (req, res) => {
    const itemId = req.params.id;
    db.query("DELETE FROM items WHERE id = ?", [itemId], (err) => {
        if (err) return res.status(500).json({ message: "Delete failed" });
        res.json({ message: "Item deleted" });
    });
});

// 404 Handler - Route not found
app.use((req, res) => {
    res.status(404).json({ message: "Resource not found" });
});

// Global Error Handler - Server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});