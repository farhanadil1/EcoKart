import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import RotatingBanner from '../components/common/RotatingBanner';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FaStar } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { IoSparklesSharp } from "react-icons/io5";
import PriceTag from '../components/PriceTag';
import QuantitySelector from '../components/QuantitySelector';
import { LuIndianRupee } from "react-icons/lu";
import BestSeller from '../components/home/BestSeller';
import Free from '../components/common/Free';
import Reviews from '../components/home/Reviews';
import { useCart } from './CartContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CustomAlert from '../components/common/CustomAlert';


const ProductPage = () => {

  const imgRef = useRef(null);
  const cartRef = useRef(null);

  const { addToCart } = useCart();
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);
  const flyToCart = () => {
    const img = imgRef.current;
    const cart = cartRef.current;
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${imgRect.left}px`;
    clone.style.top = `${imgRect.top}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
    clone.style.zIndex = 1000;
    clone.style.pointerEvents = 'none';

    document.body.appendChild(clone);

    // Calculate scale ratio
    const scale = 30 / Math.max(imgRect.width, imgRect.height);
    const translateX = cartRect.left + cartRect.width / 2 - imgRect.left - imgRect.width / 2;
    const translateY = cartRect.top + cartRect.height / 2 - imgRect.top - imgRect.height / 2;


    requestAnimationFrame(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      clone.style.opacity = '0.5';
    });

    setTimeout(() => {
      clone.remove();
    }, 1000);
  };


  if (!product) return <p>Product Not Found.</p>;

  return (
    <div>
      <RotatingBanner />
      <Navbar cartRef={cartRef} />

      <CustomAlert
        title="Added to Cart"
        message={alertMessage}
        onClose={() => setAlertMessage('')}
      />


      {loading ? (
        <div className='grid grid-cols-1 mx-10 font-poppins mt-20 lg:grid-cols-2 gap-8'>
          <Skeleton height={400} />
          <div className='space-y-4'>
            <Skeleton height={40} width={`60%`} />
            <Skeleton height={20} width={`40%`} />
            <Skeleton height={20} width={`80%`} />
            <Skeleton height={20} width={`90%`} />
            <Skeleton height={30} width={`50%`} />
            <Skeleton height={50} width={`70%`} />
            <Skeleton height={200} width={`100%`} />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 mx-10 font-poppins mt-20 lg:grid-cols-2'>
          <div className='mb-10'>
            <img
              ref={imgRef} 
              src={product.imageUrl} 
              alt={product.name} 
              className='lg:ml-10'
            />
          </div>
          <div className='mb-10'>
            <h1 className='text-4xl font-normal'>{product.name}</h1>
            <p className='mt-4 flex'>
              {product.rating}
              <FaStar className='mt-0.5 mx-2' />
              {product.reviewsCount} Reviews
            </p>
            <h2 className='text-md mt-4'>{product.shortDescription}</h2>
            <h2 className='text-md font-normal mt-4 text-gray-500'>{product.longDescription}</h2>
            <p className='flex text-sm lg:text-base mt-4 bg-primary lg:py-2 py-1 px-3 text-white lg:px-4 rounded w-fit'>
              <IoSparklesSharp className='mt-1 mr-1' />                   
              Get <LuIndianRupee className='mt-[3px] lg:mt-1 -mr-1'/>60 worth of points post-delivery 
              <FiInfo className='mt-1 ml-1'/>
            </p>
            <PriceTag />
            <QuantitySelector
              onAddToCart={(qty) => {
                addToCart(product, qty);
                flyToCart();
                setAlertMessage(`${qty} × ${product.name} added to cart`);
                setTimeout(() => setAlertMessage(''), 3000);
              }}
            />
            <div className='mt-8 border-t border-gray-400'>
              <h3 className='text-lg font-medium mt-4'>Specifications</h3>
              <p>Net Quantity - {product.specifications['Net Quantity']}</p>
              <p>Shelf Life - {product.specifications['Shelf Life']}</p>
              <p>Country of Origin - {product.specifications['Country of Origin']}</p>
              <p>Usage Instructions - {product.specifications['Usage Instructions']}</p>
            </div>
          </div>
        </div>
      )}

      <BestSeller />
      <Reviews />
      <Free />
      <Footer />
    </div>
  );
};

export default ProductPage;
