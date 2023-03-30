import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/login-provider";

export default function LogIn() {
    const URL = "http://localhost:8080/auth/login"
    const { login, setLogin } = useContext(LoginContext)
    const initialState = {
        email: "",
        password: "",
        error: "",
        errorStatus: false
    };

    const [state, setState] = useState(initialState)
    useEffect(() => {
        console.log('Login')
    }, [state])
    async function fetchLogin(url) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()

        if (data.success === true) {
            setState({ ...state, errorStatus: false })
            localStorage.setItem("token", data.token)
        } else {
            setState({ ...state, errorStatus: true })
        }

        setState({ ...state, error: data.status, errorStatus: data.success });
        // setState({ ...state, errorStatus: data.success });

        console.log(data)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Log In")
        fetchLogin(URL)
        setLogin(true)
    }
    return (
        <div>
            <div className="signup-container text-center">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="email" className="form-label" htmlFor="email"> email :

                        </label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email"
                            onChange={(e) => {
                                setState({ ...state, email: e.target.value })
                            }}></input>

                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password*</label>
                        <input type="password" className="form-control" id="password" placeholder="Create a password"
                            onChange={(e) => {
                                setState({ ...state, password: e.target.value })
                            }}
                        ></input>
                        <div id="emailHelp" className="form-text">Must be at least 8 characters.</div>
                    </div>
                    <div>
                        {state.errorStatus ? (<p className="text-success">{state.error}</p>)
                            : (<p className="text-danger">{state.error}</p>)}
                    </div>


                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    )
}