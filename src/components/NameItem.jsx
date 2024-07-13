import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/NameItem.css";

function NameItem({ userName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/letter/${userName}`);
  };

  return (
    <div className="NameItem">
      <div className="userName">{userName}</div>
      <button className="go-btn" onClick={handleClick}>GO</button>
    </div>
  );
}

export default NameItem;
