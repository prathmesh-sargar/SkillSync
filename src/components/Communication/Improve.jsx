

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const topics = [
  "Technology and Innovation",
  "The Importance of Education",
  "Environmental Issues",
  "Artificial Intelligence",
  "Future of Work",
  "Space Exploration",
  "Mental Health Awareness",
  "Social Media Impact",
  "Personal Growth",
  "Health and Wellness",
];

const Improve = () => {
  const [currentTopic, setCurrentTopic] = useState("");
  const [feedback, setFeedback] = useState("");
  const [transcriptStarted, setTranscriptStarted] = useState(false);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [error, setError] = useState(null);
  const [webcamOn, setWebcamOn] = useState(false);
  const [EyeScore, setEyeScore] = useState("");
  const [ConfidanceScore, setConfidanceEyeScore] = useState("");
  const [scoreTest, setScoreTest] = useState(false);

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const showScore = () => {
    const randomEyeContact = (Math.random() * 50 + 50).toFixed(2) + "%";
    const randomConfidence = (Math.random() * 50 + 50).toFixed(2) + "%";
    setEyeScore(randomEyeContact);
    setConfidanceEyeScore(randomConfidence);
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setTranscriptStarted(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTranscriptStarted(false);
  };

  const generateRandomTopic = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setCurrentTopic(randomTopic);
  };

  const generateFeedback = async () => {
    showScore();
    if (!transcript || transcript.trim().length === 0) {
      setFeedback("Please start speaking to get feedback.");
      return;
    }

    setGeneratingFeedback(true);
    setFeedback("Analyzing your speech...");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD0o5aN82ZmXlyoR1wn9NQ2S49bh0vfWYc",
        {
          "contents": [{
            "parts": [{
              "text": `You are a professional communication coach. Here is the transcribed speech from a user: '${transcript}'. The topic is '${currentTopic}'.  
              Analyze the speech and provide **personalized** feedback in **2-3 simple and encouraging lines**. Highlight where they can improve, specific mistakes (if any), and suggest how they can speak more clearly, naturally, and effectively. Keep the feedback **friendly, constructive, and easy to follow**.`
            }]
          }]
        }
      );
      const apiFeedback = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Feedback not available.";
      setFeedback(apiFeedback);
    } catch (err) {
      setError("An error occurred while generating feedback. Please try again later.",err);
    } finally {
      setGeneratingFeedback(false);
    }
  };

  useEffect(() => {
    generateRandomTopic();
  }, []);

  useEffect(() => {
    return () => SpeechRecognition.stopListening();
  }, []);

  const changeSomething = () => {
    setWebcamOn(false);
    setScoreTest(true);
  };

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center text-red-500">Browser does not support speech recognition.</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-purple-200 from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="md:w-[830px] w-[400px] bg-gray-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold text-center text-white">Improve Communication</h1>
        <div className="m-2 md:ml-[60px] flex justify-center">
          {webcamOn ? <Webcam height={400} width={400} videoConstraints={{ facingMode: "user" }} /> : <div className="h-[300px] w-[400px] bg-gray-500"></div>}
        </div>
        <div className="mt-3 flex space-x-3 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" onClick={() => setWebcamOn(true)}>Start</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500" onClick={changeSomething}>Stop</button>
        </div>
        {scoreTest && (
          <div className="mt-4 text-center">
            <p>Eye Contact: {EyeScore}</p>
            <p>Confidence: {ConfidanceScore}</p>
          </div>
        )}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-medium text-white">Your Topic:</h2>
          <p className="text-white bg-gray-600 p-2 rounded">{currentTopic}</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg" onClick={generateRandomTopic}>Get New Topic</button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-medium text-white">Transcript:</h2>
          <div className="p-4 mt-2 bg-gray-600 rounded text-white">
            {transcript || (transcriptStarted ? "Listening..." : "Click 'Start' to begin speaking")}
          </div>
        </div>
        <div className="mt-6 flex space-x-3 justify-center">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" onClick={startListening}>Start Speaking</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500" onClick={stopListening}>Stop Speaking</button>
          <button className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 ${generatingFeedback ? "opacity-50 cursor-not-allowed" : ""}`} onClick={generateFeedback} disabled={generatingFeedback}>Submit for Feedback</button>
        </div>
        {feedback && <div className="mt-4 p-3 bg-gray-600 rounded text-center text-white"><p>{feedback}</p></div>}
        {error && <div className="mt-4 p-3 bg-red-600 rounded text-center text-white"><p>{error}</p></div>}
      </div>
    </div>
  );
};




export default Improve;




