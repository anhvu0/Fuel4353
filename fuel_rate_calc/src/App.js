import './App.css';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import FuelQuoteForm from './FuelQuoteForm';
import FuelQuoteHistory from './FuelQuoteHistory';
import CustomerProfile from './customer_profile';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/fuel-quote-form" element={<FuelQuoteForm />} />
          <Route exact path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/fuel-quote-history" element={<FuelQuoteHistory />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;