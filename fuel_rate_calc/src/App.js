import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import Navbar from './Navbar';

import { AuthProvider } from './context/AuthContext'
import Header from './components/Header';
//import Footer from './Footer';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
      <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;