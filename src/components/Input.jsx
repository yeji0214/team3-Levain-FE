import "../styles/components/Input.css";

function Input({type, value, placeholder}) {
    return (
        <div className="InputBox">
            <input
                className="InputBoxContent"
                type={type}
                placeholder={placeholder}
                value={value}
            />
        </div>
    )
}

export default Input
