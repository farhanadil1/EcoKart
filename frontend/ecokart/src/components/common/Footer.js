import React from 'react';
import {
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiMail,
  FiHeart
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="font-poppins bg-gradient-to-tr from-primary to-primary/90 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About Ecokart */}
        <div>
          <h3 className="text-xl font-bold mb-3">About Ecokart</h3>
          <p className="text-sm leading-relaxed text-gray-100">
            Ecokart is your go-to eco-friendly store. From sustainable skincare to biodegradable baby care, shop guilt-free while helping the planet.
          </p>
          <img src='/logo.png' alt='logo' width={150} height={150}  />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-100">
            <li><a href="/all-products" className="hover:underline">Shop All Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="https://greencitizen.com/blog/sustainable-bloggers/" target='blank' className="hover:underline">Eco Tips Blog</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-xl font-bold mb-3">Stay Connected</h3>
          <div className="flex items-center space-x-4 mb-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FiTwitter className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
              <FiInstagram className="text-2xl" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">
              <FiGithub className="text-2xl" />
            </a>
            <a href="mailto:team@ecokart.com" className="hover:text-yellow-300">
              <FiMail className="text-2xl" />
            </a>
          </div>

          {/* Store badges */}
          <div className="flex space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="w-32 h-auto cursor-pointer hover:opacity-90 transition"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="w-32 h-auto cursor-pointer hover:opacity-90 transition"
            />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/80 px-4">
        Made with <FiHeart className="inline-block mx-1 text-red-300" /> by Farhan Adil • Ecokart • &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
