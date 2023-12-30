import ChatCard from "./ChatCard"
const ChatSidebar = (props) => {
    return (
        <>
            <div className="h-100 px-0 pt-4" id="ChatSideBar">
                <div className="px-3">
                    <h2 id="ChatHeader" className="mb-0">Chat</h2>
                </div>
                <div id="ChatLists" className="mt-3">
                    { props.selectedCharacters.map((char, index) => {
                        return (
                            <ChatCard key={index} character_pic={`${char['character_image']}`} character_name={`${char['character_name']}`} character_id={char['_id']} />
                        )
                    }) }
                </div>
            </div>
        </>
    )
}

export default ChatSidebar