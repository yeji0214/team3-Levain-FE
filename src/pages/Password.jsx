import React from "react";
import "../styles/pages/Password.css";
import { SubmitBtn } from "../components/Button";
import InfoInput from "../components/InfoInput";
import bg2 from "../assets/bg2.png";

function Password() {
    return (
        <div className="Password" style={{backgroundImage: `url(${bg2})`}}>
            <form id="password-form">
                <div className="password-title">비밀번호 변경</div>
                <div className="password-input-section">
                    <InfoInput
                        placeholder="현재 비밀번호"
                        type="password"
                    />
                    <InfoInput
                        placeholder="새 비밀번호"
                        type="password"
                    />
                    <InfoInput
                        placeholder="새 비밀번호 확인"
                        type="password"
                    />
                </div>
                <SubmitBtn ButtonName="submit" />
            </form>
        </div>
    )
}

export default Password;