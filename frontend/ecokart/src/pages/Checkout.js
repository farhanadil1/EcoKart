import React, { useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RotatingBanner from '../components/common/RotatingBanner';
import { IoMdDoneAll } from "react-icons/io";



const Checkout = () => {
  const { cartItems, subtotal, totalDiscount, taxAmount, shippingFee, finalTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  const RAZORPAY_KEY_ID = "rzp_test_qDAV8sCeGjU7AR"; // frontend .env

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation
  const validateForm = () => {
    const newErrors = {};
    ['name', 'email', 'phone', 'address', 'city'].forEach(f => {
      if (!formData[f]) newErrors[f] = 'Required';
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsPlacingOrder(true);

    try {
      // Step 1: Create Razorpay order on backend
      const orderRes = await axios.post(
        'https://ecokart-fet7.onrender.com/api/orders/razorpay',
        { amount: Math.round(finalTotal) },
        { withCredentials: true }
      );

      const { id: razorpayOrderId } = orderRes.data.data;

      // Step 2: Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(finalTotal * 100),
        currency: 'INR',
        name: 'EcoKart',
        order_id: razorpayOrderId,
        handler: async function (response) {
          setIsProcessingPayment(true);
          // Step 3: Confirm order in backend
          const backendRes = await axios.post(
            'https://ecokart-fet7.onrender.com/api/orders/create',
            {
              shippingDetails: {
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city
              },
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id
            },
            { withCredentials: true }
          );

          setInvoice(backendRes.data.data);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#0ea5e9' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Try again.');
    } finally {
      setIsPlacingOrder(false);
      setIsProcessingPayment(false)
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <RotatingBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-primary mb-8">Checkout</h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Checkout Form */}
          <section className="lg:col-span-2 border border-gray-300 shadow rounded p-8 space-y-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-4">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email', 'phone', 'address', 'city'].map(f => (
                <div key={f} className="relative">
                  <input
                    type={f === 'email' ? 'email' : 'text'}
                    name={f}
                    value={formData[f]}
                    onChange={handleChange}
                    className={`w-full border px-3 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors[f] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <label
                    className={`absolute left-3 text-sm text-gray-500 transition-all pointer-events-none ${
                      formData[f] ? 'top-0 text-[9px] text-gray-600' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </label>
                  {errors[f] && <p className="text-red-500 text-sm mt-1">{errors[f]}</p>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Link to={`/cart`}>
                <button className="w-full col-span-1 hover:ring-1 ring-primary text-gray-700 border border-primary py-2 rounded font-semibold shadow">
                  Back to Cart
                </button>
              </Link>
         

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className={`w-full col-span-2 py-2 rounded font-semibold transition ${
                isPlacingOrder ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-primary text-white'
              }`}
            >
              {isPlacingOrder ? 'Processing...' : 'Pay Now'}
            </button>
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-white shadow rounded border border-gray-300 p-8">
            <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.product._id} className="flex justify-between">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />
            <div className="flex justify-between mb-1.5 text-green-500">
              <span>Discount</span>
              <span>₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>₹{shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}
      


      {/* Invoice Modal */}
      {invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded p-8 shadow-2xl max-w-lg w-full space-y-6">
            <h2 className="text-2xl font-bold flex text-green-600">Order Confirmed <IoMdDoneAll size={40} className='pl-2 -mt-1'/> </h2>
            
            <span className="text-sm text-gray-500">Order ID: #{invoice._id}</span>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Name:</span><span>{formData.name}</span></div>
              <div className="flex justify-between"><span>Email:</span><span>{formData.email}</span></div>
              <div className="flex justify-between"><span>Phone:</span><span>{formData.phone}</span></div>
              <div className="flex justify-between text-right"><span>Address:</span><span>{formData.address}, {formData.city}</span></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ordered Items</h3>
              <ul className="space-y-1 text-sm">
                {cartItems.map(item => (
                  <li key={item.product._id} className="flex justify-between">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total Bill</span>
              <span className="text-lg font-bold text-primary">₹{finalTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/track-order')}
              className="w-full bg-primary border border-primary text-white py-3 rounded font-semibold hover:bg-white hover:text-gray-700 hover:border-primary transition"
            >
              View Invoice & Track Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
