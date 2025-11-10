<h1 align="center">🌿 EcoKart</h1>

<p align="center">
  <b>A full-stack, sustainable e-commerce platform built with React, Node.js, Express, and MongoDB — focused on eco-friendliness and user engagement.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloud-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-0C4E9D?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay" />
  <img src="https://img.shields.io/badge/Figma-Design-FF7262?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Design" />
</p>

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Why EcoKart?](#-why-ecokart)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 Overview
EcoKart is a **feature-rich full-stack e-commerce platform** designed with **sustainability** and **modern UX principles** at its core.  
Built using React on the frontend and Node.js + Express + MongoDB on the backend, EcoKart provides a seamless shopping experience with real-time cart updates, image hosting, and a modular codebase for easy expansion.  💳 EcoKart features a fully working checkout system with Razorpay payment gateway, enabling real-time and secure transactions for a production-like experience.

---

## 💡 Why EcoKart?
This project aims to make sustainable shopping easy for users and developers alike:

- 🌱 **Eco-Friendly Branding** — Green UI/UX design with TailwindCSS  
- 🧩 **Reusable Components** — Product cards, banners, reviews, and more  
- 🛠 **Full-Stack Functionality** — Complete backend with secure REST APIs  
- ☁️ **Cloudinary Integration** — For fast, reliable image storage
- 💳 **Razorpay Payment Gateway** – Secure payment processing integrated with orders
- 🚀 **Responsive & Fast** — Optimized frontend and backend for performance

---

## 🧰 Tech Stack

| Layer        | Technology                             |
|-------------|------------------------------------------|
| Frontend    | React, Tailwind CSS, Axios               |
| Backend     | Node.js, Express.js                      |
| Database    | MongoDB (Mongoose)                       |
| Cloud       | Cloudinary (for image hosting)           |
| Payments    | Razorpay (Payment Gateway Integration)   |
| Tools       | npm, Git, Markdown                       |

---

## ✨ Features

### 🖼️ Frontend
- 🔍 Product search & filters  
- 🛒 Cart & Checkout flow  
- 📱 Responsive layout with Tailwind CSS  
- 🌿 Eco-friendly theme  
- ⚡ API Integration for dynamic content
- 🛍 Seamless **Razorpay checkout** integrated in the order flow

### 🧭 Backend
- 👤 **User API** – Registration, login (JWT), profile  
- 🛍 **Product API** – CRUD for product listings with Cloudinary image upload  
- 🧾 **Order API** – Place and manage orders  
- 🛒 **Cart API** – Add/remove/update cart items
- 💳 **Razorpay Payment Gateway** – Secure payment processing integrated with orders  
- 🧰 Modular Express routes & controllers

---

## 🎨 Design Prototype

The entire UI/UX of EcoKart was designed on **Figma** before development.  
Check out the interactive prototype here:

🔗 [View Figma Design](https://www.figma.com/design/DHZxqnMdausaRdA9ZgwwGE/EcoKart?node-id=48-190&t=nVF72Yqj7Hkqzju2-1)

---

## 🧭 Project Structure
```
EcoKart/
├── backend/
│ ├── db/ # DB config
│ ├── middleware/ # JWT Auth and multer config
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── utils/ 
│ ├── app.js # Entry point
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI
│ │ ├── pages/ # Page components
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)  
- [npm](https://www.npmjs.com/)  
- MongoDB Atlas account (or local MongoDB)  
- Cloudinary account for image uploads

### 🖼️ Frontend Setup
```bash
# Navigate to frontend folder
cd frontend/ecokart

# Install dependencies
npm install

# Start development server
npm start
👉 Runs the app at http://localhost:3000
```
### 🧰 Backend Setup
```
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file with:
# PORT=your_port
# MONGO_URI=your_mongodb_uri
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# ACCESS_TOKEN=your_secret
# REFRESH_TOKEN=your_secret
# Razorpay Credentials
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Start server
npm run dev
👉 Backend runs at http://localhost:your_port
```

🔐 Auth protected routes use Bearer JWT tokens.

---

## 🛤️ Roadmap
 🔐 Add role-based admin dashboard

 📝 Add product reviews & ratings

 📦 Wishlist 

 🌍 Deploy full stack on Render / Netlify / Vercel

 ---

## 🤝 Contributing
Contributions are always welcome!

Fork the repo

Create a branch: git checkout -b feature/FeatureName

Commit changes: git commit -m 'Add new feature'

Push to branch: git push origin feature/FeatureName

open a pull request

---

## 📜 License

© 2025 [Md Adil Farhan](https://github.com/farhanadil1/). All Rights Reserved.  

This project, **EcoKart**, was created by *Md Adil Farhan* as part of personal learning and portfolio development.  
You are welcome to **view and learn** from the code and design for educational or inspiration purposes.  

However, please note:
- ❌ Copying, or reuse of the design, code, or assets without permission is **not allowed**.  
- 🚫 Commercial or public use is **strictly prohibited** unless you have received written consent from the author.  

If you’d like to collaborate, reference, or feature this project, feel free to reach out -- 
I’d be happy to connect and discuss it!   

> *This project is shared in good faith to inspire learning, creativity, and eco-conscious development.*


---

## 📬 Contact
👤 Adil Farhan

📧 imfarhan574@gmail.com

🔗 Live Frontend: https://ecokart-adil-farhan.netlify.app


🌐 GitHub: [farhanadil1](https://github.com/farhanadil1/)


⭐ If you like this project, dont forget to give it a star on GitHub!

