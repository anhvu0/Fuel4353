import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import FuelQuoteForm from './FuelQuoteForm';
import FuelQuoteHistory from './FuelQuoteHistory';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CustomerProfile from './customer_profile';
import { NavLink } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
      <header>
        <h1>Smart Fuel Rates</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
                Home
              </NavLink>
            </li>
            <li>
              {/*<a href="/login">Login/Register</a>*/}
              <NavLink to="/login"  className={({ isActive }) => isActive ? 'active' : undefined}>
              Login/Register
              </NavLink>
            </li>
            <li>
            <NavLink to="/fuel-quote-form" className={({ isActive }) => isActive ? 'active' : undefined}>
              Fuel Quote Form
            </NavLink>
            </li>
            <li>
            <NavLink to="/fuel-quote-history" className={({ isActive }) => isActive ? 'active' : undefined}>
              Quote History
            </NavLink>
            </li>
            <li>
            <NavLink to="/customer-profile" className={({ isActive }) => isActive ? 'active' : undefined}>
              Customer Profile will be handled after logging in
            </NavLink>
            </li>
          </ul>
        </nav>
        <h2>Welcome to Our Service</h2>
      </header>
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