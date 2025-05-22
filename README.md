# 🏥 Healthcare Management System (HCMS)

The **Healthcare Management System (HCMS)** is a cross-platform mobile application built using **React Native** and **Firebase**, designed to simplify healthcare access and improve communication between patients and doctors.

This app allows users to:
- Create an account and log in securely
- Book and manage appointments
- Chat with doctors in real-time
- Upload and access medical records
- View doctor details and services

---

## 🛠️ Technologies Used

| Technology     | Purpose                                  |
|----------------|-------------------------------------------|
| React Native   | Frontend mobile app development           |
| Firebase Auth  | Secure user authentication (login/signup) |
| Firestore      | Real-time NoSQL database                  |
| Firebase Storage | Upload and retrieve medical records     |
| React Navigation | Screen navigation and app flow          |
| JavaScript/JSX | Logic and UI components                   |

---

## 👨‍💻 Built By

This project was developed collaboratively by a team of four B.Tech students as part of our semester project:

- **Aryan Singh**
- Devansh Chhillar  
- Aryan Kumar  
- Pratham Dhingra

---

## 📱 App Demo (Screenshots)

| Home | Login Type |
|-------------|-----------------|
| ![Home](/assets/ss1.jpg) | ![Login](/assets/ss2.jpg) 

<!-- ---

## 🗂️ Project Structure
hcms/
│
├── assets/ # App assets (icons, images)
├── components/ # Reusable React Native components
├── navigation/ # React Navigation setup
├── screens/ # All app screens (Login, Home, Chat, etc.)
├── firebase.js # Firebase configuration
├── App.js # App entry point
├── package.json # Dependencies and scripts
└── README.md # Project documentation

--- -->


---

## 🚀 How to Clone and Use

### 📦 Prerequisites
- Node.js & npm installed
- Expo CLI or React Native CLI
- Firebase project (with Auth, Firestore, Storage enabled)

### 🔧 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hcms.git
cd hcms

# 2. Install dependencies
npm install

# 3. Set up Firebase
# Replace your Firebase config inside firebase.js

# 4. Run the app (Expo)
npm start
# OR (React Native CLI)
npx react-native run-android
