import './App.css';
import FuelQuoteForm from './FuelQuoteForm';
import SignIn from './log-in';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>CS4353 Web App</h1>

      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to="/"  className={({ isActive }) => isActive ? 'active' : undefined}>
                Home
              </NavLink>
            </li>
            <li>
            <NavLink to="./log-in"  className={({ isActive }) => isActive ? 'active' : undefined}>
                Log In
              </NavLink>
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
          <Route exact path="/log-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/fuel-quote-form" element={<FuelQuoteForm />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;