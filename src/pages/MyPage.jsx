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

const availableDate = new Date('2024-08-01T00:00:00'); // 예시 열람 가능 시간 (열람 불가능한 경우)
// const availableDate = new Date('2024-07-01T00:00:00'); // 예시 열람 가능 시간 (열람 가능한 경우)

const levainData = [
    {
        image: levainImage1,
        ornaments: [
            { transform: 'translate(-200%, -70%)', image: ornamentFlowerImage, text: '에리얼', content: '저희 르방이 많이 사랑해주세요~~~' },
            { transform: 'translate(-150%, -200%)', image: ornamentFishImage, text: '토니', content: '제가 발표를 기깔나게 해보겠습니다 다들 걱정 ㄴㄴ' },
            { transform: 'translate(-50%, -240%)', image: ornamentHanrabongImage, text: '베로니카', content: '야무지고 화려한 css는 내 담당' },
            { transform: 'translate(60%, -200%)', image: ornamentMountainImage, text: '엘리', content: '백엔드? SO EASY~' },
            { transform: 'translate(100%, -70%)', image: ornamentWaveImage, text: '짭안', content: '저 이안이에요' },
            { transform: 'translate(-110%, 80%)', image: ornamentFlowerImage, text: '리얼이안', content: '아니다 내가 진짜다..' },
            { transform: 'translate(10%, 80%)', image: ornamentHanrabongImage, text: '보이드', content: '먹고 씻고 연애하고 사회생활을 하는 건 코딩 시간에 방해가 됩니다. 먹고 씻고 연애하고 사회생활을 하는 건 코딩 시간에 방해가 됩니다. 먹고 씻고 연애하고 사회생활을 하는 건 코딩 시간에 방해가 됩니다. 먹고 씻고 연애하고 사회생활을 하는 건 코딩 시간에 방해가 됩니다. 먹고 씻고 연애하고 사회생활을 하는 건 코딩 시간에 방해가 됩니다 !!!!!!!!!!!' },
        ],
    },
    {
        image: levainImage2,
        ornaments: [
            { transform: 'translate(-200%, -70%)', image: ornamentMountainImage, text: '산돌', content: '산돌의 편지 내용' },
            { transform: 'translate(-150%, -200%)', image: ornamentWaveImage, text: '바다', content: '바다의 편지 내용' },
            { transform: 'translate(-50%, -240%)', image: ornamentFlowerImage, text: '꽃돌', content: '꽃돌의 편지 내용' },
            { transform: 'translate(60%, -200%)', image: ornamentFishImage, text: '물고기', content: '물고기의 편지 내용' },
            { transform: 'translate(100%, -70%)', image: ornamentHanrabongImage, text: '한라봉', content: '한라봉의 편지 내용' },
            { transform: 'translate(-110%, 80%)', image: ornamentFishImage, text: '물돌', content: '물돌의 편지 내용' },
            { transform: 'translate(10%, 80%)', image: ornamentMountainImage, text: '산', content: '산의 편지 내용' },
        ],
    },
];

function MyPage() {
    const [currentLevainIndex, setCurrentLevainIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [modalImage, setModalImage] = useState('');

    const handleNextLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex + 1) % levainData.length);
    };

    const handlePreviousLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex - 1 + levainData.length) % levainData.length);
    };

    const handleOrnamentClick = (text, image, content) => {
        const now = new Date();
        if (now >= availableDate) {
            setModalText(text);
            setModalContent(content);
        } else {
            setModalText('');
            setModalContent(`지금은 열람 시간이 아닙니다.<br />열람 가능 시간: ${availableDate.toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}`);
        }
        setModalImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalText('');
        setModalContent('');
        setModalImage('');
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
                        onClick={() => handleOrnamentClick(ornament.text, ornament.image, ornament.content)}
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

            {/* 모달 */}
            {modalVisible && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <img src={modalImage} alt="장식 이미지" className="modal-image" />
                        {modalText && <h3>{modalText}</h3>}
                        <p dangerouslySetInnerHTML={{ __html: modalContent }}></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPage;
