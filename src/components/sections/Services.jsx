'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Turnkey Interior Works',
    image: '/images/project1/IMG_0491.jpeg',
    features: [
      'Modular Carpentry Work',
      'False Ceiling',
      'Lighting and Electric Work',
      'Painting',
      'Tile and Granete Works',
    ]
  },
    {
    title: '2D & 3D Interior Design',
    image: '/images/2d3d.jpg',
    features: [
"One of the most reliable interior design service providers in Bengaluru and the surrounding areas, with over 30 homes designed."   
    ]
  },

  {
    title: 'Furniture',
    image: '/images/furniture.avif',
    features: [
      'Custom Made Furniture',
      'Sofa, Bed, Dining Table, Etc',
      'Modifications of Furniture'
    ]
  },
  {
    title: 'Fabirication',
    image: '/images/fabrication.jpeg',
    features: [
      'Safety Gate',
      'Railings',
      'All Type of Fabrication Work',

    ]
  },
  {
    title: 'Gas Pipelines Laying and Others',
    image: '/images/gaspipe.jpg',
    features: [
      'Gas Pipe Lines For Residential and Commercial Purposes',
      // 'Custom ma
      // de furniture including Bed, Sofa, Dining table, Study table etc.',
      // 'Modifications of furniture'
    ]
  },
  

];

export default function Services() {
  const [currentService, setCurrentService] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const ref = useRef(null);

  // Preload images for better performance
  useEffect(() => {
    services.forEach((service, index) => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
      };
      img.src = service.image;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevService();
      } else if (e.key === 'ArrowRight') {
        nextService();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const nextService = useCallback(() => {
    setCurrentService((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  }, []);

  const prevService = useCallback(() => {
    setCurrentService((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  }, []);

  const goToService = useCallback((index) => {
    setCurrentService(index);
  }, []);

  // Mock scroll transform values for the parallax effect
  const opacity = 1;
  const y = '0%';

  return (
    <section
      id="services"
      ref={ref}
      className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Parallax */}
      <div
        style={{ opacity, transform: `translateY(${y})` }}
        className="absolute inset-0 z-0 transition-all duration-700"
      >
        <img
          src={services[currentService].image}
          alt={services[currentService].title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[currentService] ? 'opacity-100' : 'opacity-0'
            }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center mb-8 opacity-100 transform translate-y-0 transition-all duration-800">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-red-600 ">Services</span>
          </h2>
          <p className="text-lg text-gray-300">
            Comprehensive solutions for all your interior needs
          </p>
        </div>

        {/* Service Card */}
        <div
          key={currentService}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-white/10 opacity-100 transform translate-x-0 transition-all duration-600 h-96"
        >
          <div className="md:flex h-full">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {services[currentService].title}
              </h3>
              <ul className="space-y-2 mb-8 flex-1">
                {services[currentService].features.map((feature, index) => (
                  <li key={index} className="flex items-center ">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                    <span className="text-gray-800 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 h-full flex items-center justify-center p-4">
              <img
                src={services[currentService].image}
                alt={services[currentService].title}
                className={`w-full max-w-sm h-full object-cover transition-opacity duration-500 rounded-2xl ${imageLoaded[currentService] ? 'opacity-100' : 'opacity-0'
                  }`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 flex justify-between px-4 z-20 pointer-events-none opacity-100">
        <button
          onClick={prevService}
          className="pointer-events-auto p-3 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all hover:scale-110 hover:text-red-600"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={nextService}
          className="pointer-events-auto p-3 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all hover:scale-110 hover:text-red-600"
          aria-label="Next service"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-100">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToService(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentService ? 'bg-red-600 w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`View ${services[index].title} service`}
          />
        ))}
      </div>
    </section>
  );
}