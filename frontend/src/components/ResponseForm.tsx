import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import React from "react";

const ResponseForm: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (answer: string) => {
    setLoading(true); // Start loading
    setResponse(null);
    setServerMessage("");

    const payload = { response: answer.toLowerCase(), message };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/response`, payload);
      setResponse(answer);
      setServerMessage(res.data.message || "Response submitted successfully!");
    } catch (error) {
      console.error("Error submitting response", error);
      if (axios.isAxiosError(error) && error.response) {
        setServerMessage(error.response.data.error || "Something went wrong.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 bg-white p-6 shadow-md rounded-lg w-full max-w-md text-center">
      <p className="text-sm text-gray-500 mb-2">
        Your response will be sent to me, no worries!
      </p>

      <input
        type="text"
        placeholder="Write a message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="flex gap-4">
        <motion.button
          className={`px-5 py-2 text-white rounded-lg shadow-md transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => handleSubmit("yes")}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          Yes
        </motion.button>
        <motion.button
          className={`px-5 py-2 text-white rounded-lg shadow-md transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={() => handleSubmit("no")}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          No
        </motion.button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-2">Submitting...</p>
        </div>
      )}

      {/* Message display with animation */}
      {response && !loading && (
        <motion.div
          className="mt-4 p-3 w-full bg-gray-100 text-gray-800 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {serverMessage}
        </motion.div>
      )}
    </div>
  );
};

export default ResponseForm;
