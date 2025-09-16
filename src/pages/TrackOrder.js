import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RotatingBanner from '../components/common/RotatingBanner';

const TrackOrder = () => {
  const query = new URLSearchParams(useLocation().search);
  const encodedData = query.get('data');
  const orderData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : JSON.parse(localStorage.getItem('latestOrder'));

  if (!orderData) {
    return (
      <div>
        <Navbar />
        <div className="font-poppins mx-6 md:mx-10 mt-16 mb-16 text-center">
          <h1 className="text-3xl font-semibold text-[#0d2d1e] mb-6">Track Your Order</h1>
          <p className="text-gray-600">No order data found. Please place an order first.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
    <RotatingBanner />
    <Navbar />
      <div className="font-poppins mx-6 md:mx-10 mt-16 mb-16">
        <h1 className="text-3xl font-semibold text-[#0d2d1e] mb-6">Track Your Order</h1>

        <div className="bg-white p-6 rounded-xl border shadow space-y-6">
          {/* Order Status */}
          <div className="space-y-2">
            <p><strong>Order ID:</strong> {orderData.orderNumber}</p>
            <p><strong>Status:</strong> <span className="text-green-600">Order Received</span></p>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <p><strong>Name:</strong> {orderData.user.name}</p>
            <p><strong>Email:</strong> {orderData.user.email}</p>
            <p><strong>Phone:</strong> {orderData.user.phone}</p>
            <p><strong>Address:</strong> {orderData.user.address}</p>
          </div>

          {/* Item List */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Items Ordered</h2>
            <ul className="list-disc ml-6 text-gray-800 space-y-1">
              {orderData.items.map(item => (
                <li key={item.id}>
                  {item.name} × {item.quantity} — ₹{(item.priceINR * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-1 text-right text-gray-800">
            <p>Subtotal: ₹{orderData.subtotal.toFixed(2)}</p>
            <p>Tax (18%): ₹{orderData.taxAmount.toFixed(2)}</p>
            <p>Shipping: ₹{orderData.shippingFee.toFixed(2)}</p>
            {orderData.promoDiscountAmount > 0 && (
              <p className="text-green-600">Promo Discount: −₹{orderData.promoDiscountAmount.toFixed(2)}</p>
            )}
            <p className="font-bold text-xl mt-2">Total: ₹{orderData.finalTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
