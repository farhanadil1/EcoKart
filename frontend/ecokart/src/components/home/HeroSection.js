import React, { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const desktopSlides = [
  { imageUrl: "./slide1.jpg", link: "/category/baby care" },
  { imageUrl: "./slide2.jpg", link: "/category/skincare" },
  { imageUrl: "./slide3.jpg", link: "/category/personal care" },
];

const mobileSlides = [
  { imageUrl: "./slide4.png", link: "/category/personal care"},
  { imageUrl: "./slide5.png", link: "/category/skincare" },
  
  
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = isMobile ? mobileSlides : desktopSlides;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides]);

  // Auto slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slides]);

  return (
    <div className="relative w-full font-poppins bg-pageBg overflow-hidden">
      <div className="relative bg-pageBg md:h-[360px] h-[485px] md:p-4 flex items-center">

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Slide */}
        <div
          className="w-full flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex justify-center items-center"
            >
              <a href={slide.link} className="w-full h-full">
                <img
                  src={slide.imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain md:object-cover transition-transform duration-700 ease-out mx-auto"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-gray-300"} cursor-pointer`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
