import React from "react";
import { LuIndianRupee } from "react-icons/lu";

export default function PriceTag({ product }) {
  if (!product) return null;

  const mrp = Number(product.price);
  const discounted = (mrp - mrp * 0.1).toFixed(2); // 10% off

  return (
    <div className="mt-12 w-full border border-gray-200 bg-white p-4 rounded-md relative font-poppins">
      <div className="absolute top-0 left-4 text-base font-semibold text-gray-700 uppercase">
        PRICE
      </div>
      <div className="mt-6 flex items-center">
        <div className="text-xl text-black">MRP</div>
        <div className="text-lg text-gray-400 line-through ml-4">
          <LuIndianRupee className="inline" />
          {mrp.toFixed(2)}
        </div>
        <div className="text-2xl font-semibold flex text-black ml-4">
          <LuIndianRupee className="mt-1" />
          {discounted}
        </div>
        <div className="bg-primary text-white text-xs font-semibold ml-4 px-2 py-1 rounded">
          10% Off
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-400">(exclusive of all taxes)</div>
    </div>
  );
}
