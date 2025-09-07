'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { LuMapPin } from "react-icons/lu";

const projects = [
    {
        title: 'Azure Heights Residence',
        category: '',
        image: '/images/project1/IMG_0478.jpeg',
        description: 'Banashankari',

        gallery: [
            '/images/project1/IMG_0478.jpeg',
            '/images/project1/IMG_0491.jpeg',
            '/images/project1/IMG_0484.jpg',
            '/images/project1/IMG_1014.jpeg',
            '/images/project1/IMG_0477.jpeg',
            '/images/project1/IMG_0489.jpeg',
        ]
    },
    {
        title: 'House of Hiranandani Evita-305',
        category: 'Penthouse',
        image: '/images/project2/img4.jpg',
        description: 'Akshaya Nagar',
        gallery: [
            '/images/project2/img4.jpg',
            '/images/project2/img2.jpg',
            '/images/project2/img5.jpg',
            '/images/project2/img3.jpg',
            '/images/project2/img6.jpg'
        ]
    },
    {
        title: 'Inayath Eligance',
        category: 'Spa Resort',
        image: 'images/project3/img1.jpg',
        description: 'BTM Layout',
        gallery: [
            'images/project3/img1.jpg',
            'images/project3/img3.jpg',
            'images/project3/img6.jpg',
            'images/project3/img5.jpg',
            'images/project3/img2.jpg',
            'images/project3/img4.jpg',
        ]
    },
    {
        title: 'Duo City-190',
        category: 'Country Mansion',
        image:'/images/project4/img1.jpeg',
        description: 'Duo City, Electronic City',
        gallery: [
            '/images/project4/img1.jpeg',
            '/images/project4/img2.jpeg',
            '/images/project4/img3.jpeg',
            '/images/project4/img4.jpeg',
            '/images/project4/img5.jpeg'
        ]
    },
     {
        title: '2D & 3D Designs',
        category: 'Country Mansion',
        image:'/images/project5/1.jpg',
        description: 'Bengaluru',
        gallery: [
            '/images/project5/1.jpg',
            '/images/project5/2.jpg',
            '/images/project5/3.jpg',
            '/images/project5/4.jpg',
            '/images/project5/5.jpg'
        ]
    },
];

