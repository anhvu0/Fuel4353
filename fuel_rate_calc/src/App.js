import './App.css';
import Login from './Login';
import Register from './Register';
import FuelQuoteForm from './FuelQuoteForm';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>Fuel Rate Web App</h1>

      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
                Home
              </NavLink>
            </li>
            <li>
              <a href="/login">Login/Register</a>
            </li>
            <li>
            <NavLink to="/fuel-quote-form" className={({ isActive }) => isActive ? 'active' : undefined}>
              Fuel Quote Form
            </NavLink>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route exact path="/" element={<h2>This is the main page</h2>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/fuel-quote-form" element={<FuelQuoteForm />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;