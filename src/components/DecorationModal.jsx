import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/DecorationModal.css';
import ornamentFlowerImage from '../assets/ornament/flower.png';
import ornamentFishImage from '../assets/ornament/fish.png';
import ornamentHanrabongImage from '../assets/ornament/hanrabong.png';
import ornamentMountainImage from '../assets/ornament/mountain.png';
import ornamentWaveImage from '../assets/ornament/wave.png';
import addOrnamentImage from '../assets/ornament/add.png';
import lockedIcon from '../assets/locked.png'; // 잠금 아이콘
import NameInputModal from './NameInputModal'; // 새로운 컴포넌트 임포트

function DecorationModal({ isVisible, onClose, onSelect, userName }) {
    const [selectedId, setSelectedId] = useState(null);
    const [coins, setCoins] = useState(3000); // 예시로 현재 보유한 코인 설정
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseOrnament, setPurchaseOrnament] = useState(null);
    const [unlockedOrnaments, setUnlockedOrnaments] = useState([1, 2, 3]); // 기본적으로 잠금 해제된 장식들
    const [userOrnaments, setUserOrnaments] = useState([]); // 사용자가 추가한 장식들
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // 파일 입력 리셋을 위한 키
    const fileInputRef = useRef(null); // 파일 입력 참조
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [showNameInputModal, setShowNameInputModal] = useState(false);
    const [newOrnamentImage, setNewOrnamentImage] = useState(null);
    const [ornamentName, setOrnamentName] = useState(''); // 장식 이름 상태
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // 다음 버튼 비활성화 상태

    const initialOrnaments = [
        { id: 1, image: ornamentFlowerImage, name: '유채꽃', locked: false },
        { id: 2, image: ornamentHanrabongImage, name: '한라봉', locked: false },
        { id: 3, image: ornamentMountainImage, name: '산', locked: false },
        { id: 4, image: ornamentWaveImage, name: '파도', locked: true, price: 30 },
        { id: 5, image: ornamentFishImage, name: '고등어', locked: true, price: 50 },
        { id: 6, image: addOrnamentImage, name: '장식 추가', locked: true, price: 50 }
    ];

    const [ornaments, setOrnaments] = useState(initialOrnaments);

    const handleSelect = (ornament) => {
        if (ornament.locked && !unlockedOrnaments.includes(ornament.id)) {
            setPurchaseOrnament(ornament);
            setShowPurchaseModal(true);
            return;
        }
        if (selectedId === ornament.id) {
            setSelectedId(null); // 이미 선택한 장식을 다시 누르면 선택을 취소
            setIsNextButtonDisabled(true); // 선택을 취소하면 다음 버튼 비활성화
        } else {
            setSelectedId(ornament.id);
            if (ornament.id === 6 && unlockedOrnaments.includes(6)) {
                // '장식 추가' 아이콘이 잠금 해제된 상태에서 선택 시 파일 선택 창 열기
                setTimeout(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click();
                    }
                }, 0);
            } else {
                setIsNextButtonDisabled(false); // 다른 장식이 선택되면 다음 버튼 활성화
            }
        }
    };

    const handlePurchase = () => {
        if (purchaseOrnament && coins >= purchaseOrnament.price) {
            setCoins(coins - purchaseOrnament.price);
            if (purchaseOrnament.id === 6) {
                setUnlockedOrnaments([...unlockedOrnaments.filter(id => id !== 6), 6]);
                setTimeout(() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click(); // '장식 추가' 아이콘을 구매한 경우 파일 선택 창을 엶
                    }
                }, 0);
            } else {
                setUnlockedOrnaments([...unlockedOrnaments, purchaseOrnament.id]);
            }
            setShowPurchaseModal(false);
            setSelectedId(purchaseOrnament.id);
            setIsNextButtonDisabled(false); // 다른 장식 구매 후 선택 시 다음 버튼 활성화
        } else {
            alert('코인이 부족합니다.');
            setShowPurchaseModal(false);
        }
    };

    const handleNext = () => {
        if (!isNextButtonDisabled) {
            onSelect(selectedId);
            navigate(`/letter/${userName}/create`, { state: { ornamentId: selectedId } });
        }
    };

    const closePurchaseModal = () => {
        setShowPurchaseModal(false);
        setPurchaseOrnament(null);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewOrnamentImage(reader.result);
                setShowNameInputModal(true); // 이름 입력 모달 열기
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveName = (name) => {
        if (name.length > 0) {
            const newOrnament = { id: Date.now(), image: newOrnamentImage, name, locked: false };
            setOrnaments([...ornaments.filter(o => o.id !== 6), newOrnament, { id: 6, image: addOrnamentImage, name: '장식 추가', locked: true, price: 50 }]);
            setUnlockedOrnaments([...unlockedOrnaments.filter(id => id !== 6)]); // 장식 추가를 다시 잠금 상태로 변경
            setSelectedId(newOrnament.id);
            setIsNextButtonDisabled(false); // 이름이 저장되면 다음 버튼 활성화
            setFileInputKey(Date.now()); // 파일 입력 리셋
            setShowNameInputModal(false); // 이름 입력 모달 닫기
        } else {
            alert('이름을 입력해주세요.'); // 이름이 입력되지 않은 경우 경고 메시지
        }
    };

    const ornamentsPerPage = 10;
    const totalPages = Math.ceil(ornaments.length / ornamentsPerPage);

    const renderOrnaments = () => {
        const startIndex = currentPage * ornamentsPerPage;
        const endIndex = startIndex + ornamentsPerPage;
        const visibleOrnaments = ornaments.slice(startIndex, endIndex); // 현재 페이지에 해당하는 장식들

        return visibleOrnaments.map((ornament) => (
            <div
                key={ornament.id}
                className={`ornament-item ${selectedId === ornament.id ? 'selected' : ''} ${ornament.locked && !unlockedOrnaments.includes(ornament.id) ? 'locked' : ''}`}
                onClick={() => handleSelect(ornament)}
            >
                <div
                    className="ornament-background"
                    style={{ backgroundImage: `url(${ornament.image})` }} // 배경 이미지 설정
                >
                    {ornament.locked && !unlockedOrnaments.includes(ornament.id) && (
                        <div className="locked-overlay">
                            <img src={lockedIcon} alt="잠김 아이콘" className="locked-icon" />
                        </div>
                    )}
                </div>
                <p className="ornament-text">{ornament.name}</p>
            </div>
        ));
    };

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                        <p>보유 코인: {coins}원</p> {/* 현재 보유한 코인 표시 */}
                        <div className="ornament-container">
                            {renderOrnaments()}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                key={fileInputKey} // 파일 입력 리셋을 위한 키
                                ref={fileInputRef} // 파일 입력 참조 설정
                                style={{ display: 'none' }} // 파일 입력 요소 숨김
                            />
                        </div>
                        <div className="pagination-buttons">
                            <button onClick={goToPreviousPage} disabled={currentPage === 0}>이전</button>
                            <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>다음</button>
                        </div>
                        <button
                            className={`decoration-next-button ${isNextButtonDisabled ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={isNextButtonDisabled}
                        >
                            다음
                        </button>
                    </>
                )}
            </div>
            <NameInputModal
                isVisible={showNameInputModal}
                onClose={() => {
                    setShowNameInputModal(false);
                    setNewOrnamentImage(null); // 이름 입력 모달 닫을 때 이미지 초기화
                    setSelectedId(null); // 모달을 닫으면 선택 해제
                    setIsNextButtonDisabled(true); // 모달 닫으면 다음 버튼 비활성화
                }}
                onSave={handleSaveName}
            />
        </div>
    );
}

export default DecorationModal;
