"use client";
import { useEffect, useState } from "react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [recognition, setRecognition] = useState(null);

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
      setRecognition(recog);
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  }, []);

  const startListening = () => recognition && recognition.start();
  const stopListening = () => recognition && recognition.stop();

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <button
          onClick={startListening}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          🎙️ Start
        </button>
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          🛑 Stop
        </button>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-800">{text}</p>
    </div>
  );
}