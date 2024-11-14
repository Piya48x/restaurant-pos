import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMenuItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3000/menu-items', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div className="bg-beige-100 flex justify-center items-center min-h-screen">
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
          <label className="block text-gray-700 font-medium mb-2">อัปโหลดรูปภาพ</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="w-full text-gray-700 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500" 
            required 
          />
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
