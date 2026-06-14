import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FaRobot, FaPaperPlane, FaUser } from "react-icons/fa";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await API.post("/chat", {
        message: message,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);

      setMessage("");
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to AI Assistant",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />

        <div className="p-8">
          <ChatHeader />

          <div className="bg-white rounded-3xl shadow-xl border border-blue-100 h-[75vh] flex flex-col">
            <ChatMessages
              messages={messages}
              loading={loading}
            />

            <ChatInput
              message={message}
              setMessage={setMessage}
              handleKeyPress={handleKeyPress}
              sendMessage={sendMessage}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <FaRobot className="text-4xl text-blue-600" />

      <h1 className="text-4xl font-bold text-blue-600">
        AI HR Assistant
      </h1>
    </div>
  );
}

function ChatMessages({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          Ask any HR-related question...
        </div>
      )}

      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          msg={msg}
        />
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 px-5 py-3 rounded-3xl shadow">
            <span className="text-blue-600">
              AI is thinking...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg }) {
  return (
    <div
      className={`flex ${
        msg.sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-5 py-3 rounded-3xl shadow-md ${
          msg.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          {msg.sender === "user" ? (
            <FaUser />
          ) : (
            <FaRobot />
          )}

          <span className="font-semibold">
            {msg.sender === "user"
              ? "You"
              : "AI Assistant"}
          </span>
        </div>

        <p className="whitespace-pre-wrap">
          {msg.text}
        </p>
      </div>
    </div>
  );
}

function ChatInput({
  message,
  setMessage,
  handleKeyPress,
  sendMessage,
  loading,
}) {
  return (
    <div className="border-t border-gray-200 p-5">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyPress}
          className="
            flex-1
            border
            border-gray-300
            rounded-2xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            rounded-2xl
            shadow-lg
            flex
            items-center
            gap-2
          "
        >
          <FaPaperPlane />
          Send
        </button>
      </div>
    </div>
  );
}
