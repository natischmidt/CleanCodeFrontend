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

export function adminCreateEmp(
    FirstName : string,
    LastName : string,
    EmaiL : string,
    PassWord : string,
    Ss : string,
    Phonenumber : string,
    Address : string, Role : any) {

    const [firstname, setFirstName] = useState <string>('');
    const [lastname, setLastName] = useState <string>('');
    const [password, setPassword] = useState <string>('');
    const [ss, setSs] = useState <string>('');
    const [email, setEmail] = useState <string>('');
    const [phonenumber, setPhoneNumber] = useState <string>('');
    const [address, setAdress] = useState <string>('');
    const [role,setRoll] = useState ('EMPLOYEE_ROLE');
    // maybe change this to 'EMPLOYEE'


    const handleSubmit = async () => {

        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';

            const employeeData = {
                firstname,lastname,ss,email,phonenumber, address, password,role,
            };

            const response = await axios.post(Url,employeeData);

            console.log( 'employee was created' + response.data);

        } catch (error) {
            console.error('error creating employee', error);
        }

    }

}


