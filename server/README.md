# Server

The server provides **real-time messaging** and **user management** using **RESTful APIs** and **Socket.io** for live updates.

When you run `pnpm start:server`, the API is available at:

```bash
http://localhost:4000/api
```

The Socket.io server runs at:

```bash
http://localhost:4000
```

---

## 1. Authentication API

### **Login a user**

Request:

```text
POST /api/auth/login
```

Request Body:

```json
{
  "username": "john_doe"
}
```

Sample Response:

```json
{
  "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
  "username": "john_doe",
  "online": true
}
```

Errors:

```json
{
  "error": "Username is required"
}
```

### **Logout a user**

Request:

```text
POST /api/auth/logout
```

Request Body:

```json
{
  "userId": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b"
}
```

Sample Response:

```json
{
  "message": "User logged out"
}
```

Errors:

```json
{
  "error": "User ID is required"
}
```

```json
{
  "error": "User not found"
}
```

---

## 2. Messages API

### **Get chat history**

Request:

```text
GET /api/messages/history/:userId/:receiverId
```

Sample Response:

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    "sender": {
      "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
      "username": "john_doe"
    },
    "receiver": {
      "id": "c9d6f2a1-49a6-4e1a-93c2-d3e2c8a96d42",
      "username": "another_user"
    },
    "message": "Hello, world!",
    "timestamp": 1707456000000
  }
]
```

Errors:

```json
{
  "error": "Both userId and receiverId are required"
}
```

---

## 3. Users API

### **Get online users**

Request:

```text
GET /api/users/online
```

Sample Response:

```json
[
  {
    "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
    "username": "john_doe",
    "online": true
  },
  {
    "id": "c9d6f2a1-49a6-4e1a-93c2-d3e2c8a96d42",
    "username": "another_user",
    "online": true
  }
]
```

---

## 4. Socket.io API Documentation

The **WebSocket API** enables real-time communication between users in the chat system. It allows users to **login**, **send messages**, **receive chat history**, and **see online users**.

**Server URL:**

```bash
http://localhost:4000
```

---

### **User Login**

The server will generate a unique `id` for each user and mark them as online.

Event:

```text
user:login
```

Payload:

```text
john_doe
```

Sample Response:

```json
{
  "event": "usersOnline",
  "data": [
    {
      "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
      "username": "john_doe",
      "online": true
    }
  ]
}
```

Errors

```json
{
  "event": "error",
  "data": {
    "message": "Username is already taken"
  }
}
```

---

### **Send Message (1-1 Chat)**

Event:

```text
message:send
```

Payload:

```json
{
  "receiver": {
    "id": "c9d6f2a1-49a6-4e1a-93c2-d3e2c8a96d42",
    "username": "another_user"
  },
  "message": "Hello, how are you?"
}
```

Sample Response:

```json
{
  "event": "message:receive",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    "sender": {
      "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
      "username": "john_doe"
    },
    "receiver": {
      "id": "c9d6f2a1-49a6-4e1a-93c2-d3e2c8a96d42",
      "username": "another_user"
    },
    "message": "Hello, how are you?",
    "timestamp": 1707456000000
  }
}
```

Errors:

```json
{
  "event": "error",
  "data": {
    "message": "User not logged in"
  }
}
```

```json
{
  "event": "error",
  "data": {
    "message": "Receiver is required"
  }
}
```

```json
{
  "event": "error",
  "data": {
    "message": "Receiver not found"
  }
}
```

---

### **Receive Message**

Event:

```text
message:receive
```

Sample Response:

```json
{
  "event": "message:receive",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
    "sender": {
      "id": "b3f02c5e-90df-4c18-9373-0cf8e9d20f8b",
      "username": "john_doe"
    },
    "receiver": {
      "id": "c9d6f2a1-49a6-4e1a-93c2-d3e2c8a96d42",
      "username": "another_user"
    },
    "message": "Hello, how are you?",
    "timestamp": 1707456000000
  }
}
```

---

### **User Disconnect**

Event:

```text
disconnect
```

Sample Response:

```json
{
  "event": "usersOnline",
  "data": []
}
```

---

# Summary of API Endpoints

| **API Type**  | **Method/Event**  | **Endpoint/Event Name**                     | **Description**                    |
| ------------- | ----------------- | ------------------------------------------- | ---------------------------------- |
| **REST API**  | `POST`            | `/api/auth/login`                           | Login a user                       |
| **REST API**  | `POST`            | `/api/auth/logout`                          | Logout a user                      |
| **REST API**  | `GET`             | `/api/messages/history/:userId/:receiverId` | Get chat history between two users |
| **REST API**  | `GET`             | `/api/users/online`                         | Get all online users               |
| **WebSocket** | `user:login`      | `-`                                         | User joins the chat                |
| **WebSocket** | `message:send`    | `-`                                         | Send a message to another user     |
| **WebSocket** | `message:receive` | `-`                                         | Receive a real-time message        |
| **WebSocket** | `disconnect`      | `-`                                         | Notify when a user disconnects     |
