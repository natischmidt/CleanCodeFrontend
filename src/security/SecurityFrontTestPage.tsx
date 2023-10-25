import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as url from "url";
import axios from "axios";

export default function SecurityFrontTestPage () {

    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const customerRoleId = "1bdc1c3c-4cc2-44fc-9c3c-9c630a71ea15"
    const clientId = "16b58469-6ca4-46ea-b4bf-2b15600c5dd9"
    const [adminToken, setAdminToken] = useState("")

    const adminCallData = new URLSearchParams();
    adminCallData.append('username', 'admin')
    adminCallData.append('password', 'l?3t5!C1eAn"tHäc0De.-')
    adminCallData.append('grant_type', 'password')
    adminCallData.append('client_id', 'admin-cli')


    // const [userData, setUserData] = useState({
    //     enabled: true,
    //         username: email,
    //         "email": "zonko@mail.com",
    //         "firstName": "zonko",
    //         "lastName": "frisk",
    //         "credentials": {
    //         "type": "password",
    //             "value": "mypass",
    //             "temporary": false
    //     },
    //     "requiredActions": [
    //         "CONFIGURE_TOTP",
    //         "VERIFY_EMAIL"
    //     ],
    //         "groups": [],
    //         "attributes": {
    //         "locale": [
    //             "se"
    //         ]
    //     }
    // })

    // const details = {
    //     'username': 'admin',
    //     'password': 'l?3t5!C1eAn"tHäc0De.-',
    //     'grant_type': 'password',
    //     'client_id': 'admin-cli'
    // };
    // const formBody = [];
    // for (var property in details) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(details[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    //
    // formBody = formBody.join("&");
    // fetch('https://example.com/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body: formBody
    // })



    // const getAdminToken = async () => {
    //     console.log("test")
    //     console.log(adminCallData);
    //
    //     try {
    //         const response = await fetch("http://stadafint.se/realms/master/protocol/openid-connect/token", {
    //             method: 'POST',
    //             mode: 'no-cors',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: adminCallData.toString(),
    //         })
    //
    //         const data = await response.json();
    //         console.log("The response status: " , response.status)
    //         console.log(data)
    //
    //
    //     }  catch (error) {
    //         console.log(error)
    //     }
    // }
    const getAdminToken = async () => {
        try {
            const details: Record<string, string> = {
                'grant_type': 'password',
                'username': 'admin',
                'password': 'l?3t5!C1eAn"tHäc0De.-',
                'client_id': 'admin-cli'
            };

            const formBody: string[] = [];
            for (const property in details) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            const formEncoded = formBody.join("&");

            const response = await fetch("http://stadafint.se/realms/master/protocol/openid-connect/token", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                },
                body: formEncoded,
            });

            const data = await response.json();
            console.log("The response status:", response.status);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegister = () => {
        axios.post("http://stadafint.se/auth/admin/realms/cleanCode/users", )
    }

    return (
        <div>
            <input
                placeholder="email"
                onChange={(value) => setEmail(value.target.value)}
            />
            <input
            placeholder="firstName"
            onChange={(value) => setFirstName(value.target.value)}
            />
            <input
                placeholder="lastName"
                onChange={(value) => setLastName(value.target.value)}
            />
            <input
                placeholder="password"
                onChange={(value) => setPassword(value.target.value)}
            />
            <p>{email}</p>
            <p>{password}</p>

            <button
                onClick={() => getAdminToken()}
            >get admin token</button>
            <button onClick={() => handleRegister()}>register customer</button>
            <p> </p>
            <button>login customer</button>
        </div>
    )
}
