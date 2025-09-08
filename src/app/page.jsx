'use client'

import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Contact from "../components/sections/Contact"
import Gallery from "../components/sections/Gallery";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import OurClients from "../components/sections/OurClients";
import Head from "next/head";


export default function Home() {
  return (
    <div className="bg-[#F9F9F9] ">
       <Head>
        <link rel="icon" href="titleLogo.jpg" />
        </Head>
      <Menu/>
      <Hero/>
      <Services/>
      <Gallery/>
      <hr className="text-gray-700"/>
      <OurClients/>
        <Contact/>

      <Testimonials/>
      <Footer/>
      
    </div>
  );
}
