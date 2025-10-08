import React from "react";
import { motion } from "framer-motion";
import { GridBackgroundDemo } from "../components/common/GridBg";
import { DotBackgroundDemo } from "../components/common/DotBg";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RotatingBanner from "../components/common/RotatingBanner";

const TermsOfService = () => {
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
            Terms of <span className="text-primary">Service</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Please read these terms carefully before using EcoKart services.
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
              Acceptance of Terms
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              By accessing or using EcoKart services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use our services.
            </p>
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
              User Responsibilities
            </motion.h2>
            <ul className="list-disc list-inside space-y-3 text-gray-600 text-lg leading-relaxed">
              <li>Provide accurate, current, and complete information when creating an account.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Ensure that your use of EcoKart services complies with all applicable laws.</li>
              <li>Do not use our platform for any fraudulent or harmful activities.</li>
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
              Orders & Payments
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
              All orders placed on EcoKart are subject to product availability and confirmation. Prices and availability may change without notice.
            </p>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Payments must be completed through our secure payment methods. EcoKart is not responsible for unauthorized transactions outside our platform.
            </p>
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
              Limitation of Liability
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              EcoKart shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services. We do not guarantee uninterrupted access to our platform or products.
            </p>
          </section>
        </GridBackgroundDemo>

        <section className="bg-primary text-white text-center py-16 px-6 rounded-t-3xl">
          <h2 className="text-3xl font-semibold mb-3">Shop Confidently with EcoKart</h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
            By using our platform, you agree to our Terms of Service. Enjoy safe and sustainable shopping.
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

export default TermsOfService;
