import Input from "../components/Input"

function Login() {
    return (
        <div className="Login">
            <form>
                <div className="login-title">로그인</div>
                <div className="login-notice">초기 비밀번호는</div>
                <div className="input-section">
                    <Input
                        placeholder="id"
                        type="text"
                        value="id"
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        value="password"
                    />
                </div>
            </form>
        </div>
    )
}

export default Login