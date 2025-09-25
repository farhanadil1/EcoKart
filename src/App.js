import './App.css';
import 'nprogress/nprogress.css';  
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ScrollToTop from './components/common/ScrollToTop';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import Cart from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import AllProductsPage from './pages/AllProductsPage';
import AuthPage from './pages/AuthPage';
import UnderConstruction from './pages/Underconstruction';


const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    window.scrollTo(0, 0);  
    NProgress.done();
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteChangeTracker />  
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Categories />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/track-order' element={<TrackOrder />} />
        <Route path='/all-products' element={<AllProductsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={ <UnderConstruction />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
