import React from 'react'
import {motion} from 'framer-motion'

const RewardsCard = () => {
  return (
    <div className='bg-pageBg font-poppins pt-6 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24'>
        <div className='grid grid-cols-1 lg:grid-cols-5 items-center gap-10'>

          {/* Text Section */}
          <div className='lg:col-span-3 text-center lg:text-left lg:mb-6'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold'>
              Ecokart Rewards.
            </h1>
            <p className='text-base sm:text-lg md:text-xl font-medium text-gray-700 pt-4 leading-relaxed'>
              Buy products on our website or through the EcoKart app
              <br className='hidden sm:block' />to earn points towards free vouchers. It's simple, spend
              <br className='hidden sm:block' />₹49, get 1 point. 60 points gets you exciting vouchers.
            </p>
            <button className='mt-6 bg-primary shadow rounded px-5 py-2 text-base sm:text-lg border border-primary hover:bg-pageBg hover:text-primary transition duration-300 text-white'>
              Apply 'SAVE10' for flat 10% discount.
            </button>
          </div>

          {/* Image Section */}
          <motion.div
            className="lg:col-span-2 flex justify-center -mt-6 lg:-mt-0"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img 
              src='../rewardscreen.png'
              alt='rewards'
              className='w-full max-w-sm sm:max-w-md lg:max-w-full h-auto'
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RewardsCard
