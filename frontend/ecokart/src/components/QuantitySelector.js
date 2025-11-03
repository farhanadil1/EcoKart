import React, { useState } from 'react';

const QuantitySelector = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="mt-10 flex items-center gap-2">
    <div className='px-8 py-3 gap-6 border flex border-black text-black hover:bg-gray-100'>
      <button onClick={decrease}> − </button>
      <div className='w-4 text-center'>{quantity}</div>
      <button onClick={increase} >  + </button>
    </div>  
    <button
      onClick={async () => {
        setAdding(true);
        await onAddToCart(quantity);
        setAdding(false);
      }}
      disabled={adding}
      className={`ml-6 lg:ml-14 w-full py-3 bg-primary text-white border-[1.5px] border-primary transition duration-300 hover:bg-white hover:border-[1.5px] hover:border-primary hover:text-primary ${adding ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {adding ? 'Adding...' : 'Add to Cart'}
    </button>
    </div>  
  );
};

export default QuantitySelector;