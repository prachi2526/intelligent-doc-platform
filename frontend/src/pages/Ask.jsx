import { useState } from "react";
import axios from "axios";

export default function Ask() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

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
        content: response.data.answer,
        sources: response.data.retrieved_chunks,
      };

      setMessages((prev) => [...prev, aiMessage]);

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
            className={`mb-6 flex flex-col ${
              msg.role === "user"
                ? "items-end"
                : "items-start"
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

            {msg.role === "ai" && msg.sources && (

              <div className="mt-3 bg-gray-900 p-4 rounded-xl max-w-[70%]">

                <p className="font-bold mb-2 text-sm text-gray-300">
                  Sources Used
                </p>

                <div className="space-y-2">

                  {msg.sources.map((source, idx) => (

                    <div
                      key={idx}
                      className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300"
                    >
                      {source}
                    </div>

                  ))}

                </div>

              </div>

            )}

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