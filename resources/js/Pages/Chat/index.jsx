import Main  from '../../Components/Main'
import ChatSidebar from './Components/ChatSidebar'
import "../../../css/chat.css"
import { usePage } from '@inertiajs/inertia-react'
// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
import { turnDark, turnLight } from "../../State/theme"
import { setAppWidth, setAppIcon } from "../../State/appView"
import { useDispatch, useSelector } from "react-redux"

const Chat = (props) => {
    const theme = useSelector((state) => state.theme.value)
    const chatData = usePage()
    const dispatch = useDispatch()
    const selectedChat = useSelector((state) => state.selectedChat.value)
    const icons = useSelector((state) => state.appView.icon)
    const appWidth = useSelector((state) => state.appView.appWidth)
    const { usersCharacters } = chatData.props
    
    let mobileBottomBarHeight = 70
    let [containerHeight, setContainerHeight] = useState(window.innerHeight - mobileBottomBarHeight)
    useEffect(() => {
        const windowHeight = window.innerHeight
        const sidebarHeader = document.querySelector("#ChatHeader")
        let result = windowHeight - sidebarHeader.clientHeight - 55
        if(appWidth < 992) {
            result -= mobileBottomBarHeight
        }
        document.querySelector("#ChatLists").style.maxHeight = `${result}px`
        const windowWidth = window.innerWidth
        dispatch(setAppWidth(windowWidth))
        window.addEventListener("resize", function() {
            const windowHeight = window.innerHeight
            const windowWidth = window.innerWidth
            const sidebarHeader = document.querySelector("#ChatHeader")
            let result = windowHeight - sidebarHeader.clientHeight - 55
            if(appWidth < 992) {
                result -= mobileBottomBarHeight
            }
            document.querySelector("#ChatLists").style.maxHeight = `${result}px`
            setContainerHeight(window.innerHeight - mobileBottomBarHeight)
            dispatch(setAppWidth(windowWidth))
        })
    }, [])

    function changeTheme() {
        if(theme == "light") {
            dispatch(setAppIcon({
                "chat": "fa-comments text-white",
                "settings": "fa-gear text-white",
                "theme": "fa-sun text-white",
                "logout": "fa-right-from-bracket text-white"
            }))
            dispatch(turnDark())
            sessionStorage.setItem("theme", "dark")
        }
        else {
            dispatch(setAppIcon({
                "chat": "fa-comments",
                "settings": "fa-gear",
                "theme": "fa-moon",
                "logout": "fa-right-from-bracket text-dark"
            }))
            dispatch(turnLight())
            sessionStorage.setItem("theme", "light")
        }
    }
    return (
        <>
            <Main>
                <div className='row mx-0 my-0 py-0' style={{
                    maxWidth: '100%',
                    height: appWidth >= 992 ? "100%": `${containerHeight}px`
                }}>
                    <div className={appWidth < 772 && Object.keys(selectedChat).length == 0 ? "col-12 col-md-5 col-lg-5 col-xl-4 px-0" : appWidth >= 772 ? "col-12 col-md-5 col-lg-5 col-xl-4 px-0" : "col-12 col-md-5 col-lg-5 col-xl-4 px-0 d-none"} id="ChatSideBarContainer">
                        <ChatSidebar selectedCharacters={usersCharacters['selected_characters']} />      
                    </div>
                    <div className={appWidth < 772 && Object.keys(selectedChat).length > 0 ? "col-12 col-md-7 col-lg-7 col-xl-8 px-0" : appWidth >= 772 ? "col-12 col-md-7 col-lg-7 col-xl-8 px-0" : "col-12 col-md-7 col-lg-7 col-xl-8 px-0 d-none"} >
                        {     
                            Object.keys(selectedChat).length > 0 ? 
                                <div id="SelectedChat">
                                    <div id="SelectedChatTopBar" className='user-chat-topbar'>
                                        <div className="d-flex align-items-center px-2 h-100">
                                            <img src={`/img/character/${selectedChat['character_pic']}`} className="character-image" alt="" />
                                            <p className="character-name">{ selectedChat['character_name'] }</p>
                                        </div>
                                    </div>
                                    <div id="ChatInput" className='user-chat-input'>
                                        <div className="d-flex px-4" style={{
                                            paddingTop: '15px'
                                        }}>
                                            <textarea className='form-control' id="UserInput" placeholder='Send a message...'></textarea>
                                            <button className='btn btn-success' style={{
                                                marginLeft: '20px'
                                            }}>
                                                <span>
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            : <></>
                        }
                    </div>
                </div>
                <div className={appWidth < 992 ? "col-12 d-flex justify-content-between" : "d-none"} id="MobileBottomBar" style={{
                    height: `${mobileBottomBarHeight}px`
                }}>
                    <button className="btn">
                        <i className={`fa-solid ${icons['chat']} fa-2x`}></i>
                    </button>
                    <button className="btn">
                        <i className={`fa-solid ${icons['settings']} fa-2x`}></i>
                    </button>
                    <button className="btn" onClick={changeTheme}>
                        <i className={`fa-solid ${icons['theme']} fa-2x`}></i>
                    </button>
                    <button className="btn">
                        <a href="/logout">
                            <i className={`fa-solid ${icons['logout']} fa-2x`}></i>
                        </a>
                    </button>
                </div>
            </Main>
        </>
    )
}

export default Chat