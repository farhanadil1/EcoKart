import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DotBackgroundDemo } from "../common/DotBg";

const API = process.env.REACT_APP_API_URL;

const bestSellerIds = [
  "68e3b95a69a86aef05707295",
  "68e4aebad0461a981bc12572",
  "68e4a32ad0461a981bc11695",
  "68e3ba1669a86aef057073c2",
  "68e49c3cd0461a981bc10e78",
  "68e49dded0461a981bc1112c"
];

const NewArrivals = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/products/`, {
          withCredentials: true
        });
        const allProducts = res.data.data;

        //Filter only best sellers by _id
        const bestSellers = allProducts.filter((product) =>
          bestSellerIds.includes(product._id)
        );
        setProducts(bestSellers);
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
        setError("Server down.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-between py-10 px-4 md:px-8 items-center">
          <h2 className="text-2xl md:text-3xl font-semibold md:pr-4 font-poppins mb-3 text-[#0d2d1e]">
            New Arrivals
          </h2>
          <Link to={`/all-products`}>
            <p className="pr-2 mb-3 font-poppins hover:text-blue-500 text-xs font-medium hover:underline transition-all duration-200">
              See All
            </p>
          </Link>
        </div>
        <div className="flex justify-center items-center h-40 -mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>

    );
  }
  if (error) {
    return (
      <div className="pb-6">
        <DotBackgroundDemo>
          <h2 className="text-2xl md:text-3xl pt-6 font-semibold pl-4 font-poppins text-[#0d2d1e]">
            New Arrivals
          </h2>
          <div className="flex justify-center">
            <img
              src="./serverdown.png"
              alt="server is down!"
              className="h-35 w-60"
            />
          </div>
          <p className="flex justify-center px-4 text-sm pb-1 text-gray-500">
            We're currently experiencing technical difficulties. Please try
            again later.
          </p>
        </DotBackgroundDemo>
      </div>
    );
  }

  return (
    <section className="bg-white w-full max-w-7xl mx-auto">
      <div className="py-10 px-4 md:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-semibold md:pr-4 font-poppins mb-3 text-[#0d2d1e]">
            New Arrivals
          </h2>
          <Link to={`/all-products`}>
            <p className="pr-2 mb-3 font-poppins hover:text-blue-500 text-xs font-medium hover:underline transition-all duration-200">
              See All
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          {products.map((product) => (
            <div
              key={product._id}
              className="transition duration-300 gap-4 p-4 mt-2"
            >
              <div className="flex flex-col justify-between h-full">
                <div className="overflow-hidden">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-auto md:w-[200px] md:h-[205px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="relative group cursor-pointer">
                    <h3 className="text-md font-bold font-raleway mt-4">
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                      <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </h3>
                  </div>
                  <p className="text-xs font-poppins text-gray-500 mt-2">
                    {product.shortDescription}
                  </p>
                </div>
                <p className="text-primary text-sm font-roleway font-bold mt-2">
                  ₹{Number(product.price).toFixed(2)}
                </p>
                <Link to={`/product/${product._id}`}>
                  <button className="bg-primary mt-4 border-[1.5px] border-primary text-white hover:bg-white hover:border-[1.5px] hover:border-primary transition duration-300 hover:text-black w-full p-2">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
