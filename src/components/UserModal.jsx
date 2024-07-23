import { useNavigate } from "react-router-dom"
import "../styles/components/UserModal.css"
import { useState, useEffect } from "react"

function UserModal() {
    const nav = useNavigate()
    
    return (
        <div className="UserModal">
            <p>안녕하세요 👋</p>
            <p><strong>베로니카 </strong> 님!</p>
            <div className="coin-section">
                보유코인 : 30
            </div>
            <div
                onClick={()=>nav("/letter/my")}
                className="myPage-section">
                <div className="icon">
                    <img src= "src/assets/user.png"/>
                </div>
                <span>My Page</span>
            </div>
            <div
                onClick={() => {
                    localStorage.removeItem("accessToken")
                    nav("/login")
                }}
                className="logout-section">
                <div className="icon">
                    <img src="src/assets/logout.png" />
                </div>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default UserModal