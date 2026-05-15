import { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setIsLoggedIn(true);

      alert("Login Successful");

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 rounded text-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 rounded text-black"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 px-4 py-2 rounded-xl"
      >
        Login
      </button>

    </div>
  );
}