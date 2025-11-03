import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import products from "../../data/products.json";
import Cookies from "js-cookie";
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'

const API = process.env.REACT_APP_API_URL;

const bestSellerIds = [19, 13, 7, 2];

const Navbar = ({ cartRef }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(
    products.filter((product) => bestSellerIds.includes(product.id))
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", link: "/home" },
    { name: "Products", link: "/all-products" },
    { name: "Skin & Body Care", link: "/category/skincare" },
    { name: "Household", link: "/category/household" },
    { name: "Baby Care", link: "/category/baby care" },
    { name: "Personal Care", link: "/category/personal care" },
    { name: "Track Order", link: "/track-order" },
  ];

  // Check for username cookie on mount
  useEffect(() => {
    const userFromCookie = Cookies.get("username");
    if (userFromCookie) {
      setIsLoggedIn(true);
      setUsername(userFromCookie);
    }
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearched(products.filter((product) => bestSellerIds.includes(product.id)));
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.shortDescription &&
            product.shortDescription.toLowerCase().includes(query.toLowerCase())) ||
          (product.description &&
            product.description.toLowerCase().includes(query.toLowerCase()))
      );
      setSearched(filtered);
    }
  };

  const handleLogout = async () => {
  try {
    await toast.promise(
      axios.post(`${API}/users/logout`, {}, { withCredentials: true }),
      {
        loading: 'Logging out...',
        success: 'Logged out!',
        error: 'Logout failed!',
      }
    );

    // Clear cookies and state after successful logout
    Cookies.remove('username');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/home');

  } catch (err) {
    console.error(err);
  }
};

  return (
    <nav className="bg-pageBg border-b border-slate-300 px-4 md:px-8 relative z-50">
      <div className="flex items-center justify-between h-20">
        {/* Brand */}
        <div className="text-3xl font-audiowide text-[#0d2d1e] font-bold">
          <a href="/">EcoKart</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-x-6 font-poppins text-xs">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group cursor-pointer">
              <Link to={item.link}>{item.name}</Link>
              <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>

        {/* Icons + Hamburger */}
        <div className="flex scrollbar-hide items-center gap-x-4 text-xl text-[#0d2d1e] relative">
          {/* Search */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="cursor-pointer"
            >
              <FiSearch />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 mt-2 z-50 w-64 bg-white shadow-lg animate-slide-down">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-2 border text-sm border-gray-400"
                />
                <div className="max-h-[22rem] overflow-y-auto scrollbar-hide">
                  {searched.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <div className="flex p-1 hover:bg-pageBg text-gray-800 items-center space-x-2">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 h-20 object-cover"
                          onError={(e) => (e.target.src = "/images/placeholder.png")}
                        />
                        <div>
                          <h2 className="font-medium text-sm w-20 sm:w-full">
                            {product.name}
                          </h2>
                          <h3 className="text-xs">
                            {product.shortDescription || product.description}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div ref={dropdownRef} className="relative z-50">
            {!isLoggedIn ? (
              <Link to="/auth">
                <FiUser className="cursor-pointer" />
              </Link>
            ) : (
              <>
                <FiUser
                  className="cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md py-2">
                    <div className="flex items-center px-4 py-2 space-x-2">
                      {/* Circle Avatar */}
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm">
                        {username[0].toUpperCase()}
                      </div>

                      {/* Username */}
                      <p className="text-sm text-gray-700">
                        <strong>{username}</strong>
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 font-semibold text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Cart */}
          <Link to={`/cart`}>
            <div ref={cartRef} className="relative cursor-pointer">
              <FiShoppingCart />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border border-white" />
            </div>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pageBg border-t border-slate-300 flex flex-col items-center gap-y-4 py-4 font-poppins text-sm">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:text-primary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
      <Toaster position="top-center" />
    </nav>
  );
};

export default Navbar;
