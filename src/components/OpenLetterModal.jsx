import React from 'react';
import '../styles/components/OpenLetterModal.css';

function OpenLetterModal({ isVisible, onClose, image, text, content }) {
    if (!isVisible) return null;

    return (
        <div className="open-letter-modal" onClick={onClose}>
            <div className="open-letter-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="open-letter-close-button" onClick={onClose}>&times;</span>
                <img src={image} alt="장식 이미지" className="open-letter-modal-image" />
                {text && <h3>{text}</h3>}
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
        </div>
    );
}

export default OpenLetterModal;
