import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/menu-items/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };
    fetchMenuItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/menu-items/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">ชื่อรายการ</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">ราคา</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">รูปภาพ</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ยืนยันรายการแก้ไข</button>
    </form>
  );
}

export default EditMenuItem;
