import { useState } from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Ask from "./pages/Ask";
import Documents from "./pages/Documents";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [activeTab, setActiveTab] = useState("chat");

  if (!isLoggedIn) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">

          <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl">

            <h1 className="text-5xl font-bold mb-8">
              Intelligent Doc Platform
            </h1>

            <Signup />

          </div>

          <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl flex flex-col justify-center">

            <Login setIsLoggedIn={setIsLoggedIn} />

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <div className="w-[260px] bg-gray-950 border-r border-gray-800 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            AI PDF
          </h1>

          <div className="space-y-4">

            <button
              onClick={() => setActiveTab("chat")}
              className={`w-full text-left px-4 py-3 rounded-2xl ${
                activeTab === "chat"
                  ? "bg-blue-600"
                  : "bg-gray-900"
              }`}
            >
              AI Chat
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className={`w-full text-left px-4 py-3 rounded-2xl ${
                activeTab === "upload"
                  ? "bg-blue-600"
                  : "bg-gray-900"
              }`}
            >
              Upload PDF
            </button>

            <button
              onClick={() => setActiveTab("documents")}
              className={`w-full text-left px-4 py-3 rounded-2xl ${
                activeTab === "documents"
                  ? "bg-blue-600"
                  : "bg-gray-900"
              }`}
            >
              Documents
            </button>

          </div>

        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="bg-red-600 px-4 py-3 rounded-2xl"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8 overflow-y-auto">

        {activeTab === "chat" && (

          <div className="bg-gray-900 p-8 rounded-3xl">

            <Ask />

          </div>

        )}

        {activeTab === "upload" && (

          <div className="bg-gray-900 p-8 rounded-3xl max-w-2xl">

            <Upload />

          </div>

        )}

        {activeTab === "documents" && (

          <div className="bg-gray-900 p-8 rounded-3xl max-w-3xl">

            <Documents />

          </div>

        )}

      </div>

    </div>
  );
}