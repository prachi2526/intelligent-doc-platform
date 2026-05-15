import { useState } from "react";
import axios from "axios";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/signup",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Signup
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
        onClick={handleSignup}
        className="bg-green-600 px-4 py-2 rounded-xl"
      >
        Signup
      </button>

    </div>
  );
}