import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newChat = [...chatHistory, { sender: "You", text: message }];
    setChatHistory(newChat);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/chat`, { message });
      setChatHistory([...newChat, { sender: "AI", text: response.data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to get AI response.");
    }

    setLoading(false);
  };

  const sendEmailSummary = async () => {
    try {
      await axios.post(`${API_URL}/send-email`, { 
        chatHistory: chatHistory.map(chat => `${chat.sender}: ${chat.text}`) 
      });
      alert("Chat summary sent successfully!");
    } catch (error) {
      console.error("Error sending email summary:", error);
      alert("Failed to send email summary.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💬 Shyjo's personal assistant</h2>
      
      <div style={styles.chatBox}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={chat.sender === "You" ? styles.userMessage : styles.aiMessage}>
            <strong>{chat.sender}:</strong> {chat.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
        style={styles.input}
      />

      <div style={styles.buttonContainer}>
        <button onClick={sendMessage} disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Send"}
        </button>
        <button onClick={sendEmailSummary} style={{ ...styles.button, backgroundColor: "#ff9800" }}>
          📧 Send Summary
        </button>
      </div>
    </div>
  );
}


const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  chatBox: {
    border: "1px solid #ddd",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  userMessage: {
    textAlign: "right",
    backgroundColor: "#d1e7dd",
    padding: "8px",
    margin: "5px",
    borderRadius: "8px",
    display: "inline-block",
  },
  aiMessage: {
    textAlign: "left",
    backgroundColor: "#f8d7da",
    padding: "8px",
    margin: "5px",
    borderRadius: "8px",
    display: "inline-block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
};
