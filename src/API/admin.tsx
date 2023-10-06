import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';


export function adminLogIn() {

    const [email, setEmail] = useState <string>('');
    const [password, setPassword] = useState <string>('');

    const handleLogin = () => {

    const baseURL = 'null';

    const credentials = {
        email,password
    };

    axios
        .post(baseURL, credentials)
        .then ((response: AxiosResponse) => {

           //  const token = response.data.token;
           //
           // console.log('Admin logs in with token: ' + token);

        })
        .catch((error: AxiosError) => {
            console.error('Admin log in failed: ' + error.message);
        })

    }





}



