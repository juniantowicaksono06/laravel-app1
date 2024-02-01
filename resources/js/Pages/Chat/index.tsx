import Main  from '../Main'
import ChatSidebar from './Components/ChatSidebar'
import ChatItem from './Components/ChatItem'
import "../../Styles/chat.scss"
import { usePage } from '@inertiajs/inertia-react'
import { Page } from '@inertiajs/inertia'
// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
import { setChatContentHeight } from "../../State/appView"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../Store/store'
import { ChatListPage, IconState, SelectedChatState } from '../../interface'
import { unsetChat } from '../../State/chat'
import '../../Styles/chat.scss'

const Chat = () => {
    const chatData = usePage<Page<ChatListPage>>()
    // Get User Character from Laravel
    const usersCharacters = chatData.props['usersCharacters']
    const dispatch = useDispatch()
    const selectedChat = useSelector<RootState, SelectedChatState>((state) => state.selectedChat.value)
    const icons = useSelector<RootState, IconState>((state) => state.appView.icon)
    const chatContentHeight = useSelector<RootState, number>((state) => state.appView.chatContentHeight)
    const appWidth = useSelector<RootState, number>((state) => state.appView.appWidth)
    
    let mobileBottomBarHeight = useSelector<RootState, number>((state) => state.appView.mobileBottomBarHeight)
    let chatInputheight = useSelector<RootState, number>((state) => state.appView.chatInputheight)
    let [containerHeight, setContainerHeight] = useState(window.innerHeight - mobileBottomBarHeight)
    function calculateChatSidebarListsHeight() {
        const windowHeight = window.innerHeight
            const sidebarHeader = document.querySelector("#ChatHeader")
            if(sidebarHeader == null) return
            let result = windowHeight - sidebarHeader!.clientHeight - 55
            dispatch(setChatContentHeight(window.innerHeight - chatInputheight))
            if(appWidth < 992) {
                result -= mobileBottomBarHeight
                dispatch(setChatContentHeight(window.innerHeight - chatInputheight - mobileBottomBarHeight))
            }
            document.querySelector<HTMLElement>("#ChatLists")!.style.maxHeight = `${result}px`
            setContainerHeight(window.innerHeight - mobileBottomBarHeight)
    }
    useEffect(() => {
        calculateChatSidebarListsHeight()
        // Show or hide the bottom bar on browser resize depending on the window width
        window.addEventListener("resize", function() {
            calculateChatSidebarListsHeight()
        })
    }, [])
    return (
        <>
            <Main>
                <div className='row mx-0 my-0 py-0' style={{
                    maxWidth: '100%',
                    height: appWidth >= 992 ? "100%": `${containerHeight}px`
                }}>
                    {
                        (appWidth >= 772  || Object.keys(selectedChat).length == 0) ?
                        <div className={appWidth < 772 && Object.keys(selectedChat).length == 0 ? "col-12 col-md-5 col-lg-5 col-xl-4 px-0" : appWidth >= 772 ? "col-12 col-md-5 col-lg-5 col-xl-4 px-0" : "col-12 col-md-5 col-lg-5 col-xl-4 px-0 d-none"} id="ChatSideBarContainer">
                            <ChatSidebar selectedCharacters={usersCharacters['characters']} />      
                        </div> : <></>
                    }
                    {
                        (appWidth < 772 && Object.keys(selectedChat).length > 0) || Object.keys(selectedChat).length > 0 ? 
                        <div className={appWidth < 772 && Object.keys(selectedChat).length > 0 ? "col-12 col-md-7 col-lg-7 col-xl-8 px-0" : appWidth >= 772 ? "col-12 col-md-7 col-lg-7 col-xl-8 px-0" : "col-12 col-md-7 col-lg-7 col-xl-8 px-0 d-none"} >
                            {     
                                Object.keys(selectedChat).length > 0 ? 
                                    <div id="SelectedChat">
                                        {/* Top bar */}
                                        <div id="SelectedChatTopBar" className='user-chat-topbar'>
                                            <div className="d-flex align-items-center fa-10x ms-2 me-5 mt-2">
                                                <button className='btn' onClick={() => {
                                                    dispatch(unsetChat())
                                                }}>
                                                    <span><i className="fa fa-chevron-left"></i></span>
                                                </button>
                                                <div className="d-flex align-items-center px-2 h-100">
                                                    <img src={`/img/character/${selectedChat['character_pic']}`} className="character-image" alt="" />
                                                    <p className="character-name">{ selectedChat['character_name'] }</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="ChatContent" style={{
                                            maxHeight: `${chatContentHeight}px`
                                        }}>
                                            <div style={{
                                                paddingTop: "80px"
                                            }}>
                                                <ChatItem/>
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
                        </div> : <></>
                    }
                </div>
            </Main>
        </>
    )
}

export default Chat