import "../styles/components/InfoInput.css";

function InfoInput({type, value, placeholder}) {
    return (
        <div className="InfoInputBox">
            <input
                className="InputBoxContent"
                type={type}
                placeholder={placeholder}
                value={value}
            />
        </div>
    )
}

export default InfoInput
