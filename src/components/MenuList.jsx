import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/menu-items');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/menu-items/${id}`);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <div>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Menu Item</Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img src={`http://localhost:3000/${item.image}`} alt={item.name} className="w-full h-32 object-cover mb-4" />
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-gray-700">${item.price}</p>
            <div className="mt-4">
              <Link to={`/edit/${item.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</Link>
              <button onClick={() => deleteMenuItem(item.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
