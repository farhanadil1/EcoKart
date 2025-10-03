import React from 'react'
import { Link } from 'react-router-dom'

const Free = () => {
  return (
    <div className="w-full h-full mt-12 relative">
        <Link to={'/auth'}>
            <img
            src="/free.jpg"
            alt="free-product"
            className="object-cover w-full h-full"
            />
            
          <button
            className="absolute bottom-24 right-40 border-2 border-primary
                        px-2 py-1 text-white bg-primary 
                        hover:border-2 hover:bg-pageBg hover:border-primary hover:text-primary 
                        sm:right-20 sm:px-10 
                        md:right-24 md:px-12 sm:py-2
                        lg:right-36 
                        max-sm:right-3 max-sm:bottom-3 max-sm:px-5 max-sm:text-sm"
            >
            Claim Your Free EcoBox
            </button>
            </Link>
       
    </div>
  )
}

export default Free
