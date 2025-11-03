import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RotatingBanner from '../components/common/RotatingBanner';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Free from '../components/common/Free';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DotBackgroundDemo } from '../components/common/DotBg';

const API = process.env.REACT_APP_API_URL;

const AllProductsPage = () => {
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/`,{
        withCredentials: true
      });
      const data = res.data.data;

      const mappedProducts = data.map(prod => ({
        id: prod._id,
        name: prod.name,
        category: prod.category,
        shortDescription: prod.shortDescription,
        longDescription: prod.longDescription,
        priceINR: Number(prod.price),
        imageUrl: prod.imageUrl,
        rating: Number(prod.rating),
        reviewsCount: Number(prod.reviews),
      }));

      setProducts(mappedProducts);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Server down")
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  const getFilteredProducts = () => {
    return products.filter(product => {
      const categoryMatch =
        selectedCategory === 'All' ||
        product.category.trim().toLowerCase() === selectedCategory.toLowerCase();

      const price = Number(product.priceINR);
      let priceMatch = false;

      switch (priceRange) {
        case 'under-500':
          priceMatch = price > 0 && price <= 500;
          break;
        case 'under-1000':
          priceMatch = price > 500 && price <= 1000;
          break;
        case 'under-1500':
          priceMatch = price > 1000 && price <= 1500;
          break;
        case 'over-1500':
          priceMatch = price > 1500;
          break;
        case 'All':
        default:
          priceMatch = true;
      }

      return categoryMatch && priceMatch;
    });
  };

  const filteredProducts = getFilteredProducts();
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handlePriceChange = (e) => setPriceRange(e.target.value);
  
  if(error){
    return <div>
      
      <RotatingBanner />
      <Navbar />
      <DotBackgroundDemo>
      <h2 className="text-3xl font-semibold md:pr-4 pb-6 pt-10 text-center text-[#0d2d1e]">
          Our Products
        </h2>
      <div className='flex justify-center'>
      <img
        src='./serverdown.png'
        alt='server is down!'
        className='h-35 w-60'
      />
    </div>
    <p className='flex justify-center px-4 text-sm pb-8 text-gray-500'>We're currently experiencing technical difficulties. Please try again later.</p>
    </DotBackgroundDemo>
    <Footer />
    </div>

  }

  return (
    <div>
      <RotatingBanner />
      <Navbar />

      <section className="py-10 px-4 md:px-8 bg-white font-poppins">
        <h2 className="text-3xl font-semibold md:pr-4 mb-6 text-center text-[#0d2d1e]">
          Our Products
        </h2>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="text-gray-700 w-fit font-semibold">
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => handleCategoryClick(e.target.value)}
              className="py-1 px-2 text-xs sm:text-sm rounded border border-gray-200"
            >
              {[...new Set(categories)].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center font-roboto gap-2">
            <label htmlFor="price-filter" className="text-gray-700 text-sm sm:text-base font-semibold">
              Price:
            </label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={handlePriceChange}
              className="py-1 px-2 text-xs sm:text-sm rounded border border-gray-200"
            >
              <option value="All">All</option>
              <option value="under-500">Under ₹500</option>
              <option value="under-1000">₹500 - ₹1000</option>
              <option value="under-1500">₹1000 - ₹1500</option>
              <option value="over-1500">Over ₹1500</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-4 gap-4 mt-2">
                  <Skeleton height={270} />
                  <Skeleton height={20} width={`80%`} className="mt-4" />
                  <Skeleton height={20} width={`60%`} className="mt-2" />
                  <Skeleton height={40} width={`100%`} className="mt-4" />
                </div>
              ))
            : filteredProducts.length > 0
            ? filteredProducts.map(product => (
                <div key={product.id} className="transition duration-300 gap-4 p-4 mt-2">
                  <div className="flex flex-col justify-between h-full">
                    <div className="overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-auto md:w-[300px] md:h-[270px] object-fill transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                      <div className="relative group cursor-pointer">
                        <h3 className="text-lg font-bold font-raleway mt-4">
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                          </Link>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{product.shortDescription}</p>
                    </div>
                    <p className="text-primary font-roleway font-bold mt-2">₹{product.priceINR.toFixed(2)}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-primary border-[1.5px] border-primary mt-4 text-white hover:bg-white hover:border-[1.5px] hover:border-primary hover:text-black transition duration-300 w-full p-2 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            : <p>No products found with the selected filters.</p>}
        </div>
      </section>

      <Free className="-mb-10" />
      <Footer />
    </div>
  );
};

export default AllProductsPage;
