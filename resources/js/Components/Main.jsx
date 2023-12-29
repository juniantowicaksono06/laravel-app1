import { useSelector, useDispatch } from "react-redux"
import { turnDark, turnLight } from "../State/theme"
import { useEffect, useState } from "react"
import '../../css/chat.css'
const Main = (props) => {
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    const [ icon, setIcon ] = useState({
        "settings": "fa-gear",
        "theme": "fa-moon"
    })
    useEffect(() => {
        if(sessionStorage.getItem("theme") == "light" || sessionStorage.getItem("theme") === null) {
            dispatch(turnLight())
            setIcon({
                "chat": "fa-comments",
                "settings": "fa-gear",
                "theme": "fa-moon",
                "logout": "fa-right-from-bracket"
            })
        }
        else if(sessionStorage.getItem("theme") == "dark") {
            dispatch(turnDark())
            setIcon({
                "chat": "fa-comments text-white",
                "settings": "fa-gear text-white",
                "theme": "fa-sun text-white",
                "logout": "fa-right-from-bracket text-white"
            })
        }
    }, [])
    function changeTheme() {
        if(theme == "light") {
            setIcon({
                "chat": "fa-comments text-white",
                "settings": "fa-gear text-white",
                "theme": "fa-sun text-white",
                "logout": "fa-right-from-bracket text-white"
            })
            dispatch(turnDark())
            sessionStorage.setItem("theme", "dark")
        }
        else {
            setIcon({
                "chat": "fa-comments",
                "settings": "fa-gear",
                "theme": "fa-moon",
                "logout": "fa-right-from-bracket"
            })
            dispatch(turnLight())
            sessionStorage.setItem("theme", "light")
        }
    }
    return (
        <div className={theme == "dark" ? "container-fluid dark px-0" : "container-fluid px-0"}>
            <div className="h-100">
                <div id="mainLeftSidebar" className="sidebar-control">
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn">
                            <i className={`fa-solid ${icon['chat']} fa-2x`}></i>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn">
                            <i className={`fa-solid ${icon['settings']} fa-2x`}></i>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <button className="btn" onClick={changeTheme}>
                            <i className={`fa-solid ${icon['theme']} fa-2x`}></i>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <a href="/logout">
                            <button className="btn">
                                <i className={`fa-solid ${icon['logout']} fa-2x`}></i>
                            </button>
                        </a>
                    </div>
                </div>
                <div id="mainContent">
                    {props.children}
                </div>
            </div>
            {/* <div className="row h-100">
                <div className="col-4">
                    <div className="row h-100">
                        <div className="col-2 sidebar-control">
                            <div className="d-flex justify-content-center pt-3">
                                <button className="btn">
                                    <i className={`fa-solid ${icon['chat']} fa-2x`}></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <button className="btn">
                                    <i className={`fa-solid ${icon['settings']} fa-2x`}></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <button className="btn" onClick={changeTheme}>
                                    <i className={`fa-solid ${icon['theme']} fa-2x`}></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <a href="/logout">
                                    <button className="btn">
                                        <i className={`fa-solid ${icon['logout']} fa-2x`}></i>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="col-10"></div>
                    </div>
                </div>
                <div className="col-8">
                    {props.children}
                </div>
            </div> */}
        </div>
    )
}

export default Main