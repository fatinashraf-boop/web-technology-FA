# Lost & Found Management System

## Project Overview

The Lost & Found Management System is a web-based application designed to help students and administrators manage lost and found items on campus. The system allows students to report lost or found items, upload item images, and track the status of their reports. Administrators can manage item records and update their status accordingly.

This project was developed using **Node.js**, **Express.js**, and **MySQL**.

---

# Features

### Student Features

* Student registration and login
* Report lost items
* Report found items
* Upload item photos
* View reported items and their status

### Admin Features

* Admin login authentication
* View all reported items
* Update item status (Lost, Found, Claimed)
* Manage item records

---

# Technologies Used

| Technology | Purpose                |
| ---------- | ---------------------- |
| Node.js    | Backend server         |
| Express.js | API and routing        |
| MySQL      | Database               |
| HTML       | Website structure      |
| CSS        | User interface styling |
| JavaScript | Frontend interaction   |
| Git        | Version control        |
| GitHub     | Repository hosting     |

---

# System Architecture

The system follows a **client-server architecture**:

1. Frontend (HTML, CSS, JavaScript) handles user interaction.
2. Backend server built with **Express.js** processes requests.
3. The database **MySQL** stores user accounts and item reports.

---

# Installation Guide

Follow the steps below to run the system locally.

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lost-found-system.git
```

---

## 2. Install Dependencies

Make sure **Node.js** is installed.

```bash
npm install
```

---

## 3. Setup Database

Create a database in **MySQL**:

```sql
CREATE DATABASE lost_found;
```

Import the provided SQL file:

```
database.sql
```

---

## 4. Configure Database Connection

Edit the database configuration in:

```
server.js
```

Example:

```javascript
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "lost_found"
});
```

---

## 5. Run the Server

Start the application:

```bash
node server.js
```

The system will run at:

```
http://localhost:3000
```

---

# Project Structure

```
lost-found-system/
│
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── admin_login.html
│   ├── css/
│   └── js/
│
├── uploads/
├── server.js
├── package.json
└── database.sql
```

---

# Performance Testing

Performance testing was conducted using **Google Lighthouse** integrated in **Google Chrome**.

The system achieved:

* Performance Score: **100**
* Fast loading time (~1 second)
* Optimized images and scripts

Optimization techniques implemented include:

* Image optimization
* Lazy loading
* Deferred JavaScript loading

---

# Security Features

The system implements several security mechanisms:

* Password hashing using bcrypt
* JWT authentication for protected routes
* Input validation
* Secure file uploads

These measures protect user data and prevent unauthorized access.

---

# Future Improvements

Possible enhancements for the system include:

* Email notification for item claims
* Advanced search and filtering
* Mobile-responsive UI improvements
* Cloud deployment for campus-wide access

---

# Author

Student Project – Web Development Course

---

If you want, I can also give you a **better README that looks professional on GitHub (with badges, screenshots, and diagrams)** — it will make your repository look **10× more impressive to lecturers.**
