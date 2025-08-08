"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const correctAnswer = "iloveyoumore";

export default function LoginPage() {
  const [guess, setGuess] = useState("");
  const [hints, setHints] = useState([]);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanGuess = guess.trim().toLowerCase();

    if (cleanGuess === correctAnswer) {
      router.push("/birthday");
    } else {
      const hintList = [
        "🧠 Abe idiot what do I say to you every day?",
        "🐷 Grrrr it starts with *i* you fatty",
        "💭 Ummmm *moreeee?????*",
        "👀 Well you say it to me toooo",
        "📞 Ab to call hi krle",
      ];

      if (step < hintList.length) {
        setHints((prev) => [...prev, hintList[step]]);
        setStep((prev) => prev + 1);
      } else {
        setHints((prev) => [...prev, "❌ No more hints available! Use your *dil* 🥺"]);
      }
    }

    setGuess("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold text-pink-700 drop-shadow mb-6 text-center"
      >
        💌 Guess the Magic Words
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 w-full max-w-md"
      >
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full px-4 py-2 text-lg rounded-xl border border-pink-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white placeholder:text-gray-400 text-center"
          placeholder="Type here..."
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="mt-2 bg-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-pink-600 transition-all"
        >
          Submit
        </motion.button>
      </form>

      <div className="mt-6 w-full max-w-md space-y-2 text-center">
        <AnimatePresence>
          {hints.map((hint, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-pink-900 bg-white/60 backdrop-blur-md p-3 rounded-lg shadow-sm border border-rose-300"
            >
              {hint}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
