import React, {useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';

const admin = {
    adminLogIn: () => {

        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        const handleLogin = () => {

            const baseURL = 'null';

            const credentials = {
                email, password
            };

            axios
                .post(baseURL, credentials)
                .then((response: AxiosResponse) => {

                    //  const token = response.data.token;
                    //
                    // console.log('Admin logs in with token: ' + token);

                })
                .catch((error: AxiosError) => {
                    console.error('Admin log in failed: ' + error.message);
                });
        }
    },

    getAvailableEmp: async (date: Date | null, hours: number) => {

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
            // console.log(response.data);
            return response.data;


        } catch (error) {
            console.error('Error creating employee', error);
        }
    },

    createBooking: async (
        jobType: string,
        dateAndTime: string,
        timeSlotList: string[],
        squareMeters: string,
        payment: string,
        customer: string
    ) => {
        try {
            const Url = 'http://localhost:8080/api/jobs/createJob/';

            const bookingData = {
                jobtype: jobType,
                date: dateAndTime,
                timeSlotList: timeSlotList,
                squareMeters: squareMeters,
                paymentOption: payment,
                customerId: customer
            };

            const response = await axios.post(Url, bookingData);
            console.log('Booking was created', response.data);
        } catch (error) {
            console.error('Error creating booking', error);
        }
    }
};
export default admin;



