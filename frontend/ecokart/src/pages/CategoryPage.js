import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RotatingBanner from '../components/common/RotatingBanner';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Free from '../components/common/Free';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DotBackgroundDemo } from '../components/common/DotBg';

const CategoryPage = () => {
  const [error, setError] = useState();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products',{
          withCredentials: true
        });
        const data = res.data.data || []; 
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('server down')
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Filter products by category from URL param
  const filteredProducts = products.filter(
    (p) =>
      p.category &&
      p.category.toLowerCase().trim() === category.toLowerCase().trim()
  );

  // Helper to title-case category heading
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  if(error){
    return <div className='font-poppins'>
      <RotatingBanner />
      <Navbar />
      <DotBackgroundDemo>
      <h2 className="text-3xl font-semibold md:pr-4 mb-6 pt-10 text-center text-[#0d2d1e]">
          {toTitleCase(category)}
        </h2>
      <div className='flex justify-center'>
      <img
        src='../serverdown.png'
        alt='server is down!'
        className='h-35 w-60'
      />
    </div>
    <p className='flex justify-center text-sm pb-8 px-8 text-gray-500'>We're currently experiencing technical difficulties. Please try again later.</p>
    </DotBackgroundDemo>
    <Footer />
    </div>

  }

  return (
    <div>
      <RotatingBanner />
      <Navbar />

      <section className="py-10 px-4 md:px-8 bg-white font-poppins">
        <h2 className="text-3xl font-semibold md:pr-4 mb-6 text-center text-[#0d2d1e]">
          {toTitleCase(category)}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skeleton Loading */}
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-4 gap-4 mt-2">
                  <Skeleton height={270} />
                  <Skeleton height={20} width="80%" className="mt-4" />
                  <Skeleton height={20} width="60%" className="mt-2" />
                  <Skeleton height={40} width="100%" className="mt-4" />
                </div>
              ))

            // Products Grid
            : filteredProducts.length > 0
            ? filteredProducts.map((product) => (
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
                          className="w-full h-auto md:w-[300px] md:h-[270px] object-fill transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                      <div className="relative group cursor-pointer">
                        <h3 className="text-lg font-bold font-raleway mt-4">
                          <Link to={`/product/${product._id}`}>
                            {product.name}
                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                          </Link>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {product.shortDescription}
                      </p>
                    </div>
                    <p className="text-primary font-roleway font-bold mt-2">
                      ₹{Number(product.price).toFixed(2)}
                    </p>
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-primary border-[1.5px] border-primary mt-4 text-white hover:bg-white hover:border-[1.5px] hover:border-primary hover:text-black transition duration-300 w-full p-2 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))

            // Empty state
            : (
              <p className="col-span-full text-center text-gray-600">
                No products found in <strong>{toTitleCase(category)}</strong> category.
              </p>
            )}
        </div>
      </section>

      <Free className="-mb-10" />
      <Footer />
    </div>
  );
};

export default CategoryPage;
