import Input from "../components/Input"

function Password() {
    return (
        <div className="Login">
            <form>
                <div className="login-title">비밀번호 변경</div>
                <div className="input-section">
                    <Input
                        placeholder="id"
                        type="text"
                    />
                    <Input
                        placeholder="password"
                        type="password"
                    />
                    <Input
                        placeholder="password"
                        type="password"
                    />
                </div>
            </form>
        </div>
    )
}

export default Password