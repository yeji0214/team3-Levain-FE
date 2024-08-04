import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/DecorationModal.css';
import lockedIcon from '../assets/locked.png';
import addIcon from "../assets/ornament/add.png";
import NameInputModal from './NameInputModal';
import { API_ICONS, API_USER_ME, API_PURCHASE } from '../config';
import axios from 'axios';

function DecorationModal({ isVisible, onClose, onSelect, userName }) {
    const [selectedId, setSelectedId] = useState(null);
    const [coins, setCoins] = useState(0);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseOrnament, setPurchaseOrnament] = useState(null);
    const [unlockedOrnaments, setUnlockedOrnaments] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [showNameInputModal, setShowNameInputModal] = useState(false);
    const [newOrnamentImage, setNewOrnamentImage] = useState(null);
    const [ornamentName, setOrnamentName] = useState('');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [ornaments, setOrnaments] = useState([]);
    const token = localStorage.getItem("accessToken");

    // 모든 아이콘 정보 가져오기
    useEffect(() => {
        const fetchIcons = async () => {
            try {
                const response = await axios.get(API_ICONS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    console.log(response.data.data)
                    const fetchedOrnaments = response.data.data.map(icon => ({
                        id: icon.iconId,
                        image: `http://localhost:8080${icon.iconPath}`,
                        name: icon.iconName,
                        locked: !icon.purchased,
                        price: icon.price
                    }));

                    // 가격이 0인 아이콘들의 ID 목록 가져오기
                    const freeOrnaments = fetchedOrnaments
                        .filter(ornament => ornament.price === 0)
                        .map(ornament => ornament.id);

                    // 구매한 장식 목록 가져오기
                    const purchasedOrnaments = fetchedOrnaments
                        .filter(ornament => !ornament.locked)
                        .map(ornament => ornament.id);

                    const addOrnament = { 
                        id: fetchedOrnaments.length + 1,
                        image: newOrnamentImage || addIcon,
                        name: '장식 추가', 
                        locked: !newOrnamentImage,
                        price: 5
                    };

                    setOrnaments([...fetchedOrnaments, addOrnament]);
                    // 구매한 장식과 무료 장식을 초기값으로 설정
                    setUnlockedOrnaments([...purchasedOrnaments, ...freeOrnaments]);
                }
            } catch (error) {
                console.error('Failed to fetch icons:', error);
            }
        };

        fetchIcons();
    }, [token, newOrnamentImage]);

    // 로그인한 사용자 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUserMe = await axios.get(API_USER_ME, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(responseUserMe.data.data)
                setCoins(responseUserMe.data.data.reward); // 사용자의 코인 업데이트
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [token]);

    // 장식 선택 처리
    const handleSelect = (ornament) => {
        if (ornament.locked && !unlockedOrnaments.includes(ornament.id)) {
            setPurchaseOrnament(ornament);
            setShowPurchaseModal(true);
            return;
        }
        if (selectedId === ornament.id) {
            setSelectedId(null);
            setIsNextButtonDisabled(true);
        } else {
            setSelectedId(ornament.id);
            if (ornament.name === '장식 추가' && unlockedOrnaments.includes(ornament.id)) {
                setTimeout(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }, 0);
            } else {
                setIsNextButtonDisabled(false);
            }
        }
    };

    // 장식 구매 처리
    const handlePurchase = async () => {
        if (purchaseOrnament && (coins >= purchaseOrnament.price || purchaseOrnament.price === 0)) {
            try {
                const response = await axios.post(API_PURCHASE, {
                    iconId: purchaseOrnament.id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    // 구매 성공 시 코인 차감 및 잠금 해제 처리
                    setCoins(coins - purchaseOrnament.price);
                    setUnlockedOrnaments([...unlockedOrnaments, purchaseOrnament.id]);
                    setShowPurchaseModal(false);
                    setSelectedId(purchaseOrnament.id);
                    setIsNextButtonDisabled(false);
                } else {
                    console.error('Failed to purchase ornament:', response.status);
                }
            } catch (error) {
                console.error('Error during purchase:', error);
            }
        } else if (purchaseOrnament.price > 0) {
            alert('코인이 부족합니다.');
            setShowPurchaseModal(false);
        } else {
            alert('구매 오류가 발생했습니다.');
            setShowPurchaseModal(false);
        }
    };


    // 파일 입력 처리
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewOrnamentImage(file);
            setShowNameInputModal(true);
        }
    };

    // 새로운 장식 추가 처리
    const handleAdd = async () => {
        if (!isNextButtonDisabled) {
            if (selectedId === ornaments.length) {
                const formData = new FormData();
                formData.append('iconName', ornamentName);
                formData.append('price', '0');
                formData.append('iconImage', newOrnamentImage);

                try {
                    const response = await axios.post('http://localhost:8080/api/icons', formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.status === 200) {
                        const fetchIcons = async () => {
                            try {
                                const response = await axios.get(API_ICONS, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });

                                if (response.status === 200) {
                                    const fetchedOrnaments = response.data.data.map(icon => ({
                                        id: icon.iconId,
                                        image: `http://localhost:8080${icon.iconPath}`,
                                        name: icon.iconName,
                                        locked: !icon.purchased,
                                        price: icon.price
                                    }));

                                    const purchasedOrnaments = fetchedOrnaments
                                        .filter(ornament => !ornament.locked)
                                        .map(ornament => ornament.id);

                                    const addOrnament = { 
                                        id: fetchedOrnaments.length + 1,
                                        image: newOrnamentImage || addIcon,
                                        name: '장식 추가', 
                                        locked: !newOrnamentImage,
                                        price: 50 
                                    };

                                    setOrnaments([...fetchedOrnaments, addOrnament]);
                                    setUnlockedOrnaments(purchasedOrnaments);
                                }
                            } catch (error) {
                                console.error('Failed to fetch icons:', error);
                            }
                        };
                        fetchIcons();
                    } else {
                        console.error('Unexpected response status:', response.status);
                    }
                } catch (error) {
                    console.error('Failed to save new ornament:', error);
                }
            } else {
                onSelect(selectedId);
                navigate(`/letter/${userName}/create`, { state: { ornamentId: selectedId } });
            }
        }
    };

    // 구매 모달 닫기
    const closePurchaseModal = () => {
        setShowPurchaseModal(false);
        setPurchaseOrnament(null);
    };

    // 이벤트 전파 방지
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    // 장식 이름 저장
    const handleSaveName = (name) => {
        if (name.length > 0) {
            setOrnamentName(name);
            setShowNameInputModal(false);
        } else {
            alert('이름을 입력해주세요.');
        }
    };

    const ornamentsPerPage = 10;
    const totalPages = Math.ceil(ornaments.length / ornamentsPerPage);

    // 현재 페이지의 장식 렌더링
    const renderOrnaments = () => {
        const startIndex = currentPage * ornamentsPerPage;
        const endIndex = startIndex + ornamentsPerPage;
        const visibleOrnaments = ornaments.slice(startIndex, endIndex);

        return visibleOrnaments.map((ornament) => (
            <div
                key={ornament.id}
                className={`ornament-item ${selectedId === ornament.id ? 'selected' : ''} ${ornament.locked && !unlockedOrnaments.includes(ornament.id) ? 'locked' : ''}`}
                onClick={() => handleSelect(ornament)}
            >
                <div
                    className="ornament-background"
                    style={{ backgroundImage: `url(${ornament.image})` }}
                >
                    {ornament.locked && !unlockedOrnaments.includes(ornament.id) && coins < ornament.price && (
                        <div className="locked-overlay">
                            <img src={lockedIcon} alt="잠김 아이콘" className="locked-icon" />
                        </div>
                    )}
                </div>
                <p className="ornament-text">{ornament.name}</p>
            </div>
        ));
    };

    // 다음 페이지로 이동
    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 이전 페이지로 이동
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="decoration-modal" onClick={onClose}>
            <div className="decoration-modal-content" onClick={stopPropagation}>
                {showPurchaseModal ? (
                    <>
                        <span className="decoration-close-button" onClick={closePurchaseModal}>&times;</span>
                        <div className="purchase-modal-content">
                            <img src={purchaseOrnament.image} alt={purchaseOrnament.name} className="modal-image" />
                            <p className="purchase-modal-name">{purchaseOrnament.name}</p>
                            <p className="purchase-modal-price">{purchaseOrnament.price}원</p>
                            <p className="current-coins">보유 코인: {coins}원</p>
                            <div className="purchase-modal-buttons">
                                <button className="purchase-button" onClick={closePurchaseModal}>닫기</button>
                                <button className="purchase-button" onClick={handlePurchase}>구매하기</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="decoration-close-button" onClick={onClose}>&times;</span>
                        <h2>르방이 장식을 골라주세요</h2>
                        <p>보유 코인: {coins}원</p>
                        <div className="ornament-container">
                            {renderOrnaments()}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="pagination-buttons">
                            <button onClick={goToPreviousPage} disabled={currentPage === 0}>이전</button>
                            <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>다음</button>
                        </div>
                        <button
                            className={`decoration-next-button ${isNextButtonDisabled ? 'disabled' : ''}`}
                            onClick={handleAdd}
                            disabled={isNextButtonDisabled}
                        >
                            추가
                        </button>
                    </>
                )}
            </div>
            <NameInputModal
                isVisible={showNameInputModal}
                onClose={() => {
                    setShowNameInputModal(false);
                    setNewOrnamentImage(null);
                    setSelectedId(null);
                    setIsNextButtonDisabled(true);
                }}
                onSave={handleSaveName}
            />
        </div>
    );
}

export default DecorationModal;
