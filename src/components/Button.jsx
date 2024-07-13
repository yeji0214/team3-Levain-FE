export const SubmitBtn = ({ButtonName, onClick}) => {
    return (
        <div className="SubmitBtn-Box">
            <button className="submitBtn" onClick={onClick}>{ButtonName}</button>
        </div>

    )

}