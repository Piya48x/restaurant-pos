// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuList from './components/MenuList';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';


function App() {
  return (
    <Router> <Navbar />
      <div className="bg-beige-100 min-h-screen p-6">

        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-800 mb-2">ร้าน ดอว์สันคาเฟ่</h1>
          <p className="text-lg text-gray-600">คาเฟ่ธรรมชาติสไตล์หมู่บ้านและทุ่งนา</p>
        </header>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<MenuList />} />
            <Route path="/add" element={<AddMenuItem />} />
            <Route path="/edit/:id" element={<EditMenuItem />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
