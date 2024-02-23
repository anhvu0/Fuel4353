import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import FuelQuoteForm from './FuelQuoteForm';
import FuelQuoteHistory from './FuelQuoteHistory';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CustomerProfile from './customer_profile';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/fuel-quote-form" element={<FuelQuoteForm />} />
          <Route exact path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/fuel-quote-history" element={<FuelQuoteHistory />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;