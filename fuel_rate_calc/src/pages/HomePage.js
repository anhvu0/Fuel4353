import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../FuelQuoteForm.css';
import mainPageImage from '../img/mainpage.jpg';

const HomePage = () => {
    const { user, authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState(null);
    let [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                let data = await response.json();
                setProfile(data);
            } else if (response.status === 401) {
                logoutUser();
            }
            setProfileLoaded(true); // Indicates the profile fetch attempt was made
        } catch (error) {
            console.error("An error occurred while fetching the profile:", error);
            setProfileLoaded(true);
        }
    };

    return (
        <div>
            <p>Hello {user.username}!</p>
            {profileLoaded ? (
                profile ? (
                    <>
                        <p>Name: {profile.first_name} {profile.last_name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Address: {profile.address}</p>
                        <p>City: {profile.city}</p>
                        <p>State: {profile.state}</p>
                        <p>Zip: {profile.zip_code}</p>
                    </>
                ) : (
                    <p>Please go to your profile settings to update your profile information.</p>
                )
            ) : (
                <p>Loading profile...</p> // This can now safely be omitted if not needed
            )}
            <img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
        </div>
    );
};

export default HomePage;
