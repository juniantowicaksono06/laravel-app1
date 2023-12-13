import { useState } from "react"
const Login = () => {
    const [ loginForm, setLoginForm ] = useState({
        "username": "",
        "password": ""
    })
    const onSubmit = () => {
        if(loginForm.username == "" || loginForm.password == "") return
        console.log(loginForm)
    }
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h3 className="mb-3 text-center">Login Page</h3>
                        <div className="form-group mb-2">
                            <label htmlFor="usernameLabel">Username</label>
                            <input type="text" className="form-control" placeholder="Enter your username here" value={loginForm.username} onChange={(e) => setLoginForm((prevState) => ({
                                ...prevState,
                                username: e.target.value
                            }))} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="passwordLabel">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password here" value={loginForm.password} onChange={(e) => setLoginForm((prevState) => ({
                                ...prevState,
                                password: e.target.value
                            }))} />
                        </div>
                        <div className="form-group">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-block" onClick={onSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login