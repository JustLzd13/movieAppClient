import React from 'react';
import logo from '../images/logo.png';


const Home = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '70vh', 
            textAlign: 'center' 
        }}>
            {/* Add the logo image */}
            <img src={logo} alt="Movies Resource Hub Logo" />
            <h1>Welcome to the Movies Resource Hub!</h1>
            <p>Explore movies, view movies, and know more about its details.</p>
        </div>
    );
}

export default Home;
