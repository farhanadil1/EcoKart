import React from "react";
import { GiRecycle } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { GiSeaTurtle } from "react-icons/gi";
import { GiChestnutLeaf } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Free = () => {
  const navigate = useNavigate();
  const gotoauth = () => {
    navigate("/auth");
  };
  return (
    <div className="bg-pageBg font-poppins pt-4 mt-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/*Left Section*/}
        <div className="mt-14 ml-6 lg:ml-14 text-left">
          <h3 className="bg-primary text-xs w-fit p-1 text-white">
            Subscribe & Save
          </h3>
          <h1 className="text-2xl md:text-3xl pt-6 lg:text-4xl font-semibold">
            Get a free ecobox when you subscribe to Ecokart.
          </h1>
          <p className="text-gray-600 font-normal pt-4">
            Better for the planet, better for youre bank balance. Plus you'll
            get a ecobox free.
          </p>
          {/*icons section*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 text-gray-600 lg:pb-20">
            <div className="flex">
              <div className="flex col-span-1 items-center justify-center w-10 h-10 border border-gray-700 rounded-full">
                <GiRecycle size={24} className="text-primary" />
              </div>
              <p className="pt-3 text-sm ml-2">
                Skip, Pause or Cancel anytime.
              </p>
            </div>
            <div className="flex">
              <div className="flex col-span-1 items-center justify-center w-10 h-10 border border-gray-700 rounded-full">
                <BsFillBoxSeamFill size={24} className="text-primary" />
              </div>
              <p className="pt-3 text-sm ml-2">Carbon neutral delivery.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-gray-700 rounded-full">
                <GiSeaTurtle size={24} className="text-primary" />
              </div>
              <p className="text-sm pt-3 lg:pt-0.5 items-center">
                Recover ocean plastic with every order.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-gray-700 rounded-full">
                <GiChestnutLeaf size={24} className="text-primary" />
              </div>
              <p className="text-sm pt-3 lg:pt-0.5 items-center">
                Your purchase helps restore natural habitats.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-right w-full">
            <h3 className="inline-block mr-10 p-1 mt-6 bg-primary text-white text-xs">
              Free EcoBox
            </h3>
          </div>
          <img
            src="../ecobox.png"
            alt="ecobox-free"
            className="w-[460px] h-[460px] object-contain ml-2 lg:-mt-8 lg:ml-16"
          />
          <div className="flex justify-center pb-10">
            <button
              onClick={gotoauth}
              className="bg-primary lg:-ml-14 -mt-6 text-white py-2 px-16 border border-primary hover:bg-pageBg hover:text-primary transition duration-300"
            >
              Claim your free EcoBox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Free;
