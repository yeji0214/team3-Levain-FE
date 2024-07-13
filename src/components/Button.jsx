import "../styles/components/Button.css"

export const SubmitBtn = ({ ButtonName }) => {
    return (
        <div className="SubmitBtn-Box">
            <button className="submitBtn">{ButtonName}</button>
        </div>

    )

}