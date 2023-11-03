import React, {useRef, useState} from 'react';
import axios from 'axios';
import admin from './admin';
import {useUserType} from '../components/context/UserTypeContext';
import {useNavigate} from 'react-router-dom';
import ConvertTimeSlotToNiceTime from "../components/layout/ConvertTimeSlotToNiceTime";


const customer = {
    register: async (email: string) => {


        try {
            const url = 'http://localhost:8080/api/customer/create';

            const customerData = {
                firstName: "",
                lastName: "",
                password: "password",
                companyName: "",
                orgNumber: "",
                email: email,
                city: "",
                postalCode: "",
                phoneNumber: "",
                address: "",
            };

            const response = await axios.post(url, customerData);
            console.log('Customer was registered', response.data);

            sessionStorage.setItem("jwt", response.data.jwt)

            const idResponse = await axios.get(`http://localhost:8080/api/customer/getIdByEmail/${email}`);
            console.log("id for non reg. user: " + idResponse.data);

            const tempId = idResponse.data;
            console.log("Steg 1: " + tempId);

            return tempId;
        } catch (error) {
            console.error('Error while trying to register a new customer', error);
        }
    },

    book: (jobType: string,
           dateToUseRef: string,
           timeList: string[],
           squareMeters: string,
           paymentOption: string,
           id: string | null,
           message: string,
           email: string
    ) => {

        try {


            if (id == null) {
                // ICKE KUND
                console.log("Bokning av en icke kund!");
                customer.register(email).then(returnId => {
                    admin.createBooking(jobType, dateToUseRef,
                        timeList, squareMeters, paymentOption, returnId,
                        message, email).then(r => {
                    });
                });
            } else if (id != null) {
                // KUND
                const email = "";
                console.log("Bokning av inloggad kund:");
                admin.createBooking(jobType, dateToUseRef, timeList, squareMeters, paymentOption, id, message, email).then(r => {
                });
            }
        } catch (error) {
            console.log(error + "this is not right dude");
        }
    },

    logout: async () => {
        const {setLoggedIn, setUserType, setId, userType, id} = useUserType();
        try {

            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const Url = 'http://localhost:8080/api/auth/logoutEmployee';

            const response = await axios.post(Url, {headers: headers});

            console.log('Employee/Admin has successfully logged out', response.data);

            const goToCustomerHome = useNavigate();
            goToCustomerHome("/CustomerHome");

            setLoggedIn(false);
            id && setId(null);
            userType && setUserType(null);
        } catch (error) {
            console.error('Error signing out employee/admin', error);
        }
    },

    login: async (email: string, password: string, setUserType: (value: (((prevState: ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) | "ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => void,
                  setId: (id: string) => void, goToHomePage: (path: string) => void, setLoggedIn: (loggedIn: boolean) => void) => {

        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const url = 'http://localhost:8080/api/auth/loginCustomer';

            const customerData = {
                email: email,
                password: password,
            };

            const response = await axios.post(url, customerData, {headers: headers});
            const resp = response.data;

            console.log(resp);

            if (response) {
                setUserType("CUSTOMER");
                setId(resp.userId);
                goToHomePage(`/CustomerMyPages`);
                console.log("***" + email);
                setLoggedIn(true);
                sessionStorage.setItem("jwt", resp.jwt)
            } else {
                console.log("hur tusan hamna vi här?");
            }
        } catch (error) {
            console.error('Error signing in customer', error);
        }
    },

    fetchData: async (customerId: string) => {
        try {

            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.get(`http://localhost:8080/api/customer/${customerId}`,{
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (error) {
            throw Error(`Error fetching customer ${error}`);
        }
    },
    fetchJobsForCustomer : async (customerId: string | null, statuses: string[]) => {
        try {
            console.log(`Fetching data for cusId: ${customerId}`);


            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }

            const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForCustomerWithStatus/${customerId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                params: {
                    statuses: statuses
                },
                paramsSerializer: params => {
                    return `statuses=${params.statuses.join('&statuses=')}`
                }
            });

            return response.data.map((job: any) => {
                const date = new Date(job.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...job,
                    date: formattedDate,
                    id: job.jobId,
                    customerId: job.customer ? job.customer.id : 'N/A',
                    timeSlot: ConvertTimeSlotToNiceTime(job.timeSlot)
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
            throw error;
        }
    }



};

export default customer;
