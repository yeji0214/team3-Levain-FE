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

    const ornaments = [
        { id: 1, image: ornamentFlowerImage, name: '유채꽃', locked: false },
        { id: 2, image: ornamentHanrabongImage, name: '한라봉', locked: false },
        { id: 3, image: ornamentMountainImage, name: '산', locked: false },
        { id: 4, image: ornamentWaveImage, name: '파도', locked: true },
        { id: 5, image: ornamentFishImage, name: '고등어', locked: true }
    ];

    const handleSelect = (ornament) => {
        if (ornament.locked) {
            alert('이 아이템은 잠겨 있습니다. 코인을 모아야 합니다.');
            return;
        }
        setSelectedId(ornament.id);
    };

    const handleNext = () => {
        if (selectedId) {
            onSelect(selectedId);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>르방이 장식을 골라주세요</h2>
                <div className="ornament-container">
                    {ornaments.map((ornament) => (
                        <div
                            key={ornament.id}
                            className={`ornament-item ${selectedId === ornament.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(ornament)}
                        >
                            <div className="ornament-background">
                                <img src={ornament.image} alt={ornament.name} className="ornament-image" />
                                {ornament.locked && (
                                    <img src={lockedIcon} alt="잠김 아이콘" className="locked-icon" />
                                )}
                            </div>
                            <p className="ornament-text">{ornament.name}</p>
                        </div>
                    ))}
                </div>
                <button className="next-button" onClick={handleNext}>다음</button>
            </div>
        </div>
    );
}

export default DecorationModal;
