"use client";
import { useEffect, useRef, useState } from "react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";

      recog.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };

      recognitionRef.current = recog; 
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  }, []);

  const startListening = () => recognitionRef.current && recognitionRef.current.start();
  const stopListening = () => recognitionRef.current && recognitionRef.current.stop();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Control buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={startListening}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
           Start
        </button>
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Stop
        </button>
      </div>

      {/* Transcript box styled like ChatGPT */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
        <h2 className="text-gray-700 font-semibold mb-3">Transcript</h2>
        <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
          {text ? (
            <p className="text-gray-800 whitespace-pre-wrap">{text}</p>
          ) : (
            <p className="text-gray-400 italic">Speak something to see text here...</p>
          )}
        </div>
      </div>
    </div>
  );
}