import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as url from "url";

export default function SecurityFrontTestPage () {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


    const handleRegister = () => {
        window.location.replace('https://www.google.com');
    }

    return (

        <div>
            <input
            placeholder="username"
            onChange={(value) => setUserName(value.target.value)}
            />


            <input
                placeholder="password"
                onChange={(value) => setPassword(value.target.value)}
            />

            <p>{userName}</p>
            <p>{password}</p>

            <button onClick={() => handleRegister()}>register customer</button>
            <p> </p>
            <button>login customer</button>

            <a href="http://192.168.0.189:8080/realms/cleanCode/login-actions/registration?client_id=security-admin-console
" target="_blank" rel="noopener noreferrer">
                keycloak
            </a>


        </div>


    )

}
