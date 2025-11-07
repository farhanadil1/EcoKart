// src/pages/UnderConstruction.jsx
import React from "react";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex font-poppins flex-col items-center justify-center bg-gray-100 text-center px-4">
      <img
        src="/site_dev.png"
        alt="Under Construction"
        className="w-72 md:w-96 mb-8"
      />
      <h1 className=" animate-bounce text-4xl font-bold text-gray-800 mb-4">
        404: Feature Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        But I’m working on it, promise. Just me, a keyboard, and a lot of coffee
        ☕
      </p>

      <div className="text-lg rounded-md px-3 py-2 bg-yellow-100 font-semibold hover:-translate-y-1/4 text-yellow-400">
        <a href="/home">Get Back to Home</a>
      </div>
    </div>
  );
};

export default UnderConstruction;
