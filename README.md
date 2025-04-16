# 📸 Picsmate

A modern full-stack photo album manager — create albums, upload and tag images, explore photos, and manage everything in a sleek, responsive UI.


## ✨ Tech Stack

### 🖥 Frontend

- **React 18** + **Vite** – Lightning-fast modern frontend
- **Redux Toolkit** – State management done right
- **Tailwind CSS** – Utility-first styling with zero bloat
- **ShadCN/UI** – Beautiful, accessible components
- **Axios** – Smooth and clean HTTP requests

### 🚀 Backend

- **Express** + **Node.js** – Simple and scalable server
- **MongoDB + Mongoose** – Flexible NoSQL database
- **Multer** – Handling image uploads with ease
- **Cloudinary** – Image hosting and optimization
- **Google OAuth 2.0** – Secure authentication

---

## 📦 Features

- 🔒 **User Authentication** – Login via Google OAuth
- 📁 **Album Management** – Create and browse albums
- 🖼 **Image Upload** – Upload, preview, and tag photos
- 🔍 **Search** – Find photos by name, tag, or person
- 🌗 **Dark Mode** – Theme toggle for better vibes
- 📤 **Cloud Image Storage** – Cloudinary integration
- 🛡️ **Secure Uploads** – Multer and validation in place
- 🧠 **Smart UI** – Built with accessibility and responsiveness in mind

---

## 🌟 Screenshots

### **Signup**
![Signup Page](./frontend/public/Signup.png)

### **Photos**
![Photos](./frontend/public/Photos.png)

### **Albums**
![Albums](./frontend/public/Albums.png)

### **Upload Picture**
![Upload Picture](./frontend/public/UploadPicture.png)

### **Image View**
![Image View](./frontend/public/ImageView.png)

### **Favourite**
![Favourite](./frontend/public/Favourite.png)
---

## 🧪 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or Atlas)
- Cloudinary account
- Google OAuth credentials

## 🔐 Environment Variables

### 🌐 Frontend (`.env`)

```env
VITE_WEB_SERVER_BASE_URL=https://backend-base-url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_BACKEND_PORT=backend_port
```

### 🖥️ Backend (`.env`)

 ```env
NODE_ENV=your_env
PORT=backend_port
MONGODB=your_mongodb_connection_string
SECRET_KEY=mongodb_secret_key

ACCESS_TOKEN_SECRET=jwt_secret
ACCESS_TOKEN_EXPIRES=token_expiry_period

GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
OAUTH_REDIRECT_BASE=deployed_backend_uri

CLOUDINARY_API_SECRET=your_cloudianry_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_NAME=your_cloudinary_api_name
```
### 1. Clone the repository

```bash
git clone https://github.com/your-username/picsmate.git
cd picsmate
```
