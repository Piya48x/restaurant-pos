import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-800 text-white p-4 flex items-center justify-between shadow-md">
      {/* โลโก้ร้าน */}
      <Link to="/">
        <img src="/images/logo.png" alt="Logo" className="h-12 w-12 rounded-full transition-transform transform hover:scale-110" />
      </Link>

      {/* ลิงก์เมนู */}
      <div className="flex space-x-6 text-lg font-medium">
        <Link 
          to="/" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          เมนู
        </Link>
        <Link 
          to="/add" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          เพิ่มเมนู
        </Link>
        <Link 
          to="/order" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          สั่งอาหาร
        </Link>
        <Link 
          to="/HomePage" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          เกี่ยวกับเรา
        </Link>
        <Link 
          to="/contact" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          ติดต่อเรา
        </Link>
        <Link 
          to="/login" 
          className="transition-colors duration-200 hover:text-yellow-400 hover:underline focus:text-yellow-400"
        >
          เข้าสู่ระบบ
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
