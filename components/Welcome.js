"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const WelcomeAnimation = ({ setStep }) => {

  let w = 0;
  if (typeof window !== "undefined") {
    w = window.innerWidth;
  }

  return (
    <div className="flex justify-center text-center items-center h-screen bg-gradient-to-r from-red-400 to-orange-400 text-white">
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ x: -w }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <Image src="/logo.jpeg" alt="Echo Logo" width={200} height={200} className="rounded-full mx-auto my-5" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ x: -w }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Echo.
          </h1>
          <button onClick={() => setStep(1)} className="px-4 my-5 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Take back control of your feed now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export { WelcomeAnimation };
