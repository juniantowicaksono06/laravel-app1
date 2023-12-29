import ChatCard from "./ChatCard"
import { useEffect } from "react"
const ChatSidebar = () => {
    useEffect(() => {
        const window_height = window.innerHeight
        const sidebarHeader = document.querySelector("#ChatHeader")
        const result = window_height - sidebarHeader.clientHeight - 60
        document.querySelector("#ChatLists").style.maxHeight = `${result}px`
        window.addEventListener("resize", function() {
            const window_height = window.innerHeight
            const sidebarHeader = document.querySelector("#ChatHeader")
            const result = window_height - sidebarHeader.clientHeight - 60
            document.querySelector("#ChatLists").style.maxHeight = `${result}px`
        })
    }, [])
    return (
        <>
            <div className="h-100 px-4 py-4" id="ChatSideBar">
                <h2 id="ChatHeader" className="mb-0">Chat</h2>
                <div id="ChatLists" className="mt-3">
                    <ChatCard character_pic="Alya_Cute.jpg" character_name="Alisa Mikhailovna" />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar