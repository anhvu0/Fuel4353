import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import '../FuelQuoteForm.css';
import mainPageImage from '../img/mainpage.jpg';

const HomePage = () => {
    let { user } = useContext(AuthContext)
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([])

  useEffect(() => {
      getProfile()
  },[])

  const getProfile = async() => {
      let response = await fetch('http://127.0.0.1:8000/api/profile', {
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      }
      })
      let data = await response.json()
      console.log(data)
      if(response.status === 200){
          setProfile(data)
      } else if(response.statusText === 'Unauthorized'){
          logoutUser()
      }
  }
  return (
  
      <div>
        { <p>Hello {user.username}!</p>}
          <p>Name: {profile.first_name} {profile.last_name}</p>
            <p>Email: {profile.email}</p>
            <p>Address: {profile.address}</p>
            <p>City: {profile.city}</p>
            <p>State: {profile.state}</p> 
            <p>Zip: {profile.zip_code}</p>
          <img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
      </div>

      );


};

export default HomePage;
