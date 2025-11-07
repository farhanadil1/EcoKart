import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RotatingBanner from "../components/common/RotatingBanner";
import { GridBackgroundDemo } from "../components/common/GridBg";

// Sample blogs data
const blogs = [
  {
    title: "10 Ways to Reduce Plastic Usage",
    image:
      "https://images.unsplash.com/photo-1675395576105-204d3d248430?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVkdWNlJTIwcGxhc3RpY3xlbnwwfHwwfHx8MA%3D%3D",
    desc: "Learn simple and effective ways to minimize plastic waste in your daily life.",
    date: "Aug 5, 2025"
  },
  {
    title: "Sustainable Fashion Tips",
    image:
      "https://images.unsplash.com/photo-1596097198305-e4844a56ddb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzdGFpbmFibGUlMjBmYXNoaW9ufGVufDB8fDB8fHww",
    desc: "Discover eco-friendly fashion choices that are stylish and sustainable.",
    date: "Sep 10, 2025"
  },
  {
    title: "How to Start Composting at Home",
    image:
      "https://images.unsplash.com/photo-1686579341853-2effa68407e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcG9zdGluZyUyMGF0JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Step-by-step guide to composting kitchen waste and improving soil quality.",
    date: "Oct 2, 2025"
  },
  {
    title: "Eco-Friendly Travel Hacks",
    image:
      "https://images.unsplash.com/photo-1758551940959-eacf38206d28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWNvJTIwZnJpZW5kbHklMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D",
    desc: "Travel responsibly with these eco-conscious tips for your next adventure.",
    date: "Oct 5, 2025"
  },
  {
    title: "Reducing Food Waste in Your Home",
    image:
      "https://plus.unsplash.com/premium_photo-1724660930089-353c077f40d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVkdWNpbmclMjBmb29kJTIwd2FzdGV8ZW58MHx8MHx8fDA%3D",
    desc: "Practical strategies to cut down on food waste and save money.",
    date: "Jul 20, 2025"
  },
  {
    title: "Green Cleaning Products You Can Make",
    image:
      "https://plus.unsplash.com/premium_photo-1737180621286-c2250ccce178?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMG1hZGUlMjBncmVlbiUyMGNsZWFuaW5nJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    desc: "DIY eco-friendly cleaning solutions for a chemical-free home.",
    date: "Jun 15, 2025"
  },
  {
    title: "Sustainable Gardening Tips",
    image:
      "https://plus.unsplash.com/premium_photo-1714200220760-b11c1abc5069?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Learn how to grow a garden that is productive and environmentally friendly.",
    date: "May 30, 2025"
  },
  {
    title: "Energy Saving Tips for Your Home",
    image:
      "https://plus.unsplash.com/premium_photo-1716232375566-e40122f30110?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5lcmd5JTIwc2F2aW5nJTIwdGlwcyUyMGZvciUyMGhvbWV8ZW58MHx8MHx8fDA%3D",
    desc: "Simple adjustments to reduce energy consumption and carbon footprint.",
    date: "Apr 12, 2025"
  },
  {
    title: "How to Shop Ethically Online",
    image:
      "https://images.unsplash.com/photo-1707257050015-399e56c6d76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcCUyMGV0aGljYWxseXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Guide to buying products that are sustainable and ethically made.",
    date: "Mar 18, 2025"
  },
  {
    title: "Eco-Friendly Office Habits",
    image:
      "https://plus.unsplash.com/premium_photo-1661904463156-50f7253a0afe?q=80&w=1197&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Practical ways to make your workplace greener and more sustainable.",
    date: "Feb 25, 2025"
  },
  {
    title: "Water Conservation Tips",
    image:
      "https://plus.unsplash.com/premium_photo-1664300227101-40e0a6351f57?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Learn to save water at home and reduce wastage effectively.",
    date: "Jan 10, 2025"
  },
  {
    title: "Plastic-Free Alternatives for Daily Life",
    image:
      "https://plus.unsplash.com/premium_photo-1661506966203-e9e1e8af0372?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhc3RpYyUyMGZyZWUlMjBhbHRlcm5hdGl2ZXxlbnwwfHwwfHx8MA%3D%3D",
    desc: "Replace single-use plastics with sustainable alternatives in everyday routines.",
    date: "Dec 5, 2024"
  }
];

const EcoTips = () => {
  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="bg-white text-gray-800">
        <GridBackgroundDemo>
          <section className="relative bg-pageBg text-center py-10 px-6 border-b border-gray-200">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            >
              Eco <span className="text-primary">Tips & Blogs</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mx-auto text-lg text-gray-600"
            >
              Explore expert advice, tips, and inspiration to live a sustainable
              lifestyle.
            </motion.p>
          </section>

          <section className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-12 text-center"
            >
              Latest Eco Tips
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-2">{blog.date}</p>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm">{blog.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </GridBackgroundDemo>

        <section className="bg-primary text-white text-center py-16 px-6 rounded-t-3xl">
          <h2 className="text-3xl font-semibold mb-3">
            Stay Green, Stay Inspired
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
            Subscribe to EcoKart for more tips, guides, and insights on
            sustainable living.
          </p>
          <a
            href="/all-products"
            className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-50 transition"
          >
            Explore Products
          </a>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EcoTips;
