# 🛠️ Backend for Chat Application

This is the **backend** part of a real-time chat application test task, built with **NestJS**, **TypeORM**, and **MongoDB** using **TypeScript**.

---

## ⚙️ Technologies Used

- **Node.js 22**
- **NestJS**
- **TypeORM**
- **MongoDB**
- **socket.io**

---


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VolodiaCH/tt-chat-backend.git
cd tt-chat-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root folder:

```env
FRONTED_URL=http://localhost:5173/
MONGO_URI=mongodb://localhost:27017/chat-app
PORT=3000
JWT_SECRET=supersecret

```

### 4. Setup MongoDB

Make sure MongoDB is installed and running on your machine.

You can use **MongoDB Compass** (or any other MongoDB client) to create a new database named `chat-app`.  
The default local connection string will be:
```mongodb://localhost:27017/chat-app```

### 5. Run the project

```bash
npm run start:dev
```

The server will be running at:  
👉 `http://localhost:3000`

