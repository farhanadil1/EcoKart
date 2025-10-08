import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DotBackgroundDemo } from '../common/DotBg';

const bestSellerIds = ['68e4a1f0d0461a981bc11493',
  '68dfba8075a68a0bf0720670', 
  '68dfbda375a68a0bf07206aa',
  '68e49d11d0461a981bc10fd2'

]; 

const BestSeller = () => {
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products/',{

          withCredentials: true
        });
        const allProducts = res.data.data;

        //Filter only best sellers by _id
        const bestSellers = allProducts.filter(product => bestSellerIds.includes(product._id));
        setProducts(bestSellers);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch best sellers:', error);
        setError('Server down.')
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading){
    return <p className="text-center mt-4">Loading best sellers...</p>;
  }
  if (error){
    return <div className='pb-6'>
      <DotBackgroundDemo>
      <h2 className="text-3xl pt-6 font-semibold md:pl-8 font-poppins text-[#0d2d1e]">Our Best Sellers</h2>
      <div className='flex justify-center'>
      <img
        src='./serverdown.png'
        alt='server is down!'
        className='h-35 w-60'
      />
    </div>
    <p className='flex justify-center text-sm pb-1 text-gray-500'>We're currently experiencing technical difficulties. Please try again later.</p>
    </DotBackgroundDemo>
    </div>
  }

  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <h2 className="text-3xl font-semibold md:pr-4 font-poppins mb-3 text-[#0d2d1e]">Our Best Sellers</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {products.map(product => (
          <div key={product._id} className="transition duration-300 gap-4 p-4 mt-2">
            <div className="flex flex-col justify-between h-full">
              <div className='overflow-hidden'>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto md:w-[300px] md:h-[305px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="relative group cursor-pointer">
                  <h3 className="text-lg font-bold font-raleway mt-4">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </h3>
                </div>
                <p className="text-sm font-poppins text-gray-500 mt-2">{product.shortDescription}</p>
              </div>
              <p className="text-primary font-roleway font-bold mt-2">₹{Number(product.price).toFixed(2)}</p>
              <Link to={`/product/${product._id}`}>
              <button
                className='bg-primary mt-8 border-2 border-primary text-white hover:bg-white hover:border-2 hover:border-primary hover:text-black w-full p-2'
              >
                View Details
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
