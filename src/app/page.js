"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [hearts, setHearts] = useState([]);

  // Flying hearts generator
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: 20 + Math.random() * 30,
          delay: Math.random() * 2,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-800 overflow-hidden flex items-center justify-center p-6 sm:p-12">
      {/* Flying hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{ duration: 6, delay: heart.delay }}
          className="absolute text-white"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            zIndex: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Glassy Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 bg-white/10 border border-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 sm:p-16 max-w-xl w-full text-center"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight"
        >
          🎉 Welcome to the Birthday Bash!
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-lg sm:text-xl mb-8"
        >
          A magical party full of surprises, love, and sweet memories awaits!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/birthday")}
          className="bg-white/80 hover:bg-white text-pink-600 hover:text-pink-700 font-semibold px-6 py-3 rounded-full shadow-md backdrop-blur-lg transition-all duration-300"
        >
          🎈 Let’s dive into your birthday party!
        </motion.button>
      </motion.div>

      {/* Soft glow blobs */}
      <div className="absolute w-[300px] h-[300px] bg-pink-300 rounded-full top-[-120px] left-[-120px] opacity-20 blur-[150px]" />
      <div className="absolute w-[200px] h-[200px] bg-purple-500 rounded-full bottom-[-100px] right-[-100px] opacity-20 blur-[120px]" />
    </div>
  );
}
