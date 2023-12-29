import Main  from '../../Components/Main'
import ChatSidebar from './Components/ChatSidebar'
import "../../../css/chat.css"

const Chat = () => {
    return (
        <>
            <Main>
                <div className='row h-100 py-0'>
                    <div className="col-3 px-0" id="ChatSideBarContainer">
                        <ChatSidebar />      
                    </div>
                    <div className="col-9">
                        
                    </div>
                </div>
            </Main>
        </>
    )
}

export default Chat