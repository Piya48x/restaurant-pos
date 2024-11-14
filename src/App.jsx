import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuList from './components/MenuList';
import AddMenuItem from './components/AddMenuItem';
import EditMenuItem from './components/EditMenuItem';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Cafe Menu Management</h1>
        <Routes>
          <Route path="/" element={<MenuList />} />
          <Route path="/add" element={<AddMenuItem />} />
          <Route path="/edit/:id" element={<EditMenuItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
