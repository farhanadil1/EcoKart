import React from 'react';

const category = [
  { id: 1, img: '/category-skincare.jpg', link: '/category/skincare', name: 'Skincare' },
  { id: 2, img: '/category-household.jpg', link: '/category/household', name: 'Household' },
  { id: 3, img: '/category-babycare.jpg', link: '/category/baby care', name: 'Baby Care' },
  { id: 4, img: '/category-personalcare.jpg', link: '/category/personal care', name: 'Personal Care' },
];

const Category = () => {
  return (
    <div className="font-poppins px-4 md:px-8 bg-white">
      <div className="text-3xl font-semibold text-[#0d2d1e] mb-6">
        Shop by Category
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 px-4 gap-8">
        {category.map((cat) => (
          <div key={cat.id} className="transition duration-300 gap-4 p-4 mt-2 group">
            <div className="flex flex-col justify-between h-full items-center">
              <div className="overflow-hidden w-full md:w-[260px] md:h-[200px]">
                <a href={cat.link}>
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-y-90 origin-top"
                  />
                </a>
              </div>

              <div className="mt-4 cursor-pointer">
                <div className="relative inline-block">
                  <h2 className="text-sm text-center relative">
                    <a href={cat.link}>
                    {cat.name}
                    <span className="absolute left-0 top-full w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;