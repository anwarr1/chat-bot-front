import { MessageCircle, Send, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Bonjour! Comment puis-je vous aider aujourd'hui ?",
    },
  ]);

  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setChatHistory([...chatHistory, { text: message, sender: "user" }]);

    try {
      const response = await fetch(
        "https://4cfe-105-155-249-182.ngrok-free.app/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: message }),
        }
      );

      const text = await response.text(); // Get raw response text
      console.log("Raw response:", text); // Log the raw response

      const data = JSON.parse(text);

      setChatHistory([
        ...chatHistory,
        { text: message, sender: "user" },
        { text: data.answer, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage(""); // Only call once to reset message state
    }
  };

  // Scroll to the bottom of the chat whenever a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-6 right-6">
      {isChatOpen ? (
        <div className="fixed bottom-8 right-8 flex flex-col items-end">
          <div className="bg-gray-800 rounded-lg shadow-lg mb-4 w-96">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with us</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 p-4 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.sender === "bot"
                        ? "bg-gray-700 text-left self-start"
                        : "bg-emerald-400 text-left self-start ml-auto"
                    } rounded-lg p-3`}
                    style={{ maxWidth: "fit-content" }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              {/* The element that is scrolled to */}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button
                  className="bg-emerald-400 text-gray-900 rounded-lg p-2"
                  onClick={sendMessage}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(false)}
            className="bg-emerald-400 text-gray-900 rounded-full p-3 hover:bg-emerald-500 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full shadow-lg transition"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      )}
    </div>
  );
}
