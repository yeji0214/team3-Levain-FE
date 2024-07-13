// src/pages/MyPage.jsx

import React, { useState } from 'react';
import '../styles/pages/MyPage.css';
import roomImage from '../assets/room.png';
import levainImage1 from '../assets/levain.png';
import levainImage2 from '../assets/levain.png';
import buttonLeftImage from '../assets/button-left.png';
import buttonRightImage from '../assets/button-right.png';

const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    backgroundImage: `url(${roomImage})`, // roomImage를 배경으로 설정
    backgroundSize: 'cover', // 배경 이미지를 화면에 맞춤
    backgroundPosition: 'center', // 배경 이미지를 가운데 정렬
    position: 'relative', // levainImage와 버튼 이미지를 배치하기 위해 필요
};

const levainStyle = {
    maxWidth: '45%', // levainImage의 최대 너비 설정
    maxHeight: '45%', // levainImage의 최대 높이 설정
    height: 'auto',
    display: 'block',
    margin: 'auto',
    position: 'absolute', // levainImage를 절대 위치로 설정
    top: '50%', // 부모 요소 중앙 정렬을 위해 세로 중앙 정렬
    left: '50%', // 부모 요소 중앙 정렬을 위해 가로 중앙 정렬
    transform: 'translate(-50%, -50%)', // 중앙 정렬을 위한 변형
    transition: 'opacity 0.5s ease-in-out', // opacity 속성에 대한 transition 설정
    opacity: 1, // 초기에는 보이도록 설정
};

const buttonStyle = {
    position: 'absolute',
    top: '50%', // 부모 요소 중앙 정렬을 위해 세로 중앙 정렬
    transform: 'translateY(-50%)', // 세로로 중앙 정렬을 위한 변형
    width: '150px', // 버튼 원의 지름 설정
    height: '150px', // 버튼 원의 지름 설정
    borderRadius: '50%', // 원 모양으로 만들기 위한 속성
    border: 'none', // 테두리 없앰
    background: 'transparent', // 배경 투명 설정
    cursor: 'pointer', // 마우스 커서를 포인터로 변경
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const buttonLeftStyle = {
    ...buttonStyle,
    left: 'calc(50% - 500px)', // 가운데에서 왼쪽으로 470px 이동
};

const buttonRightStyle = {
    ...buttonStyle,
    right: 'calc(50% - 500px)', // 가운데에서 오른쪽으로 470px 이동
};

const buttonImageStyle = {
    width: '50%', // 이미지 크기 설정
    height: 'auto', // 높이는 자동으로 조정
};

function MyPage() {
    const [levainImageVisible, setLevainImageVisible] = useState(true);

    const toggleLevainImage = () => {
        setLevainImageVisible((prevVisible) => !prevVisible);
    };

    return (
        <div style={containerStyle}>
            {/* 첫 번째 levainImage */}
            <img
                src={levainImage1}
                alt="돌하르방 이미지 1"
                style={{ ...levainStyle, opacity: levainImageVisible ? 1 : 0 }}
            />

            {/* 두 번째 levainImage */}
            <img
                src={levainImage2}
                alt="돌하르방 이미지 2"
                style={{ ...levainStyle, opacity: levainImageVisible ? 0 : 1 }}
            />

            {/* 왼쪽 버튼 */}
            <button style={buttonLeftStyle} onClick={toggleLevainImage}>
                <img src={buttonLeftImage} alt="왼쪽 버튼" style={buttonImageStyle} />
            </button>

            {/* 오른쪽 버튼 */}
            <button style={buttonRightStyle} onClick={toggleLevainImage}>
                <img src={buttonRightImage} alt="오른쪽 버튼" style={buttonImageStyle} />
            </button>
        </div>
    );
}

export default MyPage;
