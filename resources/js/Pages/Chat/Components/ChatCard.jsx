

const ChatCard = (props) => {
    return (
        <>
            <div className="chat-card">
                <div className="d-flex align-items-center">
                    <img src={`/img/character/${props.character_pic}`} className="character-image" alt="" />
                    <p className="character-name">{ props.character_name }</p>
                </div>
            </div>       
        </>
    )
}

export default ChatCard