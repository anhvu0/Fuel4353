import React from 'react';
import '../FuelQuoteForm.css';
import mainPageImage from '../img/mainpage.jpg';
import { useNavigate } from 'react-router-dom'

const HomePage = (props) => {
  const { loggedIn, userName } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <main>
        <h2>Welcome to Our Service</h2>
        <input
          className={'button'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Hello, {userName}</div> : <div />}
        <img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
      </main>
     
    </div>

    
  );
};

export default HomePage;
