import { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const VAT_RATE = 0.07; // 7% VAT

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/menu-items");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const addToOrder = (item) => {
    const existingItem = orderItems.find((order) => order.id === item.id);
    if (existingItem) {
      setOrderItems((prev) =>
        prev.map((order) =>
          order.id === item.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        )
      );
    } else {
      setOrderItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (id) => {
    setOrderItems((prev) => prev.filter((order) => order.id !== id));
  };

  const editOrderQuantity = (id, newQuantity) => {
    setOrderItems((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, quantity: newQuantity } : order
      )
    );
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vat = subtotal * VAT_RATE;
    return { subtotal, vat, total: subtotal + vat };
  };

  const { subtotal, vat, total } = calculateTotal();

  const handlePrint = () => {
    const billContent = document.getElementById("bill-content").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = billContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // รีโหลดหน้าหลังพิมพ์
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">เมนูอาหาร</h1>

      {/* เมนูอาหาร */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:3000/${item.image}`}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-gray-600">{item.price.toFixed(2)} บาท</p>
              <button
                onClick={() => addToOrder(item)}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-blue-600"
              >
                เพิ่มในตะกร้า
              </button>
            </div>
          </div>
        ))}
      </div>

{/* ตะกร้าสินค้า */}
<div className="bg-white rounded-lg shadow-lg p-6">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">ตะกร้าสินค้า</h2>
  {orderItems.length === 0 ? (
    <p className="text-gray-600 text-center">ไม่มีรายการในตะกร้า</p>
  ) : (
    <div>
      {orderItems.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between border-b border-gray-150 py-4 mb-4"
        >
          {/* รายละเอียดสินค้า */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{order.name}</h3>
            <p className="text-gray-600">{order.price.toFixed(2)} บาท</p>
          </div>

          {/* ปุ่มเพิ่ม/ลดจำนวน */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                order.quantity > 1
                  ? editOrderQuantity(order.id, order.quantity - 1)
                  : removeFromOrder(order.id)
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-md"
            >
              -
            </button>
            <span className="text-lg font-bold text-gray-800">
              {order.quantity}
            </span>
            <button
              onClick={() => editOrderQuantity(order.id, order.quantity + 1)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md"
            >
              +
            </button>
          </div>

          {/* ปุ่มลบ */}
          <button
            onClick={() => removeFromOrder(order.id)}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600 ml-4"
          >
            ลบ
          </button>
        </div>
      ))}

      {/* สรุปยอด */}
      <div className="mt-6 border-t pt-4">
        <p className="text-gray-700">ยอดรวม: {subtotal.toFixed(2)} บาท</p>
        <p className="text-gray-700">VAT (7%): {vat.toFixed(2)} บาท</p>
        <p className="text-xl font-bold text-gray-800">ราคาสุทธิ: {total.toFixed(2)} บาท</p>
        <button
          onClick={() => setShowBill(true)}
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg w-full hover:bg-blue-600"
        >
          สรุปบิล & ปริ้น
        </button>
      </div>
    </div>
  )}
</div>



      {/* ป๊อปอัปบิล */}
      {showBill && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
          id="bill-content"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">บิลรายการอาหาร</h2>
            {orderItems.map((order) => (
              <div
                key={order.id}
                className="flex justify-between mb-2 border-b pb-2"
              >
                <span>{order.name}</span>
                <span>{order.quantity} x {order.price.toFixed(2)} บาท</span>
              </div>
            ))}
            <div className="mt-4 border-t pt-4">
              <p>ยอดรวม: {subtotal.toFixed(2)} บาท</p>
              <p>VAT (7%): {vat.toFixed(2)} บาท</p>
              <p className="text-lg font-bold">ราคาสุทธิ: {total.toFixed(2)} บาท</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              >
                ปริ้น
              </button>
              <button
                onClick={() => setShowBill(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
