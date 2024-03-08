import './App.css';
import './FuelQuoteForm.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header';
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './utils/PrivateRoute'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
      <AuthProvider>
      <Header />
      <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;