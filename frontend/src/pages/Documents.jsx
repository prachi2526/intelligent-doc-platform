import { useEffect, useState } from "react";
import axios from "axios";

export default function Documents() {

  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/documents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteDocument = async (documentId) => {

    const token = localStorage.getItem("token");

    try {

      await axios.delete(
        `http://127.0.0.1:8000/documents/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDocuments();

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">
        Documents
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="bg-gray-800 p-4 rounded-2xl"
          >

            <p className="font-bold break-words">
              {doc.filename}
            </p>

            <p className="text-sm text-gray-400 mb-3">
              {doc.total_chunks} chunks
            </p>

            <button
              onClick={() => deleteDocument(doc.id)}
              className="bg-red-600 px-4 py-2 rounded-xl text-sm"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}