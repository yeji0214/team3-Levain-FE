import React from 'react';
import '../styles/components/OpenLetterModal.css';

function OpenLetterModal({ isVisible, onClose, image, text, content }) {
    if (!isVisible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={image} alt="장식 이미지" className="modal-image" />
                {text && <h3>{text}</h3>}
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
        </div>
    );
}

export default OpenLetterModal;
