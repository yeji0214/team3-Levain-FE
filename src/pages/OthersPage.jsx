import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/pages/OthersPage.css';
import roomImage from '../assets/room.png';
import levainImage from '../assets/levain.png';
import DecorationModal from '../components/DecorationModal';
import searchImage from "../assets/search.png";
import ornamentFlowerImage from '../assets/ornament/flower.png';
import ornamentFishImage from '../assets/ornament/fish.png';
import ornamentHanrabongImage from '../assets/ornament/hanrabong.png';
import ornamentMountainImage from '../assets/ornament/mountain.png';
import ornamentWaveImage from '../assets/ornament/wave.png';

const ornaments = [
    { id: 1, image: ornamentFlowerImage, name: '유채꽃' },
    { id: 2, image: ornamentHanrabongImage, name: '한라봉' },
    { id: 3, image: ornamentMountainImage, name: '산' },
    { id: 4, image: ornamentWaveImage, name: '파도' },
    { id: 5, image: ornamentFishImage, name: '고등어' }
];

function OthersPage() {
    const { userName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrnament, setSelectedOrnament] = useState(null);
    const [fromName, setFromName] = useState('');

    useEffect(() => {
        if (location.state && location.state.ornamentId && location.state.from) {
            setSelectedOrnament(location.state.ornamentId);
            setFromName(location.state.from);
        }
        if (location.state && location.state.message) {
            alert(`새 편지: ${location.state.message}`);
        }
    }, [location.state]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectOrnament = (id) => {
        navigate(`/letter/create`, { state: { ornamentId: id } });
    };

    const selectedOrnamentImage = ornaments.find(o => o.id === selectedOrnament)?.image;

    return (
        <div className="container" style={{ backgroundImage: `url(${roomImage})` }}>
            <img
                src={searchImage}
                alt="Search"
                className="search-button"
                onClick={() => navigate('/main')}
            />
            <img src={levainImage} alt="돌하르방 이미지" className="levain-image" />
            <button className="create-letter" onClick={handleOpenModal}>
                <span>편지 쓰기</span>
            </button>
            <DecorationModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                onSelect={handleSelectOrnament}
                userName={userName}
            />
            <div>
                {userName}
            </div>
            {selectedOrnament && (
                <div className="selected-ornament">
                    <img src={selectedOrnamentImage} alt="Selected Ornament" className="ornament-image" />
                    <p className="from-name">{fromName}</p>
                </div>
            )}
        </div>
    );
}

export default OthersPage;
