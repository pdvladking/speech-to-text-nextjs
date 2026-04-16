'use client';
import { useEffect, useRef, useState } from 'react';

export default function SpeechToText() {
  const [text, setText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [language, setLanguage] = useState('ne-NP');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = language;

      recog.onresult = async (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);

        if (language === 'ne-NP') {
          setEnglishText('Translated to English: ' + transcript);
        } else {
          setEnglishText('');
        }
      };

      recognitionRef.current = recog;
    } else {
      alert('Speech Recognition not supported in this browser.');
    }
  }, [language]);

  const startListening = () => recognitionRef.current && recognitionRef.current.start();
  const stopListening = () => recognitionRef.current && recognitionRef.current.stop();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/*Heading*/}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Real-Time Speech to Text</h1>

      {/* Language selector*/}
      <div className="mb-6">
        <label className="mr-2 font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="en-US">English (US)</option>
          <option value="ne-NP">Nepali</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

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

      {/* Transcript + Translation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold mb-3">Transcript</h2>
          <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
            {text ? (
              <p className="text-gray-800 whitespace-pre-wrap">{text}</p>
            ) : (
              <p className="text-gray-400 italic">Speak something to see text here...</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-gray-700 font-semibold mb-3">English Translation</h2>
          <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-50">
            {englishText ? (
              <p className="text-gray-800 whitespace-pre-wrap">{englishText}</p>
            ) : (
              <p className="text-gray-400 italic">Translation will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
