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
    <div className="bg-beige-100 container mx-auto px-4 py-6">
      {/* <Link 
        to="/add" 
        className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 inline-block font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        เพิ่มรายการเมนู
      </Link> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src={`http://localhost:3000/${item.image}`} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-lg mt-2">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex space-x-2">
                <Link 
                  to={`/edit/${item.id}`} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
                >
                  แก้ไข
                </Link>
                <button 
                  onClick={() => deleteMenuItem(item.id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuList;
