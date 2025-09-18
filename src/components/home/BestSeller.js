// src/components/BestSeller.js
import React from 'react';
import products from '../../data/products.json';
import { Link } from 'react-router-dom';
import { addToCart } from '../../pages/CartUtils';

const bestSellerIds = [19, 18, 7, 2];

const BestSeller = () => {
  const bestSellers = products.filter(product => bestSellerIds.includes(product.id));

  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <h2 className="text-3xl font-semibold md:pr-4 font-poppins mb-3 text-[#0d2d1e]">Our Best Sellers</h2>
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-2">
        {bestSellers.map(product => (
          <div key={product.id} className="transition duration-300 gap-4 p-4 mt-2">
            <div className="flex flex-col justify-between h-full">
                <div className='overflow-hidden'>
                  <Link to={`/product/${product.id}`}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-auto md:w-[300px] md:h-[305px] object-cover transition-transform duration-300 hover:scale-105"
                        />
                  </Link>
                    <div className="relative group cursor-pointer">
                        <h3 className="text-lg font-bold font-raleway mt-4">
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </h3>
                    </div>

                    <p className="text-sm font-poppins text-gray-500 mt-2">{product.shortDescription}</p>
                </div>
                <p className="text-primary font-roleway font-bold mt-2">₹{product.priceINR.toFixed(2)}</p>
                <Link to={`/product/${product.id}`}>
                <button
                onClick={() => addToCart(product)} 
                className='bg-primary mt-8 border-2 border-primary text-white hover:bg-white hover:border-2 hover:border-primary  hover:text-black w-full p-2'>View Details</button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;