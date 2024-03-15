import { createContext, useState, useEffect, useCallback } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (sessionStorage.getItem('authTokens') ? jwtDecode(sessionStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (sessionStorage.getItem('authTokens') ? JSON.parse(sessionStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    

    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();

        if(response.ok){
            sessionStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            setTimeout(() => navigate('/'), 900);
            toast.success("Logged in successfully"); // Display success message
        } else {
            const errorMessage = data.detail || "Something went wrong while logging in the user!";
            toast.error(errorMessage); // Display error message
        }
    };

    let logoutUser = (e) => {
        //e.preventDefault()
        sessionStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        setTimeout(() => navigate('/login'), 450);
        toast.dismiss();
    }

    const updateToken = useCallback(async () => {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            sessionStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }, [authTokens, setAuthTokens, setUser, logoutUser])

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}