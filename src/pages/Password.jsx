import React, { useState } from "react";
import "../styles/pages/Password.css";
import { SubmitBtn } from "../components/Button";
import InfoInput from "../components/InfoInput";
import bg2 from "../assets/bg2.png";
import axios from "axios";
import { API_PASSWORDCHECK, API_PASSWORD } from "../config";

function Password() {
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newPwdConfirm, setNewPwdConfirm] = useState("");
    const [currentPwdHelper, setCurrentPwdHelper] = useState("");
    const [newPwdHelper, setNewPwdHelper] = useState("");
    const [newPwdConfirmHelper, setNewPwdConfirmHelper] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleCurrentPwdChange = (e) => {
        setCurrentPwd(e.target.value);
        setCurrentPwdHelper("");
    };

    const handleNewPwdChange = (e) => {
        const value = e.target.value;
        setNewPwd(value);
        setNewPwdHelper("");
        validateForm(value, newPwdConfirm);
    };

    const handleNewPwdConfirmChange = (e) => {
        const value = e.target.value;
        setNewPwdConfirm(value);
        setNewPwdConfirmHelper("");
        validateForm(newPwd, value);
    };

    const handleCurrentPwdBlur = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setCurrentPwdHelper("토큰이 없습니다. 다시 로그인해주세요.");
            return;
        }

        try {
            const response = await axios.post(API_PASSWORDCHECK, { password: currentPwd }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setCurrentPwdHelper("");
            } else {
                setCurrentPwdHelper("현재 비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            setCurrentPwdHelper("비밀번호 확인 중 오류가 발생했습니다.");
        }
    };

    const validateNewPassword = (password) => {
        const regex = /^\d{4,6}$/; // 4-6자리 숫자
        return regex.test(password);
    };

    const validateForm = (password, confirmPassword) => {
        if (!validateNewPassword(password)) {
            setNewPwdHelper("비밀번호는 4-6자리 숫자로만 이루어져야 합니다.");
            setIsValid(false);
            return;
        }
        if (password !== confirmPassword) {
            setNewPwdConfirmHelper("비밀번호가 일치하지 않습니다.");
            setIsValid(false);
            return;
        }
        setIsValid(true);
        setNewPwdHelper("");
        setNewPwdConfirmHelper("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) {
            setCurrentPwdHelper("입력한 정보를 다시 확인해주세요.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            setCurrentPwdHelper("토큰이 없습니다. 다시 로그인해주세요.");
            return;
        }

        try {
            const changeResponse = await axios.post(API_PASSWORD, { newPassword: newPwd, newPasswordCheck: newPwdConfirm }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (changeResponse.status === 200) {
                setCurrentPwdHelper("");
                setNewPwdHelper("");
                setNewPwdConfirmHelper("");
                setCurrentPwd("");
                setNewPwd("");
                setNewPwdConfirm("");
                alert("비밀번호가 성공적으로 변경되었습니다.");
            } else {
                setCurrentPwdHelper("비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            setCurrentPwdHelper("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="Password" style={{ backgroundImage: `url(${bg2})` }}>
            <form id="password-form" onSubmit={handleSubmit}>
                <div className="password-title">비밀번호 변경</div>
                <div className="password-input-section">
                    <InfoInput
                        placeholder="현재 비밀번호"
                        type="password"
                        value={currentPwd}
                        onChange={handleCurrentPwdChange}
                        onBlur={handleCurrentPwdBlur}
                        helper={currentPwdHelper}
                    />
                    <InfoInput
                        placeholder="새 비밀번호"
                        type="password"
                        value={newPwd}
                        onChange={handleNewPwdChange}
                        helper={newPwdHelper}
                    />
                    <InfoInput
                        placeholder="새 비밀번호 확인"
                        type="password"
                        value={newPwdConfirm}
                        onChange={handleNewPwdConfirmChange}
                        helper={newPwdConfirmHelper}
                    />
                </div>
                <SubmitBtn ButtonName="submit" />
            </form>
        </div>
    );
}

export default Password;
