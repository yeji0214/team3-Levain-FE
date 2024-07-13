import React from "react";
import "../styles/pages/LoginPage.css";
import { Link } from "react-router-dom";
import { SubmitBtn } from "../components/Button";
import InfoInput from "../components/InfoInput";
import bg2 from "../assets/bg2.png";

function LoginPage() {
    return (
        <div className="Login" style={{ backgroundImage: `url(${bg2})` }}>
            <form id="login-form">
                <div className="login-title">로그인</div>
                <div className="login-notice">초기 비밀번호는 <strong>1234</strong> 입니다. <br /> 비밀번호 변경 후 로그인해주세요.</div>
                <div className="login-input-section">
                    <InfoInput
                        placeholder="아이디"
                        type="text"
                    />
                    <InfoInput
                        placeholder="비밀번호"
                        type="password"
                    />
                </div>
                <SubmitBtn ButtonName="login" />
                <Link to='/password'>비밀번호 변경</Link>
            </form>
        </div>
    );
}

export default LoginPage;
