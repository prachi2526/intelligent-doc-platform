import { useState } from "react";
import axios from "axios";

export default function Ask() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const typeText = (text, callback) => {

    let index = 0;

    const interval = setInterval(() => {

      callback((prev) => {

        const updated = [...prev];

        updated[updated.length - 1].content += text[index];

        return updated;
      });

      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }

    }, 15);
  };

  const handleAsk = async () => {

    if (!question.trim()) return;

    const token = localStorage.getItem("token");

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/ask",
        {
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = {
        role: "ai",
        content: "",
      };

      setMessages((prev) => [...prev, aiMessage]);

      typeText(
        response.data.answer,
        setMessages
      );

    } catch (error) {

      console.log(error);

      alert("Question failed");
    }

    setQuestion("");

    setLoading(false);
  };

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Ask Questions From PDF
      </h1>

      <div className="bg-gray-800 rounded-2xl p-6 h-[600px] overflow-y-auto mb-6">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`mb-4 flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}
            >

              {msg.content}

            </div>

          </div>

        ))}

        {loading && (
          <p className="text-gray-400">
            AI is thinking...
          </p>
        )}

      </div>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Ask question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-white text-black"
        />

        <button
          onClick={handleAsk}
          className="bg-green-600 px-6 rounded-xl"
        >
          Ask AI
        </button>

      </div>

    </div>
  );
}