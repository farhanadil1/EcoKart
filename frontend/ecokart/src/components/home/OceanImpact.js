import React from 'react';

const OceanImpact = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/ocean.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
<div className="relative z-10 h-full bg-black/60 px-6 py-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">

    
    {/* Right Side: Plastic Recovery Stats */}
    <div className="flex justify-center items-center px-4">
            <div className="relative z-10 text-center">
            {/* Number with blur background per digit */}
            <div className="flex justify-center gap-2 mb-2">
                {['6', '5', ',', '9', '7', '5'].map((char, index) => (
                <span
                    key={index}
                    className="px-2 py-1 backdrop-blur-xs bg-white/20 text-white text-2xl sm:text-3xl font-semibold"
                >
                    {char}
                </span>
                ))}
            </div>

            {/* Description below */}
            <p className="text-sm sm:text-base text-gray-300">
            Kg of ocean-bound plastic recovered so far in 2025
            </p>
            </div>
            </div>

    {/* Left Side: Foundation Info */}
    <div className="bg-white text-[#0d2d1e] font-poppins p-6">
      <h2 className="text-xl md:text-4xl font-bold mb-4">Planet First Foundation®</h2>
      <p className="text-xs sm:text-sm md:text-md leading-relaxed">
        In 2023, we launched the Ecokart Impact Initiative a pledge to restore balance between everyday consumption and environmental responsibility. For every product sold, we contribute to the recovery of ocean-bound plastic and support efforts that reduce pollution at its source.
      </p>
      <button className="mt-6 bg-white border-2 border-primary text-[#0d2d1e] font-medium text-xs sm:text-base px-3 py-1 sm:px-6 sm:py-2 hover:text-white hover:bg-primary transition">
        <a href='https://theoceancleanup.com/' target="_blank" rel="noopener noreferrer">Find out more</a>
      </button>
    </div>
  </div>
</div>
    </div>
  );
};

export default OceanImpact;