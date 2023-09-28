import '../App.css'
import React from 'react'

export default function LoginPage() {
    return (
        <div className="login">
            <div className="loginBox">
                <div className="loginHeader">
                    Login
                </div>
                <div className="inputs">
                    <input className="email" placeholder="Enter your E-mail"/>
                    <input className="password" placeholder="Enter your password" type="password"/>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button className="logButton">Login</button>
                </div>
            </div>
        </div>
    )
}