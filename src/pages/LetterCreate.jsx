import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import '../styles/pages/LetterCreate.css';
import room from '../assets/room.png';

const LetterCreate = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // await axios.post('/api/send-letter', formData);
      setFlipCard(!flipCard);
      setTimeout(() => {
        navigate('/main');
      }, 3000);
    } catch (error) {
      console.error('Error sending letter:', error);
    }
  };

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
                    <div className='receiver'>베로니카</div>
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
                    <button type="submit" className="submit-card">Send Letter</button>
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
