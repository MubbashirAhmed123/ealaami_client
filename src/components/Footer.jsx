'use client';

import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";


export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          <div className="flex flex-col items-center md:items-start">
            <img src="/images/image.png" alt="Ealaami Interior Studio Logo" className="w-44 mb-4" />
            <h3 className="text-4xl font-bold  mb-3 text-center md:text-left">
              <span className="text-red-600">Ealaami </span> Interior Solutions
            </h3>
            <p className="text-white text-md text-center md:text-left max-w-xs">
              Transforming spaces into timeless experiences with elegance and functionality.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className=" font-semibold text-xl mb-3">Quick Links</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="#" className="text-white hover:text-red-600 text-lg">Home</a></li>
              <li><a href="#" className="text-white hover:text-red-600 text-lg">Services</a></li>
              <li><a href="#" className="text-white hover:text-red-600 text-lg">Portfolio</a></li>
              <li><a href="#" className="text-white hover:text-red-600 text-lg">About Us</a></li>
              <li><a href="#" className="text-white hover:text-red-600 text-lg">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className=" font-semibold mb-3 text-xl flex items-center gap-1">Contact Us              <Phone size={16} className="text-red-600" />
            </h4>
            <div className="">

              <a href="tel:+91 9886576154" className="text-white text-lg">+91 9886576154 </a>
              <br />
              <a href="tel:+91 9380048650" className="text-white text-lg">+91 9380048650 </a>

            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-red-600" />
              <a href="mailto:contact@ealaami.in" className="text-white text-lg">contact@ealaami.in</a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className=" font-semibold mb-3 text-xl">Follow Us</h4>
            <div className="flex items-center gap-4 ">
              <a href="https://www.instagram.com/ealaami.in/" className="hover:text-red-600 transition-colors"><FaFacebook size={20} /></a>
              <a href="https://www.instagram.com/ealaami.in/" className="hover:text-red-600 transition-colors"><GrInstagram size={20} /></a>
              <a href="https://www.x.com/ealaami_in" className="hover:text-red-600 transition-colors"><FaXTwitter size={20} /></a>
              <a href="https://wa.me/7892236870?text=Hello" target='_blank' className='hover:text-red-600 transition-colors'><FaWhatsapp size={24} /></a>
            </div>
          </div>
        </div>

       <div className='flex flex-col md:relative md:flex-row md:items-center w-full border-t border-gray-200 mt-10 pt-6 text-sm space-y-2 md:space-y-0'>
  <div className="text-center md:text-left">
    developed By Mubbashir Ahmed <a href="tel:+91 7619562002">+917619562002</a>
  </div>
  <div className="text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
    © {new Date().getFullYear()} Ealaami Interior Studio. All rights reserved.
  </div>
</div>
        </div>
        
    </footer>
  );
}