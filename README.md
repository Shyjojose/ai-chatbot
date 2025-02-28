
# AI Chatbot with Google Gemini API

## 🚀 Project Overview
This project is a **chatbot web application** powered by Google Gemini API. Users can chat with an AI that provides responses based only on **Shyjo's professional details**. Additionally, the chat history can be emailed as a summary.

## 🛠️ Tech Stack
- **Frontend**: React (Styled UI)
- **Backend**: Node.js with Express
- **AI Model**: Google Gemini API
- **Email Service**: Nodemailer (Gmail SMTP)

---

## 📂 Project Structure
```
my-chatbot/
│── frontend/        # React frontend
│── backend/         # Express backend
│── .env             # Environment variables
│── README.md        # Project documentation
│── package.json     # Dependencies
```

---

## 🏗️ Setup Instructions

### 🔹 1. Clone the Repository
```sh
git clone https://github.com/your-repo/my-chatbot.git
cd my-chatbot
```

### 🔹 2. Install Dependencies
#### **Backend**
```sh
cd backend
npm install
```
#### **Frontend**
```sh
cd ../frontend
npm install
```

---

## 🔑 3. Configure Environment Variables
Create a **`.env`** file in the **backend** directory and add:
```
GEMINI_API_KEY=your-gemini-api-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```
💡 **Note**: Use an **App Password** for Gmail authentication ([Generate it here](https://myaccount.google.com/apppasswords)).

---

## 🚀 4. Run the Application
#### **Start Backend**
```sh
cd backend
node gserver.js
```
#### **Start Frontend**
```sh
cd frontend
npm start
```

The app will be available at: **`http://localhost:3000`** 🎉

---

## 💡 Features
✅ AI Chat powered by **Google Gemini API 1.5 Flash**  
✅ **Only responds** based on **Shyjo’s CV details**
✅ **The CV is given by Package.json in the prompt** 
✅ **Stylish UI** with a chat interface  
✅ **Chat Summary via Email**  
✅ **Secure API Key & Email Credentials**  

---

## 📩 API Endpoints
### 🔹 `/chat` (POST) → AI Chat Response
**Request:**
```json
{
  "message": "What is Shyjo's experience?"
}
```
**Response:**
```json
{
  "reply": "Shyjo has 2+ years of experience in software development."
}
```
**Request:**
```json
{
  "message": "tell me about his programming skills?"
}
```
**Response:**
```json
{
  "reply": "Shyjo is proficient in C++, SQL, and Python programming, including TensorFlow, PyTorch, and Keras. He has experience with CI/CD integration using Jenkins and is familiar with Microservices and React. His projects demonstrate the application of these skills in areas such as developing a chatbot web interface using Flask and building a sentiment analysis model with PyTorch BERT. He also has experience using Python in a ROS environment for robotics projects."
}
```
### 🔹 `/send-email` (POST) → Send Chat Summary
**Request:**
```json
{
  "chatHistory": [
    {"sender": "You", "text": "Hello!"},
    {"sender": "AI", "text": "Hi there!"}
  ]
}
```
**Response:**
```json
{
  "message": "Email sent successfully!"
}
```

---

## 🎨 UI Preview
The chat interface includes:
- **Modern, Responsive UI**
- **Chat Bubbles for User & AI**
- **Send & Email Summary Buttons**

---

## 🛠️ Troubleshooting
**1. API Key Not Working?**
- Ensure you **correctly set up `.env`** with your **Google Gemini API Key**.

**2. Email Not Sending?**
- Use a **Google App Password** instead of your actual password.

**3. CORS Issues?**
- Install and use **CORS middleware** in the backend:
```sh
npm install cors
```
```js
import cors from "cors";
app.use(cors());
```

---

## 🎯 Future Improvements
- ✅ Store chat history in a database (MongoDB, Firebase)
- ✅ Add authentication for secure access
- ✅ Deploy to a cloud server (e.g., Vercel, Heroku)

---

## 📜 License
MIT License © 2025 **Shyjo's AI Chatbot**

---

## 🌟 Contributors
💻 Developed by **Shyjo** 🚀

