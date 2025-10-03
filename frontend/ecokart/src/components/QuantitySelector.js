import React, { useState } from 'react';

const QuantitySelector = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="mt-10 flex items-center gap-2">
    <div className='px-8 py-3 gap-6 border flex border-black text-black hover:bg-gray-100'>
      <button onClick={decrease}> − </button>
      <div >{quantity}</div>
      <button onClick={increase} >  + </button>
    </div>  
    <button
    onClick={() => onAddToCart(quantity)} 
    className="ml-6 lg:ml-14 w-full py-3 bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary">
        Add to Cart
    </button>
    </div>  
  );
};

export default QuantitySelector;