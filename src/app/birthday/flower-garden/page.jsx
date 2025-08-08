"use client";
import "./flowerStyles.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Flower({ isBloomed }) {
  return (
    <div className={`flower ${isBloomed ? "bloomed" : ""}`}>
      <div className="petal petal1"></div>
      <div className="petal petal2"></div>
      <div className="petal petal3"></div>
      <div className="petal petal4"></div>
      <div className="petal petal5"></div>
      <div className="petal petal6"></div>
      <div className="petal petal7"></div>
      <div className="petal petal8"></div>
      <div className="center"></div>
    </div>
  );
}

// 💌 Cute messages
const cuteMessages = [
  "You make my heart bloom 🌸",
  "I’d pick you every time 💖",
  "Love grows where you are 🌹",
  "You’re my sunshine 🌞",
  "Forever yours 💌",
  "Blossoming just for you 🌷",
  "Sweet like you 🍓",
  "You’re a garden of joy 🌼",
  "My favorite flower 🌺",
  "Sunlight in petals ☀️",
];

// Utility to randomly assign messages to some buds
const assignMessagesRandomly = (count, messages) => {
  const shuffled = [...Array(count).keys()].sort(() => 0.5 - Math.random());
  const messageMap = {};
  shuffled.slice(0, messages.length).forEach((i, idx) => {
    messageMap[i] = messages[idx];
  });
  return messageMap;
};

export default function FlowerGarden() {
  const [bloomedBuds, setBloomedBuds] = useState(new Set());
  const [shownMessages, setShownMessages] = useState(new Set());
  const [activeMessage, setActiveMessage] = useState(null);
  const [messageMap, setMessageMap] = useState({});

  useEffect(() => {
    setMessageMap(assignMessagesRandomly(100, cuteMessages));
  }, []);

  const handleHover = (id) => {
    setBloomedBuds((prev) => new Set(prev).add(id));

    const msg = messageMap[id];
    if (msg && !shownMessages.has(id)) {
      setShownMessages((prev) => new Set(prev).add(id));
      setActiveMessage(msg);
      setTimeout(() => setActiveMessage(null), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200 overflow-hidden p-6 sm:p-10">
      <h1 className="text-center text-3xl sm:text-5xl font-bold text-pink-700 mb-10">
        🌼 Flower Garden for You
      </h1>

      <div className="grid grid-cols-12 gap-14 justify-center">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="relative w-4 h-4 rounded-full bg-pink-300 hover:scale-125 transition cursor-pointer"
            onMouseEnter={() => handleHover(i)}
          >
            {bloomedBuds.has(i) && (
              <div className="flower absolute -top-36 -left-36 z-20 pointer-events-none">
                <Flower isBloomed />
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <motion.div
              className="bg-white/30 backdrop-blur-xl border border-white/20 text-pink-900 px-8 py-6 rounded-3xl shadow-2xl max-w-md text-center text-xl sm:text-2xl font-medium"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
