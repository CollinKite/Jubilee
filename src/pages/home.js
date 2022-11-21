import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import './home.css'

function loadToken()
{
    let token = localStorage.getItem('token')
    console.log(token)
    if (token === null) {
        window.location.href = "/login";
    }
}

function logout()
{
    localStorage.removeItem('token');
    window.location.href = "/login";
}


const Home = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
    }, [])

    return (
        <>
            {loading === false ? (
            <div>
                {loadToken()}
                <div className='sidebar'>
                    <ul>
                        <li><a href="/home" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
                ) : (
                    <LoadingScreen />
                )
            }
        </>
    );
}

export default Home;