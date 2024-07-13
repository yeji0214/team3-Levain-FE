import React from "react";
import "../styles/pages/Password.css";
import { SubmitBtn } from "../components/Button";
import Input from "../components/Input";
import bg1 from "../assets/bg1.png";

function Password() {
    return (
        <div className="Password">
            <div className="password-background" style={{backgroundImage: `url(${bg1})`}}></div>
            <form id="password-form">
                <div className="password-title">비밀번호 변경</div>
                <div className="password-input-section">
                    <Input
                        placeholder="현재 비밀번호"
                        type="password"
                    />
                    <Input
                        placeholder="새 비밀번호"
                        type="password"
                    />
                    <Input
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