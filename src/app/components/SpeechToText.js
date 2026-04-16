"use client";
import { useEffect, useRef, useState } from "react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [language, setLanguage] = useState("ne-NP");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecogniton" in window) {
      const SpeechRecognition = window.webkitSpeechRecogniton;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = language;

      recog.onresult = async (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i] [0].transcript;
        }
        setText(transcript);

        if (language === "ne-NP") {
          setEnglishText("Translated to English: " + transcript);
        } else {
          setEnglishText("");
        }
      };

      recognitionRef.current = recog;
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  }, [language]);

  const startListening = () => recognitionRef.current && recognitionRef.current.start();
  const stopListening = () => recognitionRef.current && recognitionRef.current.stop();
}