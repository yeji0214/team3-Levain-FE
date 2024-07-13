import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/OthersPage.css';
import roomImage from '../assets/room.png';
import levainImage from '../assets/levain.png';

function OthersPage() {
    return (
        <div className="container" style={{ backgroundImage: `url(${roomImage})` }}>
            {/* levainImage를 가운데에 보여주는 이미지 */}
            <img src={levainImage} alt="돌하르방 이미지" className="levain-image" />
            {/* 편지 쓰기 버튼 */}
            <Link to="/letter/create" className="create-letter">
                <span>편지 쓰기</span>
            </Link>
        </div>
    );
}

export default OthersPage;
