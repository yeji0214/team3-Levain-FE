import { Link } from "react-router-dom"

import { SubmitBtn } from "../components/Button"

import Input from "../components/Input"

function Login() {
    return (
        <div className="Login">
            <form>
                <div className="login-title">로그인</div>
                <div className="login-notice">초기 비밀번호는</div>
                <div className="input-section">
                    <Input
                        placeholder="아이디"
                        type="text"
                    />
                    <Input
                        placeholder="비밀번호"
                        type="password"
                    />
                </div>

                <SubmitBtn ButtonName="로그인" />
                <Link to='/password'>비밀번호 변경</Link>

            </form>
        </div>
    )
}

export default Login