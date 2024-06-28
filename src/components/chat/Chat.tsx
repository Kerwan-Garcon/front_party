"use client";

import { useState } from "react";

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

interface ChatProps {
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
}

const Chat: React.FC = ({
  messages = [],
  currentUserId,
  onSendMessage,
}: any) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className=" w-full">
      <div
        className="messages"
        style={{
          height: "700px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((message: any) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.senderId === currentUserId ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                background:
                  message.senderId === currentUserId ? "#007bff" : "#f1f0f0",
                color: message.senderId === currentUserId ? "white" : "black",
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "70%",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "calc(100% - 70px)", padding: "10px" }}
        />
        <button
          type="submit"
          style={{ width: "60px", padding: "10px", marginLeft: "10px" }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
