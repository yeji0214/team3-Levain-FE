import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/pages/Main.css";
import bg2 from "../assets/bg2.png";
import List from "../components/List";
import levain from "../assets/levain.png";

const mockData = [
    { id: 1, userName: "haisely_jang", nickname: "헤이즐리" },
    { id: 2, userName: "hazel_kwon", nickname: "헤이즐"},
    { id: 3, userName: "hailey_choi", nickname: "헤일리" },
    { id: 4, userName: "eric_ha", nickname: "에릭" },
    { id: 5, userName: "veronica_park", nickname: "베로니카" },
    {id : 6, userName: "ariel_jeong", nickname: "에리얼"}
];

function Main() {
    const [names, setNames] = useState(mockData);
    const navigate = useNavigate();

    const handleLevainClick = () => {
        navigate('/letter/my');
    };

    return (
        <div className="Main" style={{ backgroundImage: `url(${bg2})` }}>
            <h1 className="Main-title">WELCOME!</h1>
            <List names={names} />
            <img 
                src={levain} 
                alt="levain" 
                className="levain-button" 
                onClick={handleLevainClick}
            />
        </div>
    );
}

export default Main;
