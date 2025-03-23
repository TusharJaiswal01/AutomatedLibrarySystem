# 📚 LibraryXAuto - Automated Library Management System

## 🚀 Introduction
LibraryXAuto is an advanced library management system built with **React, Express, and MongoDB** to streamline library operations. It automates book tracking, fine management, and real-time notifications, making library management efficient and user-friendly.

---
## 🔥 Key Features

### 📌 Automated Book Tracking & Cataloging
- Eliminates manual entries and ensures accurate records.
- Users can easily search and filter books.

### 📌 Real-Time Notifications
- Get instant updates on book availability, due dates, and fines.
- Email/SMS alerts to remind users of deadlines.

### 📌 Online Book Availability Search
- Allows students and faculty to search for books remotely.
- Reserve books online to ensure availability.

### 📌 Efficient Book Issuing & Returning
- Tracks borrowed books automatically.
- Reduces human errors in managing records.

### 📌 Notes & Review Section
- Users can share book summaries and reviews.
- Enhances collaborative learning within the library.

### 📌 Bulk Upload via Excel
- Librarians can upload book and user data from Excel files.
- Saves hours of manual data entry.

### 📌 Centralized Fine Tracking & Reports
- Automatically calculates overdue fines.
- Generates detailed reports for financial transparency.

---
## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt.js
- **Notifications:** Nodemailer / Twilio (for SMS alerts)

-

### 4️⃣ Run the Server
```bash
 npm run dev
```

### 5️⃣ Run the Frontend
```bash
 cd client
 npm start
```

---
## 📊 API Endpoints

| Endpoint               | Method | Description                  |
|------------------------|--------|------------------------------|
| `/api/books`          | GET    | Get all books                |
| `/api/books/:id`      | GET    | Get book details by ID       |
| `/api/books`          | POST   | Add a new book               |
| `/api/users/signup`   | POST   | Register a new user          |
| `/api/users/login`    | POST   | Authenticate user login      |
| `/api/fines`          | GET    | Fetch user fine details      |
