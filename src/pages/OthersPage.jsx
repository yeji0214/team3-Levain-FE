import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/OthersPage.css';
import roomImage from '../assets/room.png';
import levainImage from '../assets/levain.png';
import DecorationModal from '../components/DecorationModal';

function OthersPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrnament, setSelectedOrnament] = useState(null);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectOrnament = (id) => {
        setSelectedOrnament(id);
        setModalVisible(false);
        // 선택된 장식 이미지를 사용하여 편지 작성 페이지로 이동하거나 추가 작업을 수행
        console.log('Selected Ornament:', id);
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${roomImage})` }}>
            {/* levainImage를 가운데에 보여주는 이미지 */}
            <img src={levainImage} alt="돌하르방 이미지" className="levain-image" />
            {/* 편지 쓰기 버튼 */}
            <button className="create-letter" onClick={handleOpenModal}>
                <span>편지 쓰기</span>
            </button>
            {/* 장식 고르는 모달 */}
            <DecorationModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                onSelect={handleSelectOrnament}
            />
        </div>
    );
}

export default OthersPage;
