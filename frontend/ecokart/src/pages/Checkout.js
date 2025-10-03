import React, { useState, useEffect } from 'react';
import { getCart } from './CartUtils';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link, useNavigate } from 'react-router-dom';
import RotatingBanner from '../components/common/RotatingBanner';
import { FaGooglePay, FaCreditCard, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from './CartContext';


const Checkout = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    upiId: '',
    bankName: ''
  });
  const [errors, setErrors] = useState({});
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);
  }, []);

   const {
       
      subtotal,
      totalDiscount,
      taxAmount,
      shippingFee,
      finalTotal,
    } = useCart();

  const validateForm = () => {
    const newErrors = {};
    ['name', 'email', 'address', 'phone', 'paymentMethod'].forEach((field) => {
      if (!formData[field]) newErrors[field] = 'Fill your shipping details';
    });
    // Email validation
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    }

    // Phone validation (10 digits, adjust if needed)
    if (formData.phone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Enter a valid 10-digit phone number';
      }
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Choose your payment method';
    }

    if (formData.paymentMethod === 'creditCard') {
      ['cardNumber', 'cardExpiry', 'cardCVV'].forEach((field) => {
        if (!formData[field]) newErrors[field] = 'Required';
      });
    }
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber)) {
    newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (formData.cardExpiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Expiry must be in MM/YY format';
    }
    if (formData.cardCVV && !/^\d{3}$/.test(formData.cardCVV)) {
      newErrors.cardCVV = 'CVV must be 3 digits';
    }

    if (formData.paymentMethod === 'upi') {
    if (!formData.upiId) {
      newErrors.upiId = 'Required';
    } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
      newErrors.upiId = 'Enter a valid UPI ID (example: username@upi)';
    }
  }

  if (formData.paymentMethod === 'netBanking') {
    if (!formData.bankName) {
      newErrors.bankName = 'Required';
    } else if (formData.bankName.length < 3) {
      newErrors.bankName = 'Enter a valid bank name';
    }
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsPlacingOrder(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    const invoiceData = {
      orderNumber,
      user: formData,
      items: cartItems,
      subtotal,
      taxAmount,
      shippingFee,
      finalTotal,
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(invoiceData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    localStorage.setItem('latestOrder', JSON.stringify(invoiceData));

    setInvoice(invoiceData);
    setIsPlacingOrder(false);
  };

  const handleTrackOrder = () => {
    navigate('/track-order');
  };

  return (
    <div className=" min-h-screen font-poppins">
      <RotatingBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold font-poppins text-primary mb-8">Checkout</h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Checkout Form */}
         <section className="lg:col-span-2 border border-gray-300 shadow rounded p-8 space-y-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-4">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['name', 'email', 'address', 'phone'].map((field) => (
                <div key={field} className="relative">
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full border px-3 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <label
                    htmlFor={field}
                    className={`absolute left-3 text-sm text-gray-500 transition-all pointer-events-none ${
                      formData[field]
                        ? 'top-0 text-[9px] text-gray-600'
                        : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                    }`}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Method</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { value: 'upi', label: 'UPI', icon: <FaGooglePay size={24} className="text-gray-600" /> },
                  { value: 'creditCard', label: 'Credit Card', icon: <FaCreditCard size={20} className="text-gray-600" /> },
                  { value: 'netBanking', label: 'Net Banking', icon: <FaUniversity size={20} className="text-gray-600" /> },
                  { value: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave size={20} className="text-gray-600" /> }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center justify-center gap-2 w-fit px-4 py-2 border rounded-md cursor-pointer transition-all ${
                      formData.paymentMethod === method.value
                        ? 'border-primary bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {method.icon}
                    <span className="text-sm text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>}
            </div>

            {formData.paymentMethod === 'creditCard' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {['cardNumber', 'cardExpiry', 'cardCVV'].map((field) => (
                  <div key={field} className="relative">
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <label
                      htmlFor={field}
                      className={`absolute left-3 text-sm text-gray-500 transition-all pointer-events-none ${
                        formData[field]
                          ? 'top-0 text-[9px] text-gray-600'
                          : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                      }`}
                    >
                      {field === 'cardNumber' ? 'Card Number' : field === 'cardExpiry' ? 'MM/YY' : 'CVV'}
                    </label>
                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            )}

            {formData.paymentMethod === 'upi' && (
              <div className="relative">
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  className={`w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.upiId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <label
                  htmlFor="upiId"
                  className={`absolute left-3 text-sm text-gray-500 transition-all pointer-events-none ${
                    formData.upiId
                      ? 'top-0 text-[9px] text-gray-600'
                      : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }`}
                >
                  UPI ID (e.g., yourupi@bank)
                </label>
                {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
              </div>
            )}

            {formData.paymentMethod === 'netBanking' && (
              <div className="relative">
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.bankName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <label
                  htmlFor="bankName"
                  className={`absolute left-3 text-sm text-gray-500 transition-all pointer-events-none ${
                    formData.bankName
                      ? 'top-0 text-[9px] text-gray-600'
                      : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
                  }`}
                >
                  Bank Name
                </label>
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <Link to={`/cart`}>
                <button className="w-full col-span-1 hover:ring-1 ring-primary text-gray-700 border border-primary py-2 rounded font-semibold shadow">
                  Back to Cart
                </button>
              </Link>
            <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`w-full col-span-2 py-2 rounded font-semibold transition shadow flex items-center justify-center gap-2 ${
                  isPlacingOrder
                    ? 'bg-white border border-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-primary text-white '
                }`}
              >
                {isPlacingOrder ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>

            </div>
          </section>



          {/* Order Summary */}
          <section className="bg-white shadow rounded border border-gray-300 p-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-4 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.priceINR * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

              <div className="flex justify-between text-green-500">
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
       <div className='border border-gray-300 lg:max-w-300 mt-6   lg:h-[260px] shadow rounded'>
            <img 
            src='/reward.jpg'
            alt='coupon'
            className='object-cover w-full h-full'
            />
           </div>

      <Footer />

      {/* Invoice Modal */}
      {invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
  <div className="bg-white rounded p-8 shadow-2xl max-w-lg w-full space-y-6">
    <div className="flex items-center justify-between border-b pb-4">
      <h2 className="text-2xl font-bold text-green-600">Order Confirmed</h2>
      <span className="text-sm text-gray-500">#{invoice.orderNumber}</span>
    </div>

    <div className="space-y-2 text-sm text-gray-700">
      <div className="flex justify-between">
        <span className="font-medium">Name:</span>
        <span>{invoice.user.name}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Email:</span>
        <span>{invoice.user.email}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Phone:</span>
        <span>{invoice.user.phone}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Address:</span>
        <span className="text-right">{invoice.user.address}</span>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Ordered Items</h3>
      <ul className="space-y-1 text-gray-700 text-sm">
        {invoice.items.map(item => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.priceINR * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-t pt-4 flex justify-between items-center">
      <span className="text-lg font-semibold text-gray-700">Total Bill</span>
      <span className="text-lg font-bold text-primary">₹{invoice.finalTotal.toFixed(2)}</span>
    </div>

    <button
      onClick={handleTrackOrder}
      className="w-full bg-primary border border-primary hover:border hover:text-gray-700 hover:bg-white hover:border-primary text-white py-3 rounded font-semibold transition"
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
