import React, { useEffect, useRef, useState } from "react";
import CarouselImg1 from "../assets/carousel (1).jpeg"; 
import CarouselImg2 from "../assets/carousel (2).jpeg"; 
import CarouselImg3 from "../assets/carousel (3).jpeg"; 
import CarouselImg4 from "../assets/carousel (4).jpeg"; 

const slides = [
  {
    image: CarouselImg1,
    tagline: "Find Your Furry Friend Today!",
  },
  {
    image: CarouselImg2,
    tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
  },
  {
    image: CarouselImg3,
    tagline: "Because Every Pet Deserves Love and Care.",
  },
  {
    image: CarouselImg4,
    tagline: "Bring Happiness Home with a Pet.",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); 

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden mt-18">
      <div className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full shrink-0">
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-[550px] object-cover" />
            
            <div className="absolute inset-0 flex items-end justify-center bg-black/30 pb-16">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4">
                {slide.tagline}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;