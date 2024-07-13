import React, { useState } from 'react';
import '../styles/components/DecorationModal.css';
import ornamentFlowerImage from '../assets/ornament/flower.png';
import ornamentFishImage from '../assets/ornament/fish.png';
import ornamentHanrabongImage from '../assets/ornament/hanrabong.png';
import ornamentMountainImage from '../assets/ornament/mountain.png';
import ornamentWaveImage from '../assets/ornament/wave.png';
import lockedIcon from '../assets/locked.png'; // 잠금 아이콘

function DecorationModal({ isVisible, onClose, onSelect }) {
    const [selectedId, setSelectedId] = useState(null);
    const [coins, setCoins] = useState(50); // 예시로 현재 보유한 코인 설정
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseOrnament, setPurchaseOrnament] = useState(null);
    const [unlockedOrnaments, setUnlockedOrnaments] = useState([1, 2, 3]); // 기본적으로 잠금 해제된 장식들

    const ornaments = [
        { id: 1, image: ornamentFlowerImage, name: '유채꽃', locked: false },
        { id: 2, image: ornamentHanrabongImage, name: '한라봉', locked: false },
        { id: 3, image: ornamentMountainImage, name: '산', locked: false },
        { id: 4, image: ornamentWaveImage, name: '파도', locked: true, price: 30 },
        { id: 5, image: ornamentFishImage, name: '고등어', locked: true, price: 50 }
    ];

    const handleSelect = (ornament) => {
        if (ornament.locked && !unlockedOrnaments.includes(ornament.id)) {
            setPurchaseOrnament(ornament);
            setShowPurchaseModal(true);
            return;
        }
        if (selectedId === ornament.id) {
            setSelectedId(null); // 이미 선택한 장식을 다시 누르면 선택을 취소
        } else {
            setSelectedId(ornament.id);
        }
    };

    const handlePurchase = () => {
        if (purchaseOrnament && coins >= purchaseOrnament.price) {
            setCoins(coins - purchaseOrnament.price);
            setUnlockedOrnaments([...unlockedOrnaments, purchaseOrnament.id]);
            setShowPurchaseModal(false);
            setSelectedId(purchaseOrnament.id);
        } else {
            alert('코인이 부족합니다.');
            setShowPurchaseModal(false);
        }
    };

    const handleNext = () => {
        if (selectedId) {
            onSelect(selectedId);
        }
    };

    const closePurchaseModal = () => {
        setShowPurchaseModal(false);
        setPurchaseOrnament(null);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    if (!isVisible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={stopPropagation}>
                {showPurchaseModal ? (
                    <>
                        <span className="close-button" onClick={closePurchaseModal}>&times;</span>
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
                        <span className="close-button" onClick={onClose}>&times;</span>
                        <h2>르방이 장식을 골라주세요</h2>
                        <p>보유 코인: {coins}원</p> {/* 현재 보유한 코인 표시 */}
                        <div className="ornament-container">
                            {ornaments.map((ornament) => (
                                <div
                                    key={ornament.id}
                                    className={`ornament-item ${selectedId === ornament.id ? 'selected' : ''} ${ornament.locked && !unlockedOrnaments.includes(ornament.id) ? 'locked' : ''}`}
                                    onClick={() => handleSelect(ornament)}
                                >
                                    <div className="ornament-background">
                                        <img src={ornament.image} alt={ornament.name} className="ornament-image" />
                                        {ornament.locked && !unlockedOrnaments.includes(ornament.id) && (
                                            <div className="locked-overlay">
                                                <img src={lockedIcon} alt="잠김 아이콘" className="locked-icon" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="ornament-text">{ornament.name}</p>
                                </div>
                            ))}
                        </div>
                        <button className="next-button" onClick={handleNext}>다음</button>
                    </>
                )}
            </div>
            {showPurchaseModal && (
                <div className="modal purchase-modal" onClick={closePurchaseModal}>
                    <div className="modal-content purchase-modal-content" onClick={stopPropagation}>
                        <span className="close-button" onClick={closePurchaseModal}>&times;</span>
                        <img src={purchaseOrnament.image} alt={purchaseOrnament.name} className="modal-image" />
                        <p className="purchase-modal-name">{purchaseOrnament.name}</p>
                        <p className="purchase-modal-price">{purchaseOrnament.price}원</p>
                        <p className="current-coins">보유 코인: {coins}원</p>
                        <div className="purchase-modal-buttons">
                            <button className="purchase-button" onClick={closePurchaseModal}>닫기</button>
                            <button className="purchase-button" onClick={handlePurchase}>구매하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DecorationModal;
