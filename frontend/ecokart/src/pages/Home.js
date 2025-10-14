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
import RewardsCard from '../components/common/RewardsCard'


const Home = () => {
  return (
    <div className='overflow-hidden'>
      <RotatingBanner/>
      <Navbar />
      <HeroSection />
      <BestSeller />
      <Category />
      <Free />
      <OceanImpact />
      <Reviews />
      <div className='mt-2'>
      <RewardsCard />
      </div>
      <div className=''>
      <Footer />
      </div>
    </div>
  )
}

export default Home
