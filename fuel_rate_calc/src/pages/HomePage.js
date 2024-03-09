import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../FuelQuoteForm.css';

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
        <div className="form-container">
            <p>{user.username}'s Profile:</p>
            {profileLoaded ? (
                profile ? (
                    <div className="profile-table-container">
                        <table className="profile-table">
                            <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{profile.first_name} {profile.last_name}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{profile.address}</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>{profile.city}</td>
                            </tr>
                            <tr>
                                <td>State:</td>
                                <td>{profile.state}</td>
                            </tr>
                            <tr>
                                <td>Zip:</td>
                                <td>{profile.zip_code}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Please go to your profile settings to update your profile information.</p>
                )
            ) : (
                <p>Loading profile...</p> // This can now safely be omitted if not needed
            )}
            {/*<img src={mainPageImage} alt="Gas Station at Night" className="responsive-image" />
        */}</div>
    );
};

export default HomePage;
