import React, {useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import ConvertTimeSlotToNiceTime from "../components/layout/ConvertTimeSlotToNiceTime";

const admin = {
        getAllJobs: async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobs/getAllJobs');
                const formattedData = response.data.map((job: any) => {
                    const date = new Date(job.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return {
                        ...job,
                        date: formattedDate,
                        id: job.jobId,
                        customerId: job.customer ? job.customer.id : 'N/A',
                        timeSlot: ConvertTimeSlotToNiceTime(job.timeSlot)
                    }; // kollar om customer finns, isåfall får man id, annars NA
                });
                return formattedData;
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        },

        getJobByStatus: async () => {
            try {
                const statuses = ['DONE', 'APPROVED', 'UNAPPROVED', 'PAID', 'CANCELLED'];
                const response = await axios.get('http://localhost:8080/api/jobs/getByStatus', {
                    params: {statuses},
                    paramsSerializer: params => {
                        return `statuses=${statuses.join('&statuses=')}`
                    }
                });

                const formattedData = response.data.map((job: { date: string | number | Date; }) => {
                    const date = new Date(job.date);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return {...job, date: formattedDate};
                });

                return formattedData;

            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        },

        LogIn: () => {

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

        getAvailableEmp: async (date: string, hours: number) => {

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
                return response.data;

            } catch (error) {
                console.error('Error creating employee', error);
            }
        },

        createBooking: async (
            jobType: string,
            dateAndTime: string,
            timeSlotList: string[],
            squareMeters: string | null,
            payment: string,
            customerId: string,
            message: string,
            email: string
        ) => {

            console.log("................*********" + timeSlotList)
            try {
                const Url = 'http://localhost:8080/api/jobs/createJob';

                const bookingData = {
                    jobtype: jobType,
                    date: dateAndTime,
                    timeSlotList: timeSlotList,
                    squareMeters: squareMeters,
                    paymentOption: payment,
                    customerId: customerId,
                    message: message
                };

                const response = await axios.post(Url, bookingData);
                console.log('Booking was created', response.data);
            } catch (error) {
                console.error('Error creating booking', error);
            }
        },

        updateJobStatus: async (updateJobDTO: object) => {
            try {
                const response = await axios.put('http://localhost:8080/api/jobs/updateJob', updateJobDTO)
                console.log("update request was made: " , response.status)

            } catch (error) {
                console.log(error)
            }

        },

       deleteJob : async (jobId: number) => {
           const [deleted, setDeleted] = useState(0);
           try {
               const Url = `http://localhost:8080/api/jobs/deleteJob`;
               const headers = {
                   'jobId': jobId?.toString()
               }
               const response = await axios.delete(Url, {headers});
               console.log('Deleting job was successful', response.data);
               setDeleted(x => x + 1)
           } catch (error) {
               console.error('Error deleting job', error);
           }
       },

       createAdmin: async (adminData: any) => {
        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';

            const response = await axios.post(Url, adminData);

            console.log('Admin was created', response.data);

            return response.data;

        } catch (error) {
            console.error('Error creating admin', error);
            throw error;
        }
    },


    };


export default admin;



