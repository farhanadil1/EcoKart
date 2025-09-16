import React, { useState, useEffect } from 'react';
import { getCart } from './CartUtils';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';
import RotatingBanner from '../components/common/RotatingBanner';

const Checkout = () => {
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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.priceINR * item.quantity,
    0
  );
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const shippingFee = subtotal > 1000 ? 0 : 100;
  const promoDiscountAmount = 0;
  const finalTotal = subtotal + taxAmount + shippingFee - promoDiscountAmount;

  const validateForm = () => {
    const newErrors = {};
    ['name', 'email', 'address', 'phone', 'paymentMethod'].forEach((field) => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });

    if (formData.paymentMethod === 'creditCard') {
      ['cardNumber', 'cardExpiry', 'cardCVV'].forEach((field) => {
        if (!formData[field]) newErrors[field] = 'Required for card payment';
      });
    }

    if (formData.paymentMethod === 'upi' && !formData.upiId) {
      newErrors.upiId = 'UPI ID is required';
    }

    if (formData.paymentMethod === 'netBanking' && !formData.bankName) {
      newErrors.bankName = 'Bank name is required';
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

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    const invoiceData = {
      orderNumber,
      user: formData,
      items: cartItems,
      subtotal,
      taxAmount,
      shippingFee,
      promoDiscountAmount,
      finalTotal
    };

    localStorage.setItem('latestOrder', JSON.stringify(invoiceData));
    setInvoice(invoiceData);
  };

  const handleTrackOrder = () => {
    const encoded = encodeURIComponent(JSON.stringify(invoice));
    navigate(`/track-order?data=${encoded}`);
  };

  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="font-poppins mx-6 md:mx-10 mt-16 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-semibold mb-6 text-[#0d2d1e]">Checkout</h1>
          <form className="space-y-4 bg-white p-6 rounded-xl border">
            {['name', 'email', 'address', 'phone'].map((field) => (
              <div key={field}>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors[field] ? 'border-red-500' : ''}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}

            {/* Payment Method */}
            <div>
              <label className="block mb-2 font-medium text-lg">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: 'UPI',
                    value: 'upi',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg'
                  },
                  {
                    label: 'Credit/Debit Card',
                    value: 'creditCard',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Visa_Electron.png'
                  },
                  {
                    label: 'Net Banking',
                    value: 'netBanking',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bank_Creative_Tail.svg'
                  },
                  {
                    label: 'Cash on Delivery',
                    value: 'cod',
                    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/P_money-green.svg'
                  }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center border rounded-lg p-3 cursor-pointer transition ${
                      formData.paymentMethod === method.value ? 'border-primary bg-gray-100' : 'border-gray-300'
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
                    <img
                      src={method.icon}
                      alt={method.label}
                      className="w-8 h-8 mr-4 object-contain"
                    />
                    <span className="text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
            </div>

            {/* Conditional Payment Fields */}
            {formData.paymentMethod === 'creditCard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="Expiry (MM/YY)"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors.cardExpiry ? 'border-red-500' : ''}`}
                />
                <input
                  type="text"
                  name="cardCVV"
                  placeholder="CVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors.cardCVV ? 'border-red-500' : ''}`}
                />
              </div>
            )}

            {formData.paymentMethod === 'upi' && (
              <div>
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter UPI ID"
                  value={formData.upiId}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors.upiId ? 'border-red-500' : ''}`}
                />
                {errors.upiId && <p className="text-red-500 text-sm">{errors.upiId}</p>}
              </div>
            )}

            {formData.paymentMethod === 'netBanking' && (
              <div>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Enter Bank Name"
                  value={formData.bankName}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${errors.bankName ? 'border-red-500' : ''}`}
                />
                {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
              </div>
            )}

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full bg-primary text-white px-6 py-3 rounded hover:bg-white hover:border hover:text-primary"
            >
              Place Order
            </button>
          </form>
        </div>


        {/* Cart Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 md:mt-3 text-[#0d2d1e]">Order Summary</h2>
          <div className="space-y-4 border rounded-xl p-6 bg-white shadow">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.priceINR * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <hr />
            <div className="text-right font-bold text-xl mt-2">
              Total: ₹{finalTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      {invoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-700">Order Placed Successfully!</h2>
            <p className="mb-2"><strong>Order No:</strong> {invoice.orderNumber}</p>
            <p><strong>Name:</strong> {invoice.user.name}</p>
            <p><strong>Email:</strong> {invoice.user.email}</p>
            <p><strong>Phone:</strong> {invoice.user.phone}</p>
            <p><strong>Address:</strong> {invoice.user.address}</p>
            <h3 className="mt-4 font-semibold">Items:</h3>
            <ul className="list-disc ml-6">
              {invoice.items.map(item => (
                <li key={item.id}>
                  {item.name} × {item.quantity} — ₹{(item.priceINR * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-lg">Total: ₹{invoice.finalTotal.toFixed(2)}</p>
            <button
              onClick={handleTrackOrder}
              className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-white hover:border hover:text-primary"
            >
              See Invoice & Track Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
