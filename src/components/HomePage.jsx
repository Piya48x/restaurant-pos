import React from 'react';

function HomePage() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: 'url("/images/hero-image.jpg")' }}>
        <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
          <h1 className="text-white text-5xl font-bold">ยินดีต้อนรับสู่ร้านอาหารของเรา</h1>
        </div>
      </section>

      {/* ฟีเจอร์พิเศษ */}
      <section className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-6">เมนูแนะนำ</h2>
        <div className="flex justify-center gap-8">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="/images/dish1.jpg" alt="เมนูที่ 1" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-4">สลัดผักสด</h3>
            <p className="text-gray-600 mt-2">ราคา: ฿150</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="/images/dish2.jpg" alt="เมนูที่ 2" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-4">ข้าวผัดกุ้ง</h3>
            <p className="text-gray-600 mt-2">ราคา: ฿180</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <img src="/images/dish3.jpg" alt="เมนูที่ 3" className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-4">แกงเขียวหวานไก่</h3>
            <p className="text-gray-600 mt-2">ราคา: ฿200</p>
          </div>
        </div>
      </section>

      {/* รีวิวจากลูกค้า */}
      <section className="p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">รีวิวจากลูกค้า</h2>
        <div className="flex justify-center gap-8">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <p className="text-gray-600">“อาหารอร่อยมาก! บรรยากาศดีสุดๆ!”</p>
            <p className="text-right font-semibold">- ลูกค้าคนที่ 1</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <p className="text-gray-600">“บริการดีและรวดเร็ว รักร้านนี้มาก!”</p>
            <p className="text-right font-semibold">- ลูกค้าคนที่ 2</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
