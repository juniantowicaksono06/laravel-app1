import { useSelector, useDispatch } from "react-redux"
import { turnDark, turnLight } from "../State/theme"
import { setAppHeight, setAppWidth } from "../State/appView"
import { useEffect, useState } from "react"
import { RootState } from "../Store/store"
import { IconState } from "../interface"
import '../Styles/app.scss'
import '../Styles/chat.scss'
import { useRef } from "react"
const Main = (props: {
    children: React.ReactNode
}) => {
    let mobileBottomBarHeight = useSelector<RootState, number>((state) => state.appView.mobileBottomBarHeight)
    const theme = useSelector<RootState, string>((state) => state.theme.value)
    const appWidth = useSelector<RootState, number>((state) => state.appView.appWidth)
    const dispatch = useDispatch()
    const icons = useSelector<RootState, IconState>((state) => state.appView.icon)
    interface PopupMenuType {
        createLeftRef: React.MutableRefObject<HTMLDivElement | null>,
        createBottomRef: React.MutableRefObject<HTMLDivElement | null>,
        userLeftRef: React.MutableRefObject<HTMLDivElement | null>,
        userBottomRef: React.MutableRefObject<HTMLDivElement | null>
    }
    const popupMenuRef: PopupMenuType  = {
        createLeftRef: useRef(null),
        createBottomRef: useRef(null),
        userLeftRef: useRef(null),
        userBottomRef: useRef(null)
    }

    const togglePopup = (selectedRef: "createLeftRef" | "createBottomRef" | "userBottomRef" | "userLeftRef", close = false) => {
        const ref = popupMenuRef[selectedRef]
        const menuPopup = ref.current?.querySelector('.menu-popup')

        if(menuPopup?.classList.contains('d-none') && !close) {
            console.log(ref.current)
            console.log(menuPopup)
            menuPopup?.classList.remove('d-none')
            return
        }
        
        if(close || !menuPopup?.classList.contains('d-none')) {
            menuPopup?.classList.add('d-none')
            return
        }
    }

    useEffect(() => {
        if(localStorage.getItem("theme") == "light)" || localStorage.getItem("theme") === null) {
            dispatch(turnLight())
        }
        else if(localStorage.getItem("theme") == "dark") {
            dispatch(turnDark())
        }
        window.addEventListener('resize', () => {
            // Set the App Width to check whether to show the bottom bar or not?
            dispatch(setAppWidth(window.innerWidth))
            dispatch(setAppHeight(window.innerHeight))
        })
        document.addEventListener("click", function(event: MouseEvent) {
            const refKeys: Array<string> = Object.keys(popupMenuRef)
            if(Array.from({ length: refKeys.length}, (value, index: number) => {
                return popupMenuRef[refKeys[index] as keyof PopupMenuType].current && !popupMenuRef[refKeys[index] as keyof PopupMenuType].current?.contains(event.target as Node)
            }).every(value => value === true)) {
                Object.keys(popupMenuRef).forEach((value) => {
                    const keyName = value as "createLeftRef" | "createBottomRef" | "userBottomRef" | "userLeftRef"
                    togglePopup(keyName, true)
                })
            }
        })
    }, [])
    function changeTheme() {
        if(theme == "light") {
            dispatch(turnDark())
            localStorage.setItem("theme", "dark")
        }
        else {
            dispatch(turnLight())
            localStorage.setItem("theme", "light")
        }
    }
    return (
        <div className={theme == "dark" ? "container-fluid dark px-0" : "container-fluid px-0"}>
            <div className="h-100">
                <div id="mainLeftSidebar" className="sidebar-control">
                    <div className="d-flex justify-content-center mt-3 pt-0">
                        <a href='/' className="btn">
                            <i className={`fa-solid menu-icon ${icons['home']} fa-1x`}></i>
                            <p>Home</p>
                        </a>
                    </div>
                    <div className="d-flex justify-content-center pt-0">
                        <a href="/chat" className="btn">
                            <i className={`fa-solid menu-icon ${icons['chat']} fa-1x`}></i>
                            <p>Chats</p>
                        </a>
                    </div>
                    <div className="d-flex justify-content-center pt-0" ref={popupMenuRef['createLeftRef']} onClick={() => togglePopup("createLeftRef")}>
                        <button className="btn">
                            <i className={`fa-solid menu-icon ${icons['create']} fa-1x`}></i>
                            <p>Create</p>
                        </button>
                        <div className="menu-popup left d-none">
                            <div className="menu-popup-list">
                                <a href="/character/create" className="text-start d-block w-100">
                                    <div className="menu-item px-2 py-2">
                                        <span>Create Character</span>
                                    </div>
                                </a>
                                <a href="/create-persona" className="text-start d-block w-100">
                                    <div className="menu-item px-2 py-2">
                                        <span>Create Persona</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-0">
                        <button className="btn" onClick={changeTheme}>
                            <i className={`fa-solid menu-icon ${icons['theme']} fa-1x`}></i>
                            <p>Theme</p>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center pt-0" ref={popupMenuRef['userLeftRef']} onClick={() => togglePopup("userLeftRef")}>
                        <button className="btn">
                            <a href="#">
                                <i className={`fa-solid menu-icon ${icons['user']} fa-1x`}></i>
                                <p>User</p>
                            </a>
                        </button>
                        <div className="menu-popup left d-none">
                            <div className="menu-popup-list">
                                <a href="/setting" className="text-start d-block w-100">
                                    <div className="menu-item px-2 py-2">
                                        <span>Setting</span>
                                    </div>
                                </a>
                                <a href="/logout" className="text-start d-block w-100">
                                    <div className="menu-item px-2 py-2">
                                        <span>logout</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mainContent">
                    {props.children}
                    <div className={appWidth < 992 ? "col-12 d-flex justify-content-between" : "d-none"} id="MobileBottomBar" style={{
                        height: `${mobileBottomBarHeight}px`
                    }}>
                        <a href="/" className="btn">
                            <i className={`fa-solid menu-icon ${icons['home']} fa-2x`}></i>
                            <p>Home</p>
                        </a>
                        <a href="/chat" className="btn">
                            <i className={`fa-solid menu-icon ${icons['chat']} fa-2x`}></i>
                            <p>Chats</p>
                        </a>
                        <div className="btn" ref={popupMenuRef['createBottomRef']} onClick={() => togglePopup("createBottomRef")}>
                            <i className={`fa-solid menu-icon ${icons['create']} fa-2x`}></i>
                            <p>Create</p>

                            <div className="menu-popup bottom d-none">
                                <div className="menu-popup-list">
                                    <a href="/character/create" className="text-start d-block w-100">
                                        <div className="menu-item px-2 py-2">
                                            <span>Create Character</span>
                                        </div>
                                    </a>
                                    <a href="/create-persona" className="text-start d-block w-100">
                                        <div className="menu-item px-2 py-2">
                                            <span>Create Persona</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="btn" onClick={changeTheme}>
                            <i className={`fa-solid menu-icon ${icons['theme']} fa-2x`}></i>
                            <p>Theme</p>
                        </a>
                        <div className="btn" ref={popupMenuRef['userBottomRef']} onClick={() => togglePopup("userBottomRef")}>
                            <i className={`fa-solid menu-icon ${icons['user']} fa-2x`}></i>
                            <p>User</p>
                            <div className="menu-popup bottom-right d-none">
                                <div className="menu-popup-list">
                                    <a href="/setting" className="text-start d-block w-100">
                                        <div className="menu-item px-2 py-2">
                                            <span>Setting</span>
                                        </div>
                                    </a>
                                    <a href="/logout" className="text-start d-block w-100">
                                        <div className="menu-item px-2 py-2">
                                            <span>Logout</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main