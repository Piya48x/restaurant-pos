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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full" required />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Item</button>
    </form>
  );
}

export default AddMenuItem;
