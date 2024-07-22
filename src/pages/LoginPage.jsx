import React, { useState } from "react";
import "../styles/pages/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/Button";
import InfoInput from "../components/InfoInput";
import bg2 from "../assets/bg2.png";
import { validatePassword } from "../util/pwd-valid";
import { API_LOGIN } from "../config";
import axios from "axios";

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const nav = useNavigate()

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const { isValid, message } = validatePassword(newPassword);
        setPasswordError(isValid ? "" : message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { isValid } = validatePassword(password);
        if (!isValid) {
            alert("유효하지 않은 입력값이 있습니다.");
            return;
        }

        try {
            const response = await axios.post(API_LOGIN, {
                userName,
                password
            });
            if (response.status === 200) {
                const accessToken = response.data.data.token;
                console.log(response)
                    if (accessToken) {
                        localStorage.setItem("accessToken", accessToken);
                        alert("로그인 성공");
                        setTimeout(() => {
                            nav('/main');
                        }, 1000);
                    } else {
                        alert("토큰 없음");
                    }
                } else {
                    alert("로그인 실패");
                }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인에 실패했습니다.");
        }
    };

    return (
        <div className="Login" style={{ backgroundImage: `url(${bg2})` }}>
            <form id="login-form" onSubmit={handleSubmit}>
                <div className="login-title">로그인</div>
                <div className="login-notice">
                    초기 비밀번호는 <strong>00000000</strong> 입니다. <br /> 비밀번호 변경 후 로그인해주세요.
                </div>
                <div className="login-input-section">
                    <InfoInput
                        placeholder="아이디"
                        type="text"
                        helper="아이디는 '영어이름_성' 입니다."
                        marginRight="220px"
                        value={userName}
                        onChange={handleUserNameChange}
                    />
                    <InfoInput
                        placeholder="비밀번호"
                        type="password"
                        helper={passwordError}
                        marginRight="142px"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <SubmitBtn ButtonName="login"/>
                <Link to='/password'>비밀번호 변경</Link>
            </form>
        </div>
    );
}

export default LoginPage;
