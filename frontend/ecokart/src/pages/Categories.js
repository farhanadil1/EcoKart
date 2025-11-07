import React from "react";
import Category from "../components/home/Category";
import RotatingBanner from "../components/common/RotatingBanner";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Categories = () => {
  return (
    <div>
      <RotatingBanner />
      <Navbar />
      <div className="mt-6">
        <Category />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Categories;
