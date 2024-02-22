import './App.css';
import FuelQuoteForm from './FuelQuoteForm';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>CS4353 Web App</h1>

      <Router>
        {/* Navigation bar */}
        <nav>
          <ul>
            {/* Navigation link to the home page */}
            <li>
              <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
                Home
              </NavLink>
            </li>
            {/* Navigation link to the Fuel Quote Form */}
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
          <Route exact path="/fuel-quote-form" element={<FuelQuoteForm />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;