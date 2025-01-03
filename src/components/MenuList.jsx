import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditMenuPopup from './EditMenuPopup';

function MenuList() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([
    'ของหวาน',
    'ของมัน',
    'ของคาว',
    'เครื่องดื่ม',
    'ไอติม',
  ]); // หมวดหมู่ที่กำหนดไว้
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/menu-items', {
        params: {
          category: selectedCategory || undefined,
        },
      });
      setMenuItems(response.data);
      setFilteredItems(response.data); // กำหนดรายการเมนูที่กรองแล้ว
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleEditClick = (menu) => {
    setSelectedMenu(menu);
    setIsEditPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsEditPopupOpen(false);
    setSelectedMenu(null);
  };
  const handleMenuUpdate = async (updatedMenu) => {
    try {
      await axios.put(`http://localhost:3000/menu-items/${updatedMenu.id}`, updatedMenu);
      fetchMenuItems(); // อัปเดตรายการเมนูใหม่
      setIsEditPopupOpen(false);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleSearch = () => {
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // จัดกลุ่มเมนูตามหมวดหมู่
  const groupedMenuItems = filteredItems.reduce((acc, item) => {
    const category = item.category || 'อื่นๆ'; // ใช้ "อื่นๆ" หากไม่มีหมวดหมู่
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">รายการเมนู</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          เพิ่มรายการเมนู
        </Link>
      </div>

      {/* ช่องค้นหาเมนู */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-lg font-semibold text-gray-700 mb-2">
          ค้นหาเมนู:
        </label>
        <div className="flex space-x-4">
          <input
            id="search"
            type="text"
            placeholder="ค้นหาเมนู..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const autoFiltered = menuItems.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFilteredItems(autoFiltered);
            }}
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
          >
            ยืนยัน
          </button>
        </div>
      </div>

      {/* ตัวกรองหมวดหมู่ */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
          หมวดหมู่:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">ทั้งหมด</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* แสดงเมนู */}
      {/* {filteredItems.map((item) => (
        <div key={item.id} className="border rounded-lg shadow-lg p-4">
          <h2>{item.name}</h2>
          <button
            onClick={() => handleEditClick(item)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            แก้ไข
          </button>
        </div>
      ))} */}
      {isEditPopupOpen && selectedMenu && (
        <EditMenuPopup
          menu={selectedMenu}
          onClose={handlePopupClose}
          onUpdate={async (updatedMenu) => {
            try {
              await axios.put(`http://localhost:3000/menu-items/${updatedMenu.id}`, updatedMenu);
              fetchMenuItems(); // รีเฟรชรายการเมนู
              handlePopupClose();
            } catch (error) {
              console.error('Error updating menu item:', error);
            }
          }}
        />
      )}


      {/* แสดงเมนูที่จัดกลุ่มตามหมวดหมู่ */}
      {Object.keys(groupedMenuItems).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedMenuItems[category].map((item) => (
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
                  <p className="text-gray-600 text-lg mt-2">{item.price.toFixed(2)} บาท</p>
                  <p className="text-gray-500 text-sm mt-1">หมวดหมู่: {item.category}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
                    >
                      แก้ไข
                    </button>

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
      ))}
    </div>
  );
}

export default MenuList;
