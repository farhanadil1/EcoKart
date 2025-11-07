import React, { useState, useEffect } from "react";

const RotatingBanner = () => {
  const messages = [
    "Enjoy free shipping on every order",
    "New eco-friendly products just arrived",
    "Subscribe & get 10% off your first order",
    "Sustainable shopping made easy",
    "Buy 2 products get 1 gift free"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true); // start slide out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length); // move to next
        setIsAnimating(false); // slide in next
      }, 400); //animation duration
    }, 3000); // 3 seconds per message

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full h-10 bg-primary  flex items-center justify-center overflow-hidden relative">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`absolute text-white font-medium font-poppins text-sm transform transition-transform duration-400 ${
            idx === currentIndex
              ? isAnimating
                ? "translate-x-full opacity-0" // sliding out
                : "translate-x-0 opacity-100" // visible
              : "translate-x-full opacity-0" // hidden off-screen
          }`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default RotatingBanner;
