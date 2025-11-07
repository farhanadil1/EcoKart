import React from "react";
import { motion } from "framer-motion";
import { GridBackgroundDemo } from "../components/common/GridBg";
import { DotBackgroundDemo } from "../components/common/DotBg";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RotatingBanner from "../components/common/RotatingBanner";

const PrivacyPolicy = () => {
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
            Privacy <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Your privacy is important to us. This policy explains how EcoKart
            collects, uses, and protects your personal information.
          </motion.p>
        </section>

        <DotBackgroundDemo>
          <section className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              Information We Collect
            </motion.h2>

            <ul className="list-disc list-inside space-y-3 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              <li>
                Personal information such as your name, email, address, and
                payment details.
              </li>
              <li>
                Information you provide when creating an account, placing an
                order, or contacting us.
              </li>
              <li>
                Automatic information like IP address, browser type, and
                browsing behavior on our website.
              </li>
            </ul>
          </section>
        </DotBackgroundDemo>

        <GridBackgroundDemo>
          <section className="py-20 px-6 max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              How We Use Your Data
            </motion.h2>

            <ul className="list-decimal list-inside space-y-3 text-gray-600 text-lg leading-relaxed">
              <li>
                To process orders and provide you with products and services
                efficiently.
              </li>
              <li>
                To communicate updates, promotions, and relevant information
                about your account.
              </li>
              <li>To improve our website, products, and user experience.</li>
              <li>To ensure security and prevent fraud.</li>
            </ul>
          </section>
        </GridBackgroundDemo>

        <DotBackgroundDemo>
          <section className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold mb-6 text-center"
            >
              Sharing & Security
            </motion.h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              EcoKart does not sell, trade, or rent your personal information to
              third parties. We may share data with trusted service providers
              only for the purposes of fulfilling your orders or improving our
              services.
            </p>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration, disclosure, or
              destruction.
            </p>
          </section>
        </DotBackgroundDemo>

        <section className="bg-primary text-white text-center py-16 px-6 rounded-t-3xl">
          <h2 className="text-3xl font-semibold mb-3">
            Stay Protected with EcoKart
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
            Your trust is our priority. Shop with confidence knowing your
            information is safe.
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

export default PrivacyPolicy;
