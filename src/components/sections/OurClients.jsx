import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function OurClients() {
    const clients = [
        { id: 1, name: 'Client 1', logo: '/images/ourclients/1.jpg' },
        { id: 2, name: 'Client 2', logo: '/images/ourclients/2.jpg' },
        { id: 3, name: 'Client 3', logo: '/images/ourclients/3.png' },
        { id: 4, name: 'Client 4', logo: '/images/ourclients/4.jpg' },
        { id: 5, name: '& Many More...' },
    ]

    const [currentSlide, setCurrentSlide] = useState(0)
    const clientsPerSlide = 4

    const totalSlides = Math.ceil(clients.length / clientsPerSlide)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const getCurrentClients = () => {
        const start = currentSlide * clientsPerSlide
        const end = start + clientsPerSlide
        const currentClients = clients.slice(start, end)

        // Fill remaining slots with empty items if needed
        while (currentClients.length < clientsPerSlide) {
            currentClients.push(null)
        }

        return currentClients
    }

    return (
        <div className="py-12 px-2">
            <div className="mx-auto">
                {/* Mobile version */}
                <div className="block lg:hidden">
                    <div className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-gray-800">
                        Our Clients
                    </div>
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="grid grid-cols-2 gap-4 mb-6 transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {clients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="rounded-lg p-6 flex flex-col items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300 "
                                    >
                                        {client.logo && <img src={client.logo} alt={client.name} className="h-12 object-contain" />
                                        }                                         {!client.logo && <div className="w-64 h-32 flex justify-center items-center text-4xl font-semibold">{client.name}</div>}
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={prevSlide}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
                                disabled={totalSlides <= 1}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
                                disabled={totalSlides <= 1}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop version */}
                <div className="hidden lg:block lg:items-center lg:gap-8">
                    <div className="flex-shrink-0 mb-10">
                        <h2 className="text-4xl xl:text-5xl font-serif font-bold text-gray-800 whitespace-nowrap">
                            Our Clients
                        </h2>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center">
                            <button
                                onClick={prevSlide}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-10"
                                disabled={totalSlides <= 1}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex-1 mx-6 overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                                >
                                    {[...clients, ...clients].map((client, index) => (
                                        <div key={`${client.id}-${index}`} className="w-1/4 flex-shrink-0 px-3">
                                            <div className="flex items-center justify-center h-32">
                                                {client.logo && <img
                                                    src={client.logo}
                                                    alt={client.name}
                                                    className="w-64 h-32 object-contain"
                                                />}
                                                {!client.logo && <div className="w-64 h-32 flex justify-center items-center text-4xl font-semibold">{client.name}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={nextSlide}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-10"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurClients