'use client';

import { baseUrl } from '../../baseUrl'
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {

  const [contactInfo,setContactInfo] = useState({
    name: '',
    email: '',
    phone:'',
    message: ''
    
  })

  const [Submit,setSubmit] = useState(false)

  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      setSubmit(true)

      if(!contactInfo.name || !contactInfo.email || !contactInfo.message){
        alert('Please fill all the fields')
        return
      }
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactInfo),
    })
    const data = await res.json()
    alert(data.msg)
    setContactInfo({
      name: '',
      email: '',
      message: ''
    })
    setSubmit(false)
    console.log(data)
    } catch (error) {
      setContactInfo({
        name: '',
        email: '',
        message: ''
      })
      setSubmit(true)
      alert(error)
      return
      
    }
  }
  return (
    <section id="contact" className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let’s collaborate. Fill out the form or reach us directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className=" backdrop-blur-sm p-8 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Your Name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="your@email.com"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Your Phone Number"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Tell us about your requirements...."
                  value={contactInfo.message}
                  onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-red-600/30"
              >
                {Submit ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 "
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/20 rounded-full">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Our Studio</h3>
                <p className="text-gray-300">#35, 8b Main Road,<br />BTM Layout 1st Stage, Bengaluru 560029, Karnataka, India.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/20 rounded-full">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <a href='mailto:contact@ealaami.in' className="text-gray-300">contact@ealaami.in</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/20 rounded-full">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <div className='flex items-center'>

                
                <a href='tel:+919886576154' className="text-gray-300 mx-1">+91 9886576154 | <br /></a>
                <a href="tel:+919380048650" className="text-gray-300">+91 9380048650 </a>
                </div>
                <p className='text-gray-300'>Monday-Friday</p>
                <p className='text-gray-300'>10AM-7PM</p>
              </div>
            </div>

           
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}