import "../styles/components/InfoInput.css";

function InfoInput({ type, value, placeholder, helper, marginRight, onChange }) {
    return (
        <div className="InfoInputBox">
            <input
                className="InputBoxContent"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="helper-section">
                <div className="helper" style={{ marginRight: marginRight }}>
                    {helper}
                </div>
            </div>
        </div>
    );
}

export default InfoInput;
