import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMenuItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // State for previewing the image
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('category', category);

    try {
      await axios.post('http://localhost:3000/menu-items', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="bg-beige-100 flex justify-center items-center min-h-screen -mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-brown-800 mb-6">เพิ่มรายการเมนู</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ชื่อรายการ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
            placeholder="ชื่อเมนู"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ราคา</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
            placeholder="ราคา"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">หมวดหมู่</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          >
            <option value="">เลือกหมวดหมู่</option>
            <option value="ของหวาน">ของหวาน</option>
            <option value="ของคาว">ของคาว</option>
            <option value="เครื่องดื่ม">เครื่องดื่ม</option>
            <option value="ไอติม">ไอติม</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">อัปโหลดรูปภาพ</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full text-gray-700 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
            required
          />
          {previewImage && (
            <div className="mt-4">
              <p className="text-gray-600">ตัวอย่างรูปภาพ:</p>
              <img src={previewImage} alt="Preview" className="w-full h-48 object-cover mt-2 rounded-md" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-md text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          เพิ่มรายการ
        </button>
      </form>
    </div>
  );
}

export default AddMenuItem;
