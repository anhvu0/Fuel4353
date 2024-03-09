import './App.css';
import './FuelQuoteForm.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header';
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './utils/PrivateRoute'
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
      <AuthProvider>
      {/*<Header />*/}
        <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <>
              <Header />
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />        
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;