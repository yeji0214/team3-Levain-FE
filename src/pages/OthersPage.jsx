import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/pages/OthersPage.css';
import roomImage from '../assets/room.png';
import levainImage1 from '../assets/levain.png'; // 첫 번째 돌하르방 이미지
import levainImage2 from '../assets/levain.png'; // 두 번째 돌하르방 이미지
import DecorationModal from '../components/DecorationModal';
import searchImage from "../assets/search.png";
import ornamentFlowerImage from '../assets/ornament/flower.png';
import ornamentFishImage from '../assets/ornament/fish.png';
import ornamentHanrabongImage from '../assets/ornament/hanrabong.png';
import ornamentMountainImage from '../assets/ornament/mountain.png';
import ornamentWaveImage from '../assets/ornament/wave.png';
import buttonLeftImage from '../assets/button-left.png';
import buttonRightImage from '../assets/button-right.png';

const ornaments = [
    { id: 1, image: ornamentFlowerImage, name: '유채꽃' },
    { id: 2, image: ornamentHanrabongImage, name: '한라봉' },
    { id: 3, image: ornamentMountainImage, name: '산' },
    { id: 4, image: ornamentWaveImage, name: '파도' },
    { id: 5, image: ornamentFishImage, name: '고등어' }
];

const levainData = [
    {
        image: levainImage1,
        ornaments: [
            { transform: 'translate(-200%, -70%)', id: 1 },
            { transform: 'translate(-150%, -200%)', id: 2 },
            { transform: 'translate(-50%, -240%)', id: 3 },
            { transform: 'translate(60%, -200%)', id: 4 },
            { transform: 'translate(100%, -70%)', id: 5 },
            { transform: 'translate(-110%, 80%)', id: 1 },
            { transform: 'translate(10%, 80%)', id: 2 }
        ]
    },
    {
        image: levainImage2,
        ornaments: [
            { transform: 'translate(-200%, -70%)', id: 3 },
            { transform: 'translate(-150%, -200%)', id: 4 },
            { transform: 'translate(-50%, -240%)', id: 1 },
            { transform: 'translate(60%, -200%)', id: 2 },
            { transform: 'translate(100%, -70%)', id: 3 },
            { transform: 'translate(-110%, 80%)', id: 4 },
            { transform: 'translate(10%, 80%)', id: 5 }
        ]
    }
];

function OthersPage() {
    const { userName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLevainIndex, setCurrentLevainIndex] = useState(0);
    const [letters, setLetters] = useState([]);
    const [fromName, setFromName] = useState('');
    const [selectedOrnament, setSelectedOrnament] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const apiEndpoint = `http://localhost:8080/api/letters?page=0&userName=${userName}`;
        axios.get(apiEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('POST 요청 성공:', response.data);
        })
        .catch(error => {
            console.error('POST 요청 실패:', error);
        });

        if (location.state && location.state.ornamentId && location.state.from) {
            const newLetter = {
                ornamentId: location.state.ornamentId,
                from: location.state.from
            };
            setLetters([...letters, newLetter]);
        }
        if (location.state && location.state.message) {
            alert(`새 편지: ${location.state.message}`);
        }
    }, [location.state, userName]);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectOrnament = (id) => {
        navigate(`/letter/create`, { state: { ornamentId: id } });
    };

    const handleNextLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex + 1) % levainData.length);
    };

    const handlePreviousLevain = () => {
        setCurrentLevainIndex((prevIndex) => (prevIndex - 1 + levainData.length) % levainData.length);
    };

    const currentLevain = levainData[currentLevainIndex];

    return (
        <div className="container" style={{ backgroundImage: `url(${roomImage})` }}>
            <img
                src={searchImage}
                alt="Search"
                className="search-button"
                onClick={() => navigate('/main')}
            />
            <img src={currentLevain.image} alt="돌하르방 이미지" className="levain-image" />
            <button className="create-letter" onClick={handleOpenModal}>
                <span>편지 쓰기</span>
            </button>
            <DecorationModal
                isVisible={modalVisible}
                onClose={handleCloseModal}
                onSelect={handleSelectOrnament}
                userName={userName}
            />
            <div>{userName}</div>
            {letters.slice(currentLevainIndex * 7, (currentLevainIndex + 1) * 7).map((letter, index) => {
                const ornamentData = currentLevain.ornaments[index];
                const ornamentImage = ornaments.find(o => o.id === letter.ornamentId)?.image;
                return (
                    <div key={index} style={{ ...ornamentData, position: 'absolute', top: '50%', left: '50%', width: '80px', height: '80px', textAlign: 'center' }}>
                        <img src={ornamentImage} alt={`장식 ${index + 1}`} className="ornament-image" />
                        <div className="ornament-text">{letter.from}</div>
                    </div>
                );
            })}
            <button className="button button-left" onClick={handlePreviousLevain}>
                <img src={buttonLeftImage} alt="왼쪽 버튼" className="button-image" />
            </button>
            <button className="button button-right" onClick={handleNextLevain}>
                <img src={buttonRightImage} alt="오른쪽 버튼" className="button-image" />
            </button>
        </div>
    );
}

export default OthersPage;
