// src/pages/MyPage.jsx

import React from 'react';
import roomImage from '../assets/room.png';
import '../styles/components/MyPage.css';

const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
};

const imgStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: 'auto',
};

function MyPage() {
    return (
        <div style={containerStyle}>
            <div>
                <img src={roomImage} alt="방 이미지" style={imgStyle} />
            </div>
        </div>
    );
}

export default MyPage;
