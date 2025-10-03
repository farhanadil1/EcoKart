import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const reviewData = [
  { name: 'Ayesha', rating: 5, time: '1 day ago', verified: true, description: 'Amazing quality and fast delivery. Highly recommend! The coffee pods arrived well-packaged and right on time. The flavor is rich and smooth—far better than most brands I’ve tried.' },
  { name: 'Ravi', rating: 4, time: '2 days ago', verified: true, description: 'Great eco-friendly packaging. Could improve variety.' },
  { name: 'Lina', rating: 5, time: '2 days ago', verified: true, description: 'Love the sustainability mission. Coffee tastes great too!' },
  { name: 'Kabir', rating: 4, time: '5 days ago', verified: true, description: 'Decent experience overall. The packaging was minimal and eco-conscious, which I appreciated. A couple of items felt slightly underfilled, but the quality was still solid. I love the mission behind Ecokart and will definitely explore more products from the catalog.' },
  { name: 'Meera', rating: 4, time: '6 days ago', verified: true, description: 'Impressed with the smooth texture and natural ingredients. The packaging was fully recyclable, which aligns perfectly with my values. Ecokart makes it easy to shop sustainably without compromising on quality. Looking forward to trying more from their range.' },
  { name: 'Zoya', rating: 5, time: '1 week ago', verified: true, description: 'Exceptional service and product. EcoBox is a win!' },
  { name: 'Arjun', rating: 4, time: '1 week ago', verified: true, description: 'Great value for money, especially considering the sustainable sourcing and thoughtful packaging. I really admire Ecokart’s commitment to recovering ocean-bound plastic—it adds purpose to every purchase. It’s reassuring to support a brand that’s making a real environmental impact.' },
  { name: 'Fatima', rating: 5, time: '1 week ago', verified: true, description: 'Best products I’ve had in a while. Love the cause behind it.' },
  { name: 'Sameer', rating: 5, time: '3 days ago', verified: true, description: 'The eco-friendly packaging really stands out. Products arrived safely and exactly as described. I’m very satisfied!' },
  { name: 'Priya', rating: 4, time: '4 days ago', verified: true, description: 'Good quality products and the mission is inspiring. Would love to see more variety soon.' },
  { name: 'Neha', rating: 5, time: '2 days ago', verified: true, description: 'Absolutely love Ecokart! EcoBox made my day with sustainable goodies and fast delivery.' },
  { name: 'Rohan', rating: 4, time: '5 days ago', verified: true, description: 'Reliable service and eco-conscious products. Very happy to support their vision.' },
];


const renderStars = (count) => (
  <div className="flex gap-1 mt-1">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ))}
  </div>
);

const Reviews = () => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <div className="bg-white py-10 px-4 font-poppins text-[#0d2d1e]">
      <div className='text-center flex justify-center'>
        <p className='underline mt-1'>Excellent</p>
        <div className='underline-offset-0 mb-6 ml-2 text-bold'>{renderStars(5)}</div>
        <p className='mt-1 ml-2'>Trusted</p>
      </div>
      <div className="text-2xl md:text-5xl font-medium text-center mb-8">
        Join 100,000+ customers choosing eco-friendly living with Ecokart.
      </div>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 px-3 py-2 rounded-full shadow hover:bg-gray-100"
        >
          ←
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-10 py-4"
        >
          {reviewData.map((review, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] cursor-pointer hover:bg-pageBg bg-gray-50 p-6 rounded-md shadow hover:shadow-lg transition shrink-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base">{review.name}</h3>
                <span className="text-xs text-gray-500">{review.time}</span>
              </div>

              {renderStars(review.rating)}

              {review.verified && (
                <div className="mt-1 text-xs text-green-600 font-semibold">✔ Verified</div>
              )}

              <p className="mt-4 text-xs lg:text-sm text-gray-700">{review.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 px-3 py-2 rounded-full shadow hover:bg-gray-100"
        >
          →
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <Link to={`/category`}>
        <button className="bg-primary border border-primary text-white px-6 py-2 hover:bg-white hover:border hover:border-primary hover:text-primary transition">
          Shop Now
        </button>
        </Link>
      </div>
      
    </div>
  );
};

export default Reviews;