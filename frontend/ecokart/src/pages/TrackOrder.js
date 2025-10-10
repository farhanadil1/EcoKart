import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import RotatingBanner from '../components/common/RotatingBanner';

const TrackOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [deliveryDays, setDeliveryDays] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/orders/my-orders', {
          withCredentials: true,
        });
        const orders = res.data.data;
        setOrderList(orders.reverse());

        setDeliveryDays(
          orders.map(() => {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return days[Math.floor(Math.random() * days.length)];
          })
        );
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setOrderList([]);
      }
    };

    fetchOrders();
  }, []);
  
  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const selectedOrder = orderList[selectedOrderIndex];

  const subtotal = selectedOrder?.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) ?? 0;

  const taxAmount = subtotal * 0.05;
  const baseDiscountAmount = subtotal * 0.10;
  const promoApplied = selectedOrder?.promoCode ? true : false;
  const promoDiscountAmount = promoApplied ? subtotal * 0.10 : 0;
  const totalDiscount = baseDiscountAmount + promoDiscountAmount;
  const shippingFee = subtotal < 500 ? 40 : 0;
  const finalTotal = subtotal + taxAmount + shippingFee - totalDiscount;

  if (orderList.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="font-poppins mx-6 md:mx-10 mt-20 mb-16 text-center">
          <h1 className="text-3xl font-semibold text-[#0d2d1e] mb-6">Track Your Order</h1>
          <p className="text-gray-600">No order data found. Please place an order first.</p>
          <div className="mt-10 flex justify-center">
            <Link to={`/category`}>
              <button className="bg-primary border border-primary text-white px-6 py-2 hover:bg-white hover:border hover:border-primary hover:text-primary transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="font-poppins mx-6 md:mx-10 mt-10 mb-16">
        <h1 className="text-4xl font-bold text-[#0d2d1e] mb-10">Track Your Orders</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderList.map((order, index) => (
            <div key={order._id} className="bg-white rounded border border-gray-200 shadow-md overflow-hidden">
              <div className="p-6 space-y-4">
                {/* Order Summary */}
                <div className="flex justify-between items-center border-b pb-3">
                  <div className='sm:mt-[-22px]'>

                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-sm font-medium text-gray-800">{order._id}</p>
                    <div className="text-xs text-gray-500">
                    <p>Order Date <p className="font-medium text-gray-500">{formatDateTime(order.createdAt)}</p></p>
                  </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-xs font-medium text-green-600">{order.status}</p>
                    <p className="text-xs text-gray-500">
                      Est. Delivery: <span className="font-medium text-green-600">{deliveryDays[index]}</span>
                    </p>
                  </div>
                </div>

                {/* Product Preview */}
                <div className="space-y-3">
                  {order.orderItems.map(item => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.image || '/placeholder.png'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-700 font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                <button
                  onClick={() => setSelectedOrderIndex(index)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedOrderIndex !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setSelectedOrderIndex(null)}
          >
            <div
              className="bg-white rounded p-6 shadow-2xl max-w-xl w-full relative animate-fadeIn max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedOrderIndex(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold text-green-600 mb-4">Order Details</h2>

              <div className="overflow-y-auto custom-scrollbar pr-2 space-y-4 flex-1">
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Order ID:</strong> {orderList[selectedOrderIndex]._id}</p>
                  <p><strong>Status:</strong> <span className="text-green-600">{orderList[selectedOrderIndex].status}</span></p>
                  <p><strong>Est. Delivery:</strong> <span className="text-green-600">{deliveryDays[selectedOrderIndex]}</span></p>
                  <p>
                    <strong>Order Date:</strong> {formatDateTime(orderList[selectedOrderIndex].createdAt)}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Items</h3>
                  <ul className="space-y-3 text-gray-800 text-sm">
                    {orderList[selectedOrderIndex].orderItems.map(item => (
                      <li key={item._id} className="flex items-center gap-4 pb-2">
                        <img
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 space-y-1 text-sm text-gray-700">
                  <h3 className="font-semibold text-gray-800 mb-1">Customer Details</h3>
                  <p><strong>Name:</strong> {orderList[selectedOrderIndex].shippingDetails.fullName}</p>
                  <p><strong>Email:</strong> {orderList[selectedOrderIndex].shippingDetails.email}</p>
                  <p><strong>Phone:</strong> {orderList[selectedOrderIndex].shippingDetails.phone}</p>
                  <p><strong>Address:</strong> {orderList[selectedOrderIndex].shippingDetails.address}, {orderList[selectedOrderIndex].shippingDetails.city}</p>
                </div>

                <div className="border-t pt-4 text-right space-y-1 text-sm text-gray-800">
                  <p>Subtotal: ₹{subtotal?.toFixed(2) || "0.00"}</p>
                  <p>Tax (5%): ₹{taxAmount?.toFixed(2) || "0.00"}</p>
                  <p>Shipping: ₹{shippingFee?.toFixed(2) || "0.00"}</p>
                  <p className="text-green-600">Flat Discount: −₹{baseDiscountAmount?.toFixed(2) || "0.00"}</p>
                  {promoDiscountAmount > 0 && (
                    <p className="text-green-600">Promo Discount: −₹{promoDiscountAmount?.toFixed(2) || "0.00"}</p>
                  )}
                  <p className="text-green-600">Total Discount: −₹{totalDiscount?.toFixed(2) || "0.00"}</p>
                  <p className="font-bold text-lg pt-2">Total: ₹{finalTotal?.toFixed(2) || "0.00"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link to={`/home`}>
            <button className="bg-primary border border-primary text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
