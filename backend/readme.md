# 📸 Image Gallery Backend API

This is the backend server for the Picsmate application. It provides RESTful APIs for authentication, user management, albums, and image handling.

## 🚀 Features

- 🔐 User authentication (Google oAuth2)
- 📁 Album creation, editing, sharing and deletion
- 🖼️ Uploading and managing images in albums, commenting

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- Google OAuth 2 and JWT for authentication
- Cloudinary for image storage
- Multer for image operations

## 📂 API Routes

### 🔑 Auth Routes

`/auth`

- `GET /google` – Initial Auth
- `GET /google/callback` – Google redirect
- `POST /login` – Login with email (not in use you may use it)
- `GET /verify` – Verify user session/token
- `POST /logout` - Logout

### 👤 User Routes

`/user`

- `GET /profile` – Get current user profile

### 📁 Album Routes

`/albums`

- `GET /:userId` – Get all albums of the user
- `POST /` – Create a new album
- `PUT /:albumId` – Update an album
- `POST /:albumId/share` – Share album
- `DELETE /:albumId` – Delete album

### 🖼️ Image Routes

`/albums/:albumId/images`

- `GET /` – Get all images
- `GET /favourites` – Get Favourite Images
- `GET /search` – Get Images by tag.
- `POST /` – Upload a new image to the album
- `PUT /:imageId/favourite` – Add Image to Favourites
- `POST /:imageId/comments` – Add comment to 
- `DELETE /:imageId` – Delete image
