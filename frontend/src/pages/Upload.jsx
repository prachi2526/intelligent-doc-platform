import { useState } from "react";
import axios from "axios";

export default function Upload() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Upload PDF
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded-xl"
      >
        Upload
      </button>
    </div>
  );
}