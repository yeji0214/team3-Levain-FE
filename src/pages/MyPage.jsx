import React, { useState } from 'react';
import '../styles/pages/MyPage.css';
import roomImage from '../assets/room.png';
import levainImage1 from '../assets/levain.png'; // 첫 번째 돌하르방 이미지
import levainImage2 from '../assets/levain.png'; // 두 번째 돌하르방 이미지
import buttonLeftImage from '../assets/button-left.png';
import buttonRightImage from '../assets/button-right.png';
import ornamentFlowerImage from '../assets/ornament/flower.png';
import ornamentFishImage from '../assets/ornament/fish.png';
import ornamentHanrabongImage from '../assets/ornament/hanrabong.png';
import ornamentMountainImage from '../assets/ornament/mountain.png';
import ornamentWaveImage from '../assets/ornament/wave.png';

const levainData = [
    {
        image: levainImage1,
        ornaments: [
            { transform: 'translate(-200%, -70%)', image: ornamentFlowerImage, text: '에리얼' },
            { transform: 'translate(-150%, -200%)', image: ornamentFishImage, text: '토니' },
            { transform: 'translate(-50%, -240%)', image: ornamentHanrabongImage, text: '베로니카' },
            { transform: 'translate(60%, -200%)', image: ornamentMountainImage, text: '엘리' },
            { transform: 'translate(100%, -70%)', image: ornamentWaveImage, text: '짭안' },
            { transform: 'translate(-110%, 80%)', image: ornamentFlowerImage, text: '리얼이안' },
            { transform: 'translate(10%, 80%)', image: ornamentHanrabongImage, text: '안알려줌' },
        ],
    },
    {
        image: levainImage2,
        ornaments: [
            { transform: 'translate(-200%, -70%)', image: ornamentMountainImage, text: '산돌' },
            { transform: 'translate(-150%, -200%)', image: ornamentWaveImage, text: '바다' },
            { transform: 'translate(-50%, -240%)', image: ornamentFlowerImage, text: '꽃돌' },
            { transform: 'translate(60%, -200%)', image: ornamentFishImage, text: '물고기' },
            { transform: 'translate(100%, -70%)', image: ornamentHanrabongImage, text: '한라봉' },
            { transform: 'translate(-110%, 80%)', image: ornamentFishImage, text: '물돌' },
            { transform: 'translate(10%, 80%)', image: ornamentMountainImage, text: '산' },
        ],
    },
];

function MyPage() {
    const [currentLevainIndex, setCurrentLevainIndex] = useState(0);

    const handleNextLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex + 1) % levainData.length);
    };

    const handlePreviousLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex - 1 + levainData.length) % levainData.length);
    };

    const handleOrnamentClick = (text) => {
        alert(text);
    };

    const currentLevain = levainData[currentLevainIndex];

    return (
        <div className="container" style={{ backgroundImage: `url(${roomImage})` }}>
            {/* 현재 levainImage */}
            <img
                src={currentLevain.image}
                alt={`돌하르방 이미지 ${currentLevainIndex + 1}`}
                className="levain-image"
            />

            {/* 현재 levain의 장식 이미지와 텍스트 */}
            {currentLevain.ornaments.map((ornament, index) => (
                <div key={index} style={{ ...ornament, position: 'absolute', top: '50%', left: '50%', width: '80px', height: '80px', textAlign: 'center' }}>
                    <button
                        className="ornament-button"
                        onClick={() => handleOrnamentClick(ornament.text)}
                    >
                        <img src={ornament.image} alt={`장식 버튼 ${index + 1}`} className="ornament-image" />
                    </button>
                    <div className="ornament-text">{ornament.text}</div>
                </div>
            ))}

            {/* 왼쪽 버튼 */}
            <button className="button button-left" onClick={handlePreviousLevain}>
                <img src={buttonLeftImage} alt="왼쪽 버튼" className="button-image" />
            </button>

            {/* 오른쪽 버튼 */}
            <button className="button button-right" onClick={handleNextLevain}>
                <img src={buttonRightImage} alt="오른쪽 버튼" className="button-image" />
            </button>
        </div>
    );
}

export default MyPage;
