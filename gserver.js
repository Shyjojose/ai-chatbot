import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
  systemInstruction: {
    parts: [
      {text: 'You are a assistant that helps with proffesion information of Shyjo.'},
      {text: 'meet and greet conversation is allowed'},
      {text: 'You can answer questions only about Shyjo. from the cv details give explnation how he can be a good fit for the job.'},
      ],
  }
 });

const cvData = JSON.parse(fs.readFileSync("cv.json", "utf-8")) // Load CV data
// Route to handle chat messages
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const prompt = `
       You are an AI that only answers questions using the provided CV data. 
      If the question is not related, simply say "I don't have information on that."

      CV Data:
      ${JSON.stringify(cvData, null, 2)}
      
      Question: ${message}
      Answer:
    `; // complete promt with the question
    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
    res.status(500).json({ error: "Failed to fetch response." });
  }
});

// Route to send email summary
app.post("/send-email", async (req, res) => {
  try {
    const { chatHistory } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: "Chat Summary from Your AI Assistant",
      text: chatHistory.join("\n"),
    });

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
