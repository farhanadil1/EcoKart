import React, { useState } from 'react';
import RotatingBanner from '../components/common/RotatingBanner';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import RewardsCard from '../components/common/RewardsCard';
import toast from 'react-hot-toast';
import Cookies from "js-cookie"

const Cart = () => {
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState("");

  const handleCheckout = () => {
    const userFromCookie = Cookies.get("username");
    if(!userFromCookie){
      toast.error('Please Login to proceed to checkout.')
      return navigate('/auth?mode=login')
    }
    navigate('/checkout')
  }
  
  
  
  const {
    cartItems,
    loading,
    increaseQuantity,
    decreaseQuantity,
    handleRemove,
    applyPromoCode,
    subtotal,
    totalDiscount,
    promoDiscountAmount,
    taxAmount,
    shippingFee,
    finalTotal,
  } = useCart();

  if (loading) {
    return (
      <div className="mt-20 text-center text-xl font-poppins">
        Loading your cart...
      </div>
    );
  }

  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="grid font-poppins mx-10 mt-10 mb-16 grid-cols-1 lg:grid-cols-3">
        {/* Left Section: Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-semibold text-[#0d2d1e]">Shopping Cart</h1>

          <div className="border border-gray-300 mt-6 py-4 px-6 rounded bg-white">
            {cartItems.length === 0 ? (
              <div>
                <p className="text-center font-bold text-gray-500">
                  Your cart is empty.
                  <div className="mt-10 flex justify-center">
                    <Link to={`/category`}>
                      <button className="bg-primary border rounded border-primary text-white px-6 py-3 hover:bg-white hover:border hover:border-primary hover:text-primary transition">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 font-semibold pb-3 text-gray-700 border-b border-gray-300">
                  <div>Product</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Price</div>
                </div>

                {cartItems.map(({ product, quantity, _id }) => (
                  <div
                    key={_id}
                    className="grid grid-cols-3 gap-4 items-center py-4 border-b border-gray-200"
                  >
                    {/* Product Info */}
                    <div className="lg:flex items-center space-x-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => (e.target.src = '/images/placeholder.png')}
                      />
                      <div>
                        <h2 className="font-medium -ml-4 sm:-ml-0 w-20 sm:w-full">{product.name}</h2>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-wrap justify-center items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => increaseQuantity(product._id)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right sm:text-right font-semibold text-gray-800">
                      ₹{(product.price * quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="text-right text-xl font-bold mt-6">
                  Subtotal: ₹{subtotal.toFixed(2)}
                </div>
              </>
            )}
          </div>

          <div className='hidden sm:block border border-gray-300 lg:max-w-300 mt-6 h-[100px] lg:h-[180px] shadow rounded'>
            <img 
              src='/reward.jpg'
              alt='coupon'
              className='object-cover w-full h-full'
            />
          </div>
        </div>

        {/* Right Section: Checkout */}
        <div className="lg:col-span-1 sm:mt-16 mt-6 lg:px-6 px-0">
          <div className="sticky top-24 bg-white border border-gray-300 rounded p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-4">Order Summary</h2>
            <p className="mb-2">Items: {cartItems.length}</p>

            <div className="mb-4 border-b border-gray-300 pb-4">
              <label className="block mb-1 font-medium">Promo Code</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-full rounded"
              />
              <button
                onClick={() => applyPromoCode(promoCode)}
                className="mt-2 bg-primary text-white px-4 py-2 rounded "
              >
                Apply
              </button>
            </div>

            <p className="mb-2 mt-4 ">Tax (5%): ₹{taxAmount.toFixed(2)}</p>
            <p className="mb-2">Shipping: ₹{shippingFee.toFixed(2)}</p>
            <p className="mb-2 text-green-600">Discount: ₹{totalDiscount.toFixed(2)}</p>
            {promoDiscountAmount > 0 && (
              <p className="mb-2 text-green-600">Promo Discount: −₹{promoDiscountAmount.toFixed(2)}</p>
            )}
            <p className="text-xl font-semibold">Final Total: ₹{finalTotal.toFixed(2)}</p>

            
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary border border-primary text-white py-2 rounded hover:bg-white hover:border hover:border-primary hover:text-primary mt-4">
                Proceed to Checkout
              </button>
            
          </div>
        </div>
      </div>
      <div className='block sm:hidden '>
        <RewardsCard />
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
