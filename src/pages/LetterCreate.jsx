import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/LetterCreate.css';
import { API_LETTERS } from '../config';

const LetterCreate = () => {
    const { userName } = useParams();
    const location = useLocation();
    const ornamentId = location.state?.ornamentId;
    const ornamentImage = location.state?.ornamentImage; // 추가된 장식 이미지 상태
    const [flipCard, setFlipCard] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        message: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (formData.from && formData.message) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setFlipCard(!flipCard);
            setTimeout(() => {
                navigate(`/letter/${userName}`, { state: { ornamentId, from: formData.from, ornamentImage } }); // ornamentImage 전달
            }, 3000);
        } catch (error) {
            console.error('Error sending letter:', error);
        }
    };

    const buttonHandler = async(e) => {
        if (!isValid) {
            e.preventDefault();
            alert("모든 입력값은 필수입니다.");
            return;
        }

        console.log(ornamentId);

        try {
            const token = localStorage.getItem("accessToken")
            const response = await axios.post(API_LETTERS, {
                content: formData.message,
                writer: formData.from,
                iconNum: ornamentId,
                receiver: userName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
        } catch(error) {
            console.error("폼 제출 중 에러 발생", error);
        }
    }

    return (
        <div id="container">
            <div className="contact-wrapper">
                <div className={`envelope ${flipCard ? 'active' : ''}`}>
                    <div className="back paper"></div>
                    <div className="content">
                        <div className="form-wrapper">
                            <form onSubmit={handleSubmit}>
                                <div className="top-wrapper">
                                    <div className="letter-receiver">
                                        <label>To.</label>
                                        <div className='receiver'>{userName}</div>
                                    </div>
                                    <div className="input">
                                        <label>From.</label>
                                        <input
                                            type="text"
                                            name="from"
                                            maxLength="5"
                                            placeholder="최대 5글자"
                                            value={formData.from}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="bottom-wrapper">
                                    <div className="input">
                                        <label>Message</label>
                                        <textarea
                                            rows="5"
                                            name="message"
                                            maxLength="200"
                                            placeholder="최대 200자"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="submit">
                                        <button type="submit" className="submit-card" onClick={buttonHandler}>Send Letter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="front paper"></div>
                </div>
            </div>
        </div>
    );
};

export default LetterCreate;
