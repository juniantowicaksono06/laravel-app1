import { ChatItemState } from "../../../interface"
import ChatCard from "./ChatCard"
const ChatSidebar = (props: {
    selectedCharacters: ChatItemState[]
}) => {
    return (
        <>
            <div className="modal fade" id="addCharacterModal" tabIndex={-1} aria-labelledby="addCharacterLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCharacterLabel">Halo</h5>
                            <button type="button" className="btn close-modal" data-bs-dismiss="modal" aria-label="Close">
                                <span><i className="fa fa-times"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-100 px-0 pt-4" id="ChatSideBar">
                <div className="px-3">
                    <h2 id="ChatHeader" className="mb-0">Chat</h2>
                </div>
                <div id="ChatLists" className="mt-3">
                    { props.selectedCharacters.map((char: ChatItemState, index: number) => {
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