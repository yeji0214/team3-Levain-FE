import React, { useEffect, useState } from "react";
import "../styles/pages/Main.css";
import bg2 from "../assets/bg2.png";
import List from "../components/List";
import levain from "../assets/levain.png";
import { API_USERS } from "../config";
import axios from "axios";
import UserModal from "../components/UserModal";

function Main() {
    const [names, setNames] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleModalOpen = () => {
        setIsModalOpen(prevState => !prevState);
    };

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_USERS, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                console.log(response.data.data)
                setNames(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [accessToken]);

    return (
        <div className="Main" style={{ backgroundImage: `url(${bg2})` }}>
            <h1 className="Main-title">Honja Opseoye</h1>
            <List names={names} />
            <img 
                src={levain} 
                alt="levain" 
                className="levain-button"
                onClick={handleModalOpen}
            />
            <div className="letter-cnt">5</div>
            {isModalOpen && <UserModal/>}
        </div>
    );
}

export default Main;
