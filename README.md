# 🧠 ConnectMe – Backend

**ConnectMe** is a MERN-based full-stack social media web application.  
This backend provides REST APIs for:

- User authentication (manual & Google login)
- Post creation and interaction (likes, comments)
- Follow/unfollow feature
- Real-time messaging (chat)
- Instagram-style features like stories and saved posts

This project simulates a real-world social media app like **Instagram** and is my first capstone project using the MERN stack.

---

## 🚀 Features

- 📁 Scalable MVC + Service + Repository structure
- 🔐 JWT-based user authentication (manual & Google)
- 👤 User profile dashboard
- 📸 Instagram-style story feature
- 📝 Create, edit, delete posts
- ❤️ Like and comment on posts
- 💬 Real-time chat service using Socket.IO
- 💾 Save, like, and comment tracking for each user
- ➕ Follow/unfollow users
- 🔒 Public/Private account toggle
- 🚪 Logout and delete account functionality
- ⚠️ Comprehensive error handling

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt.js** for password hashing
- **Cloudinary + Multer** for media uploads
- **Socket.IO** for chat/messaging
- **CORS** for cross-origin resource sharing
- **dotenv** for environment configuration

---

## 📁 Folder Structure: 

ConnectMe_Backend/
│
├── config/         # DB & cloud configs
├── controllers/    # Request handlers
├── middleware/     # Middleware functions
├── Repository/     # DB interaction layer
├── routes/         # Express routes
├── Schema/         # Mongoose schemas
├── Service/        # Business logic layer
├── Utils/          # Reusable utility functions
├── uploads/        # Temporary local file storage
├── server.js       # Entry point
└── .env            # Environment variables (not committed)


---

## ⚙️ Installation

### 🔧 Prerequisites

- Node.js & npm installed
- MongoDB Atlas or local MongoDB setup
- Cloudinary account for media handling

### 📦 Setup

```bash
# Clone the repo
git clone https://github.com/omkhot/ConnectMe_Backend.git
cd ConnectMe_Backend

# Install dependencies
npm install

# Start the server (development mode)
npm start

---
### Environment variables
- create the .env file in project root directory with- 
PORT=your_port_number
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173 or deployed frontend URL

---

##📦 Deployment

-This project is deployed on Render platform
-Deployed Link: https://connectme-backend-2-h4co.onrender.com

