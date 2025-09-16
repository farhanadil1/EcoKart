import React from 'react'
import RotatingBanner from '../components/common/RotatingBanner'
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/home/HeroSection'
import BestSeller from '../components/home/BestSeller'
import Category from '../components/home/Category'
import Free from '../components/common/Free'
import OceanImpact from '../components/home/OceanImpact'
import Reviews from '../components/home/Reviews'
import Footer from '../components/common/Footer'


const Home = () => {
  return (
    <div>
      <RotatingBanner/>
      <Navbar />
      <HeroSection />
      <BestSeller />
      <Category />
      <Free />
      <OceanImpact />
      <Reviews />
      <div className='mt-16'>
      <Footer />
      </div>
    </div>
  )
}

export default Home