export default function Gallery() {
    const [currentProject, setCurrentProject] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageLoaded, setImageLoaded] = useState({});
    const ref = useRef(null);

    // Mock scroll transform values for the animations
    const opacity = 1;
    const scale = 1;
    const y = '0%';

    // Preload images for better performance
    useEffect(() => {
        projects.forEach((project, projectIndex) => {
            const img = new Image();
            img.onload = () => {
                setImageLoaded(prev => ({ ...prev, [projectIndex]: true }));
            };
            img.src = project.image;
        });
    }, []);

    // Close popup with Escape key
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            } else if (isPopupOpen) {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                }
            } else {
                if (e.key === 'ArrowLeft') {
                    prevProject();
                } else if (e.key === 'ArrowRight') {
                    nextProject();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPopupOpen, selectedImage, currentProject]);

    // Prevent body scroll when popup is open
    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isPopupOpen]);

    const nextProject = useCallback(() => {
        setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, []);

    const prevProject = useCallback(() => {
        setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    }, []);

    const openPopup = useCallback(() => {
        console.log('Opening popup for project:', projects[currentProject].title); // Debug log
        setIsPopupOpen(true);
        setSelectedImage(0);
    }, [currentProject]);

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedImage(0);
    };

    const nextImage = () => {
        const currentGallery = projects[currentProject].gallery;
        setSelectedImage((prev) => (prev === currentGallery.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        const currentGallery = projects[currentProject].gallery;
        setSelectedImage((prev) => (prev === 0 ? currentGallery.length - 1 : prev - 1));
    };

    const selectImage = (index) => {
        setSelectedImage(index);
    };

    return (
        <>
            <section
                id="gallery"
                ref={ref}
                className="relative h-screen flex items-center justify-center overflow-hidden bg-black/90 px-4"
            >
                {/* Background Overlay */}
                <div
                    style={{ opacity }}
                    className="absolute inset bg-black/70 z-0"
                />

                {/* Content Container */}
                <div
                    style={{ opacity, transform: `scale(${scale}) translateY(${y})` }}
                    className="container mx-auto px-4 w-full transition-all duration-700"
                >
                    {/* Section Header */}
                    <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12 opacity-100 transform translate-y-0 transition-all duration-600 delay-200">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                            Our <span className="text-red-600">Portfolio</span>
                        </h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-md md:max-w-2xl mx-auto">
                            Witness the transformation through our signature projects
                        </p>
                    </div>

                    {/* Gallery Card */}
                    <div
                        key={currentProject}
                        className="relative group w-full max-w-4xl mx-auto opacity-100 transform scale-100 transition-all duration-700"
                    >
                        {/* Project Image */}
                        <div 
                            className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-2xl aspect-video border-2 border-white/10 cursor-pointer"
                            onClick={openPopup}
                        >
                            <img
                                src={projects[currentProject].image}
                                alt={projects[currentProject].title}
                                className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ${
                                    imageLoaded[currentProject] ? 'opacity-100' : 'opacity-0'
                                }`}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                            
                            {/* Zoom indicator on hover */}
                            <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <ZoomIn className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white opacity-100 transform translate-y-0 transition-all duration-400 delay-400">
                           
                            <h3 className="text-lg md:text-3xl font-serif font-bold mb-1 md:mb-2 line-clamp-1">
                                {projects[currentProject].title}
                            </h3>
                            <p className="flex items-center gap-1 "><LuMapPin color='red'/>  
 {projects[currentProject].description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 mt-24 flex justify-between px-4 z-20 pointer-events-none opacity-100">
                    <button
                        onClick={prevProject}
                        className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all hover:scale-110 hover:text-red-600"
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
                    </button>
                    <button
                        onClick={nextProject}
                        className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all hover:scale-110 hover:text-red-600"
                        aria-label="Next project"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-900" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-100">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentProject(index)}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${index === currentProject ? 'bg-red-600 md:w-6 w-4' : 'bg-white/30 hover:bg-white/50'}`}
                            aria-label={`View ${projects[index].title} project`}
                        />
                    ))}
                </div>
            </section>

            {/* Image Popup/Modal */}
            {isPopupOpen && (
                <div 
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        // Close popup when clicking on backdrop
                        if (e.target === e.currentTarget) {
                            closePopup();
                        }
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={closePopup}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110 z-60"
                        aria-label="Close gallery"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full max-w-7xl h-full flex gap-4">
                        {/* Left side - Main large image */}
                        <div className="flex-1 flex items-center justify-center relative">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={projects[currentProject].gallery[selectedImage]}
                                    alt={`${projects[currentProject].title} - Image ${selectedImage + 1}`}
                                    className="max-h-[95vh] h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
                                />
                                
                                {/* Navigation arrows for main image */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Right side - Scrollable thumbnails */}
                        <div className="w-80 flex flex-col">
                            {/* Project info */}
                            <div className="text-white mb-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                                <span className="inline-block px-3 py-1 text-sm bg-red-600 rounded-full font-medium mb-2">
                                    {projects[currentProject].category}
                                </span>
                                <h3 className="text-2xl font-bold mb-2">
                                    {projects[currentProject].title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {projects[currentProject].description}
                                </p>
                                <div className="mt-2 text-sm text-gray-400">
                                    {selectedImage + 1} of {projects[currentProject].gallery.length}
                                </div>
                            </div>

                            {/* Scrollable thumbnail grid */}
                            <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[60vh]">
                                {projects[currentProject].gallery.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => selectImage(index)}
                                        className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                                            index === selectedImage 
                                                ? 'ring-2 ring-red-600 ring-offset-2 ring-offset-black scale-105' 
                                                : 'hover:scale-105 opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${projects[currentProject].title} - Thumbnail ${index + 1}`}
                                            className="w-full h-40 object-cover"
                                            loading="lazy"
                                        />
                                        {index === selectedImage && (
                                            <div className="absolute inset-0 bg-red-600/20" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}