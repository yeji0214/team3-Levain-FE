import roomImage from '../assets/room.png';

const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'auto',
    display: 'block',
    margin: 'auto'
};

function MyPage() {
    return (
        <img src={roomImage} alt="방 이미지" style={imgStyle} />
    )
}

export default MyPage