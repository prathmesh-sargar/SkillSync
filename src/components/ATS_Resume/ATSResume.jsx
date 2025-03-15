import { useState } from "react";
import axios from "axios";
import { pdfToImage } from "../../utiles/pdfToImage.js";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

function ATSResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Clear error when selecting a new file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !jobDescription) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const pdfImage = await pdfToImage(file);
      const API_KEY = "AIzaSyAs11NMd7OXY7apjUh_NWUwZKcMgd6b_yM"; // Replace with actual API Key
      const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: `Job Description: ${jobDescription}` },
              { inline_data: { mime_type: "image/jpeg", data: pdfImage.split(",")[1] } },
              {
                text: `You are a skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality. Your task is to evaluate the resume against the provided job description. 
                Provide a match percentage, list missing keywords, and give final thoughts. Also, as an experienced Technical HR Manager, analyze whether the candidate's profile aligns with the role, highlighting strengths and weaknesses.`
              }
            ]
          }
        ]
      };

      const res = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" }
      });

      setResponse(res.data.candidates[0]?.content?.parts[0]?.text || "No response received.");
    } catch (error) {
      console.error("Error:", error);
      setError("Error processing the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(response);
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-700"> Resume Analyzer </h2>
        <p className="font-semibold">Job Description</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-lg"
          />

          {error && (
            <p className="text-red-600 text-sm flex items-center">
              <FaExclamationTriangle className="mr-2" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-purple-700 transition duration-300"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg" > 
            <h3 className="text-xl font-semibold mb-2 text-blue-700 flex items-center">
              <FaCheckCircle className="mr-2 text-green-600" /> Resume Analysis Report
            </h3>

            {response.split("*").map((part, index) => (
              <p key={index} className="mb-2 font-semibold md:text-xl">{part.trim()}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSResume;
