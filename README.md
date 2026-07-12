# 🚀 TeamHub API

A scalable Task Management REST API built with **Node.js**, **Express.js**, and **MongoDB**.

TeamHub helps organizations manage teams, projects, boards, and tasks with secure authentication, real-time notifications, and file attachments.

---

# ✨ Features

- 🔐 JWT Authentication
- 👥 User Management
- 🏢 Organizations
- 👨‍💻 Teams
- 📁 Projects
- 📋 Boards
- ✅ Tasks
- 💬 Comments
- 📎 Attachments (Cloudinary)
- 🔔 Real-time Notifications (Socket.io)
- 🔒 Role-based Authorization
- 📑 API Validation
- 📝 Logging
- ⚡ Rate Limiting
- 🛡 Helmet Security
- 🌐 CORS Support
- 🧪 Jest Testing (Coming Soon)
- 📚 Swagger Documentation (Coming Soon)

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### File Upload

- Cloudinary

### Realtime

- Socket.io

### Validation

- Joi

### Security

- Helmet
- CORS
- Express Rate Limit
- Compression

### Logging

- Winston

---

# 📂 Project Structure

```
TeamHub
│
├── Controllers
├── Models
├── Routes
├── Middleware
├── Services
├── Utils
├── Config
├── Socket
├── Tests
├── uploads
├── app.js
├── server.js
└── package.json
```

---

# 📊 Database Design

```
User
│
├── Organization
│      │
│      ├── Team
│      │      │
│      │      ├── Project
│      │      │      │
│      │      │      ├── Board
│      │      │      │      │
│      │      │      │      ├── Task
│      │      │      │      │      │
│      │      │      │      │      ├── Comment
│      │      │      │      │      ├── Attachment
│      │      │      │      │      └── Notification
```

---

# 🔐 Authentication

The API uses:

- Access Token
- Refresh Token
- Role-based Authorization

Protected routes require:

```
Authorization: Bearer <access_token>
```

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/USERNAME/TeamHub.git
```

Move into project

```bash
cd TeamHub
```

Install packages

```bash
npm install
```

Create `.env`

```env
PORT=3000

MONGO_URI=

ACCESS_JWT_TOKEN=

REFRESH_JWT_TOKEN=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CLIENT_URL=
```

Run project

```bash
npm start
```

or

```bash
nodemon server.js
```

---

# 📌 API Modules

## Authentication

- Register
- Login
- Refresh Token
- Logout

---

## Users

- Get Profile
- Update Profile
- Delete Account

---

## Organizations

- Create Organization
- Update Organization
- Delete Organization
- Get Organization

---

## Teams

- Create Team
- Add Members
- Remove Members
- Update Team

---

## Projects

- Create Project
- Update Project
- Delete Project
- Get Projects

---

## Boards

- Create Board
- Update Board
- Delete Board

---

## Tasks

- Create Task
- Update Task
- Delete Task
- Assign Task
- Change Status
- Set Priority

---

## Comments

- Add Comment
- Edit Comment
- Delete Comment

---

## Attachments

- Upload File
- Delete File

---

## Notifications

- Real-time Notifications
- Read Notification
- Mark All As Read

---

# ⚡ Realtime Events

Socket.io is used for:

- Task Created
- Task Updated
- Task Deleted
- Comment Added
- Notification Sent

---

# 🛡 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Helmet
- Rate Limiting
- Input Validation
- Secure Environment Variables

---

# 📈 Performance

- Pagination
- Filtering
- Sorting
- Field Limiting
- Population
- Indexing
- Compression

---

# 🧪 Testing

Testing will be implemented using:

- Jest
- Supertest

---

# 📚 API Documentation

Swagger documentation will be added soon.

---

# 🚀 Future Improvements

- Redis Caching
- Email Notifications
- Activity Logs
- Search
- Webhooks
- Docker
- CI/CD
- Kubernetes
- Microservices Version

---

# 👨‍💻 Author

Ahmed Ibrahim Amer

Backend Node.js Developer

---

# ⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub.
