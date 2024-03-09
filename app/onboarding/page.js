"use client";

import { useState } from "react";
import { WelcomeAnimation } from "@/components/Welcome";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const interests = [
  { name: "Technology", icon: "💻" },
  { name: "Politics", icon: "🏛️" },
  { name: "Science", icon: "🔬" },
  { name: "Art", icon: "🎨" },
  { name: "Music", icon: "🎵" },
  { name: "Travel", icon: "✈️" },
];

function Onboarding() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [step, setStep] = useState(0);

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem('interests', JSON.stringify(selectedInterests));
      window.location.href = "/";
    }
  }

  return (
    <>
      <AnimatePresence>
        {step === 0 && <WelcomeAnimation setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 1 && <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-orange-400 px-4">
          <div className="w-full max-w-2xl p-5 bg-gray-700 rounded shadow-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ x: -window.innerWidth }}
            >
              <h2 className="mb-4 text-2xl font-bold text-center">Select Your Interests</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
                {interests.map(({ name, icon }) => (
                  <div
                    key={name}
                    className={`mx-auto my-5 flex flex-col items-center justify-center w-36 h-36 rounded-full cursor-pointer
                          ${selectedInterests.includes(name) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => toggleInterest(name)}
                  >
                    <span className="text-3xl sm:text-4xl">{icon}</span>
                    <span className="mt-1 text-md font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <button type="submit" className="px-4 my-5 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={handleSubmit}>
            Next
          </button>
        </div>
        }
      </AnimatePresence >
    </>
  );
}

export default Onboarding;