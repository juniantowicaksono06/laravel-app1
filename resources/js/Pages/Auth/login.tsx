import React, { useState } from "react"
import Loading from '../../Components/Loading'
import SweetAlert2, {SweetAlert2Props} from 'react-sweetalert2'
import '../../Styles/app.scss'
import '../../Styles/login.scss'

const Login = () => {
    const [swalProps, setSwalProps] = useState<SweetAlert2Props>({})
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [ loginForm, setLoginForm ] = useState({
        "username": "",
        "password": ""
    })
    const [isBusy, setIsBusy]  = useState<boolean>(false)
    const [isLoading, setLoading] = useState(false)
    const onLogin = async () => {
        if(isBusy) return
        setIsBusy(!isBusy)
        if(loginForm.username == "" || loginForm.password == "") return
        setLoading(true)
        const formData = new FormData()
        formData.append("username", loginForm.username)
        formData.append("password", loginForm.password)
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                body: formData
            })
            if(response.status == 200) {
                setSwalProps(prevState => ({
                    ...prevState,
                    show: true,
                    position: 'top-end',
                    timer: 2500,
                    title: 'Login Success',
                    showConfirmButton: false,
                    toast: true,
                    icon: "success",
                    didClose: () => {
                        window.location.href = '/'
                        setSwalProps({})
                    }
                }))
            }
            else if(response.status == 403) {
                let result = await response.json()

                setSwalProps(prevState => ({
                    ...prevState,
                    show: true,
                    position: 'top-end',
                    timer: 2500,
                    title: result['message'],
                    showConfirmButton: false,
                    toast: true,
                    icon: "error",
                    didClose: () => {
                        setIsBusy(false)
                        setSwalProps({})
                    }
                }))
            }
        } catch (error) {
            setSwalProps({
                show: true,
                position: 'top-end',
                timer: 2500,
                title: 'Server error',
                showConfirmButton: false,
                toast: true,
                icon: "error",
                didClose: () => {
                    setIsBusy(false)
                    setSwalProps({})
                }
            })
        }
        setLoading(false)
    }
    // Login ketika tekan enter pada input
    const onEnter = async (event: React.KeyboardEvent) => {
        if(event.key === "Enter") {
            onLogin()
        }
    }
    return (
        <div className="container-fluid pt-5" id="loginContainer">
            <Loading isLoading={isLoading} />
            <SweetAlert2 {...swalProps} />
            <div className="d-flex justify-content-center align-items-center" style={{
                height: "100%"
            }}>
                <div className="card login-card" id="loginCard">
                    <div className="card-body">
                        <h3 className="mb-3 text-center text-white">Login Page</h3>
                        <div className="form-group mb-2">
                            <label htmlFor="usernameLabel">Username</label>
                            <input type="text" className="form-control" placeholder="Enter your username here" value={loginForm.username} onKeyUp={onEnter} onChange={(e) => setLoginForm((prevState) => ({
                                ...prevState,
                                username: e.target.value
                            }))} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="passwordLabel">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password here" value={loginForm.password} onKeyUp={onEnter} onChange={(e) => setLoginForm((prevState) => ({
                                ...prevState,
                                password: e.target.value
                            }))} />
                        </div>
                        <div className="form-group">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-block" onClick={onLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login