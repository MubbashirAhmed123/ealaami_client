'use client';
import React, { useState, useEffect, useCallback } from 'react';

export default function Hero() {
  const images = [
    {
      src: '/images/header1.webp',
      alt: 'Luxury living room design',
      title: 'Modern Elegance',
      subtitle: 'Contemporary designs that redefine luxury living'
    },
    {
      src: '/images/header3.png',
      alt: 'Minimalist bedroom design',
      title: 'Serene Spaces',
      subtitle: 'Creating tranquil environments for peaceful living'
    },
    {
      src: '/images/header2.webp',
      alt: 'Open concept kitchen',
      title: 'Functional Beauty',
      subtitle: 'Where aesthetics meet practicality seamlessly'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  // Preload images
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
      };
      img.src = image.src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('left');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = useCallback((index) => {
    if (index !== currentIndex && !isAnimating) {
      setDirection(index > currentIndex ? 'left' : 'right');
      setCurrentIndex(index);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [currentIndex, isAnimating]);


  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images - Sliding Animation */}
      <div className="absolute inset-0">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          const isNext = index === (currentIndex + 1) % images.length;
          
          let transformClass = '';
          let opacityClass = '';
          
          if (isActive) {
            transformClass = 'translate-x-0';
            opacityClass = 'opacity-100';
          } else if (isPrev) {
            transformClass = direction === 'right' ? 'translate-x-full' : '-translate-x-full';
            opacityClass = 'opacity-0';
          } else if (isNext) {
            transformClass = direction === 'left' ? 'translate-x-full' : '-translate-x-full';
            opacityClass = 'opacity-0';
          } else {
            transformClass = 'translate-x-full';
            opacityClass = 'opacity-0';
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${transformClass} ${opacityClass}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center ">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 hover:scale-105 transition-transform duration-300">
            {images[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 hover:scale-105 transition-transform duration-300">
            {images[currentIndex].subtitle}
          </p>
          <div className="hover:scale-105 transition-transform duration-300">
            <a
              href="#gallery"
              className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition-all duration-300 shadow-lg hover:shadow-red-600/30 hover:scale-105"
            >
              Discover Our Designs
            </a>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentIndex 
                ? 'bg-red-600 w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
