import React from 'react';

function MenuPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">เมนูอาหาร</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <img src="/images/dish1.jpg" alt="สลัดผักสด" className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">สลัดผักสด</h3>
          <p className="text-gray-600 mt-2">ราคา: ฿150</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <img src="/images/dish2.jpg" alt="ข้าวผัดกุ้ง" className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">ข้าวผัดกุ้ง</h3>
          <p className="text-gray-600 mt-2">ราคา: ฿180</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <img src="/images/dish3.jpg" alt="แกงเขียวหวานไก่" className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">แกงเขียวหวานไก่</h3>
          <p className="text-gray-600 mt-2">ราคา: ฿200</p>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
