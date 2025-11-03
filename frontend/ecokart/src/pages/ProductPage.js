import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const imgRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate()
  const { fetchCart } = useCart(); // Fetch updated cart after adding
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { id } = useParams(); // MongoDB _id

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`,{
          withCredentials: true
        });
        const productData = res.data.data;

        if (!productData) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const mappedProduct = {
          _id: productData._id,
          name: productData.name,
          shortDescription: productData.shortDescription,
          longDescription: productData.longDescription,
          price: Number(productData.price),
          imageUrl: productData.imageUrl,
          specifications: {
            'Net Quantity': productData.specification.netQuantity,
            'Shelf Life': productData.specification.shelfLife,
            'Country of Origin': productData.specification.countryOfOrigin,
            'Usage Instructions': productData.specification.usageInstructions,
          },
          rating: Number(productData.rating),
          reviewsCount: Number(productData.reviews),
        };

        setTimeout(() => {
          setProduct(mappedProduct);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    clone.style.transformOrigin = 'center center';
    clone.style.zIndex = 1000;
    clone.style.pointerEvents = 'none';
    clone.style.borderRadius = '8px'; // it match original image
    document.body.appendChild(clone);

    const translateX = cartRect.left + cartRect.width/2 - imgRect.left - imgRect.width/2;
    const translateY = cartRect.top + cartRect.height/2 - imgRect.top - imgRect.height/2;
    const scale = 0.2; // shrink to 20% of original

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      clone.style.opacity = '0.5';
    });

    setTimeout(() => {
      clone.remove();
    }, 1000);
  };

  const handleAddToCart = async (quantity) => {
    // immediately show alert and fly animation
    flyToCart();
    setAlertMessage(`${quantity} × ${product.name} added to cart`);
    setTimeout(() => setAlertMessage(''), 3000);

    // Fire backend request in background
    try {
      await axios.post(
        `${API}/carts/add/${product._id}`,
        { productId: product._id, quantity },
        { withCredentials: true }
      );

      fetchCart(); // update context cart after backend confirms
    } catch (error) {
      toast.error(error)
      console.error('Failed to add product to cart:', error.response?.data || error);

      toast((t) => (
        <span className='font-poppins w-fit'>
          Please Login first!
          <button 
            onClick={handleLoginRedirect}
            className='ml-2 bg-gray-200 font-medium rounded py-1 px-1' >
            Login
          </button>
        </span>
      ));
    }
  };


  const handleLoginRedirect = () => {
    toast.dismiss(); 
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className='grid grid-cols-1 mx-10 font-poppins mt-32 lg:grid-cols-2 gap-8'>
          <Skeleton height={400} />
          <div className='space-y-8 gap-y-10'>
            <Skeleton height={40} width={`60%`} />
            <Skeleton height={20} width={`40%`} />
            <Skeleton height={20} width={`80%`} />
            <Skeleton height={20} width={`90%`} />
            <Skeleton height={30} width={`50%`} />
            <Skeleton height={50} width={`70%`} />
            <Skeleton height={200} width={`100%`} />
          </div>
        </div>
    );
  }

  if (!product) {
    return <p>Product Not Found.</p>;
  }

  return (
    <div>
      <RotatingBanner />
      <Navbar cartRef={cartRef} />
      <CustomAlert title="Added to Cart" message={alertMessage} onClose={() => setAlertMessage('')} />

      <div className='grid grid-cols-1 mx-10 font-poppins mt-20 lg:grid-cols-2'>
        <div className='mb-10'>
          <img ref={imgRef} src={product.imageUrl} alt={product.name} className='lg:ml-10' />
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
            Get <LuIndianRupee className='mt-[3px] lg:mt-1 -mr-1' />60 worth of points post-delivery
            <FiInfo className='mt-1 ml-1' />
          </p>
          <PriceTag product={product} />
          <QuantitySelector onAddToCart={handleAddToCart} />
          <div className='mt-8 border-t border-gray-400'>
            <h3 className='text-lg font-medium mt-4'>Specifications</h3>
            {Object.entries(product.specifications).map(([key, val]) => (
              <p key={key}>{key} - {val}</p>
            ))}
          </div>
        </div>
      </div>

      <BestSeller />
      <Reviews />
      <Free />
      <Footer />
    </div>
  );
};

export default ProductPage;
