import { useEffect } from "react"
import { setChat, unsetChat } from "../../../State/chat"
import { setChatContentHeight } from "../../../State/appView"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../Store/store"
import { AppViewState, SelectedChatState } from "../../../interface"

const ChatCard = (props: SelectedChatState) => {
    const dispatch = useDispatch()
    const selectedChat = useSelector<RootState, SelectedChatState>((state) => state.selectedChat.value)
    let chatInputheight = useSelector<RootState, number>((state) => state.appView.chatInputheight)
    const selectChat = () => {
        dispatch(setChat({
            "character_id": props.character_id,
            "character_name": props.character_name,
            "character_pic": props.character_pic
        }))
        window.history.pushState('chat', "", `/chat`);
        dispatch(setChatContentHeight(window.innerHeight - chatInputheight))
    }

    useEffect(() => {
        document.addEventListener('keydown', function(event) {
            // Check if the pressed key is the Escape key
            if (event.key === 'Escape' || event.key === 'Esc') {
              // Your code to handle the Escape key press
              dispatch(unsetChat())
            }
        });

        window.addEventListener('popstate', function(event) {
            event.preventDefault()
            dispatch(unsetChat())
        })

    }, [])

    return (
        <>
            <div className={selectedChat['character_id'] == props.character_id ? "chat-card active" : "chat-card"} onClick={selectChat}>
                <div className="d-flex align-items-center px-2">
                    <img src={`/img/character/${props.character_pic}`} className="character-image" alt="" />
                    <p className="character-name">{ props.character_name }</p>
                </div>
            </div>
        </>
    )
}

export default ChatCard