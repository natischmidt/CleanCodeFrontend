import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
// import {Value} from "react-calendar/dist/cjs/shared/types";



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

    export const getAvailableEmp = async (date: Date | null, hours: number) => {

        if (!date) {
            console.error('Ogiltigt datum.');
            return;
        }

        try {
            const Url = 'http://localhost:8080/api/jobs/getAvailableEmployees';

            const checkEmployees = {
                date: date,
                lookForAvailableThisManyHours: hours
            };

            const response = await axios.post(Url, checkEmployees);

            console.log(response.data);

        } catch (error) {
            console.error('Error creating employee', error);
        }
    }


