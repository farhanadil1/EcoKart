import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTruck, FaGlobeAmericas } from "react-icons/fa";
import { GridBackgroundDemo } from "../components/common/GridBg";
import { DotBackgroundDemo } from "../components/common/DotBg";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RotatingBanner from "../components/common/RotatingBanner";

const AboutUs = () => {
  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="bg-white text-gray-800">
        <section className="relative bg-pageBg text-center py-24 px-6 border-b border-gray-200">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            About <span className="text-primary">EcoKart</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Making sustainable living simple, stylish, and accessible for
            everyone.
          </motion.p>
        </section>

        <DotBackgroundDemo>
          <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-6"
            >
              Our Mission
            </motion.h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-600">
              At EcoKart, we believe that every action matters. Our mission is
              to make eco-friendly choices effortless and impactful from
              reusable essentials to sustainable lifestyle products that shape a
              greener tomorrow.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaLeaf />,
                  title: "Eco-Friendly",
                  desc: "Products that respect the planet."
                },
                {
                  icon: <FaTruck />,
                  title: "Fast Delivery",
                  desc: "Reliable and sustainable shipping."
                },
                {
                  icon: <FaGlobeAmericas />,
                  title: "Global Vision",
                  desc: "Together for a greener world."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4 text-green-600 text-3xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </DotBackgroundDemo>

        <GridBackgroundDemo>
          <section className="px-6 py-10">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-semibold text-center mb-12"
              >
                Our Journey
              </motion.h2>

              <div className="relative border-l-2 border-green-500 ml-6">
                {[
                  {
                    year: "2019",
                    title: "The Idea Was Born",
                    desc: "We started with a simple mission: reduce plastic."
                  },
                  {
                    year: "2020",
                    title: "EcoKart Launch",
                    desc: "Released 20 sustainable products."
                  },
                  {
                    year: "2022",
                    title: "Community Growth",
                    desc: "Reached 50,000 eco-conscious shoppers."
                  },
                  {
                    year: "2025",
                    title: "Going Global",
                    desc: "Expanding our green vision worldwide."
                  }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                    className="mb-10 ml-4"
                  >
                    <div className="absolute -left-3.5 bg-green-500 rounded-full h-6 w-6 border-4 border-white"></div>
                    <p className="text-sm font-semibold text-green-600">
                      {step.year}
                    </p>
                    <h3 className="text-lg font-semibold mt-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </GridBackgroundDemo>

        <section className="p-20 max-w-full mx-auto bg-pageBg">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {[
              {
                name: "Md Adil Farhan",
                role: "Founder & CEO",
                link: "https://farhanadil.netlify.app"
              },
              {
                name: "Adil Farhan",
                role: "Ui/Ux designer",
                link: "https://github.com/farhanadil1"
              },
              {
                name: "Farhan Adil",
                role: "Software Developer",
                link: "https://www.linkedin.com/in/md-adil-farhan-b4956424a/"
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600">
                  {member.name[0]}
                </div>
                <h3 className="text-lg font-semibold hover:underline hover:text-blue-500">
                  <a href={member.link} target="blank">
                    {member.name}
                  </a>
                </h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="bg-pageBg">
          <section className="bg-primary text-white text-center py-16 px-6 rounded-t-3xl">
            <h2 className="text-3xl font-semibold mb-3">
              Join the EcoKart Movement
            </h2>
            <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
              Let’s make sustainable living the new normal. Shop consciously and
              inspire others.
            </p>
            <a
              href="/all-products"
              className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-50 transition"
            >
              Explore Products
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
