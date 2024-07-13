import React from "react";
import "../styles/pages/Login.css";
import { Link } from "react-router-dom";
import { SubmitBtn } from "../components/Button";
import Input from "../components/Input";
import bg1 from "../assets/bg1.png";

function Login() {
    return (
        <div className="Login">
            <div className="login-background" style={{ backgroundImage: `url(${bg1})` }}></div>
            <form id="login-form">
                <div className="login-title">로그인</div>
                <div className="login-notice">초기 비밀번호는 <strong>1234</strong> 입니다. <br /> 비밀번호 변경 후 로그인해주세요.</div>
                <div className="login-input-section">
                    <Input
                        placeholder="아이디"
                        type="text"
                    />
                    <Input
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

export default Login;
