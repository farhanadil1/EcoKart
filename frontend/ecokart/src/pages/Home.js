import React, {useEffect} from "react";
import RotatingBanner from "../components/common/RotatingBanner";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/home/HeroSection";
import BestSeller from "../components/home/BestSeller";
import Category from "../components/home/Category";
import Free from "../components/common/Free";
import OceanImpact from "../components/home/OceanImpact";
import Reviews from "../components/home/Reviews";
import Footer from "../components/common/Footer";
import RewardsCard from "../components/common/RewardsCard";
import NewArrivals from "../components/common/NewArrivals";

const Home = () => {
  useEffect(() => {
    const imagesToLoad = [
      "./slide1.jpg",
      "./slide2.jpg",
      "./slide3.jpg",
      "./slide4.png",
      "./slide5.png",
      "./slide6.png",
      "./slide7.png",
      "./slide8.png",
    ];

    let loadedCount = 0;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
        }
      };
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <RotatingBanner />
      <Navbar />
      <HeroSection />
      <Category />
      <BestSeller />
      <Free />
      <OceanImpact />
      <NewArrivals />
      <Reviews />
      <div className="mt-2">
        <RewardsCard />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
