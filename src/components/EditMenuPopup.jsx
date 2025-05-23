import React, { useState } from 'react';

function EditMenuPopup({ menu, onClose, onUpdate }) {
  const [name, setName] = useState(menu.name);
  const [price, setPrice] = useState(menu.price);
  const [category, setCategory] = useState(menu.category);
  const [image, setImage] = useState(menu.image || ''); // เริ่มต้นด้วยรูปเดิมหรือค่าว่าง
  const [previewImage, setPreviewImage] = useState(menu.image || ''); // รูป preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // สร้าง object ของเมนูที่แก้ไข
    const updatedMenu = { ...menu, name, price, category, image };
    onUpdate(updatedMenu);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">แก้ไขเมนู</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">ชื่อรายการ</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ราคา</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">หมวดหมู่</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              <option value="ของหวาน">ของหวาน</option>
              <option value="ของคาว">ของคาว</option>
              <option value="เครื่องดื่ม">เครื่องดื่ม</option>
              <option value="ไอศกรีม">ไอศกรีม</option>
              <option value="ของมัน">ของมัน</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">เปลี่ยนรูปภาพ</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            {previewImage && (
              <div className="mt-2">
                <p className="text-gray-600">ตัวอย่างรูปภาพ:</p>
                <img src={previewImage} alt="Preview" className="w-full h-32 object-cover mt-2 rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuPopup;
