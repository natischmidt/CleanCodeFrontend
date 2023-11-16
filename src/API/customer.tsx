import React, {useRef, useState} from 'react';
import axios from 'axios';
import admin from "./admin";
import {useUserType} from '../components/context/UserTypeContext';
import {useNavigate} from 'react-router-dom';
import ConvertTimeSlotToNiceTime from "../components/layout/ConvertTimeSlotToNiceTime";


const backendUrl = "http://localhost:8080/";
const customer = {

    registerTemp: async (email: string) => {

        try {
            const url = `${backendUrl}api/customer/create`;

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
            sessionStorage.setItem("tempId", response.data.userId)
            sessionStorage.setItem("jwt", response.data.jwt)
            const tempId = response.data.userId;

            return tempId;


        } catch (error) {
            console.error('Error while trying to register a new customer', error);
        }


    },

    register: async (customerData: {
        firstName: string;
        lastName: string;
        password: string;
        phoneNumber: string;
        address: string;
        city: string;
        companyName: string;
        postalCode: string;
        orgNumber: string;
        email: string
    }, setLoggedIn: (value: (((prevState: boolean) => boolean) | boolean)) => void,
                     setUserType: (value: (((prevState: ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) | "ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => void,
                     setId: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void) => {

        try {
            const url = `${backendUrl}api/customer/create`;

            const response = await axios.post(url, customerData);

            sessionStorage.setItem("jwt", response.data.jwt)


            if (response) {
                setLoggedIn(true)
                setUserType("CUSTOMER");
                setId(response.data.userId);
                setLoggedIn(true);

            } else {
            }
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
                admin.createBooking(jobType,
                    dateToUseRef,
                    timeList,
                    squareMeters,
                    paymentOption,
                    sessionStorage.getItem("tempId"),
                    message,

                    )

            } else {
                // KUND
                const email = "";
                admin.createBooking(jobType, dateToUseRef, timeList, squareMeters, paymentOption, id, message).then(r => {
                });
            }
        } catch (error) {
            console.error();
        }
    },

    logout: async (custId: string | null) => {
        // const {setLoggedIn, setUserType, setId, userType, id} = useUserType();

        try {

            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const Url = `${backendUrl}api/auth/logout/${custId}`;

            const response = await axios.get(Url, {headers: headers});

        } catch (error) {
            console.error('Error signing out employee/admin', error);
        }
    },

    login: async (email: string, password: string, setUserType: (value: (((prevState: ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => ("ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) | "ADMIN" | "CUSTOMER" | "EMPLOYEE" | null)) => void,
                  setId: (id: string) => void, goToHomePage: (path: string) => void, setLoggedIn: (loggedIn: boolean) => void) => {

        try {
            const headers = {
                // 'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const url = `${backendUrl}api/auth/loginCustomer`;

            const customerData = {
                email: email,
                password: password,
            };

            const response = await axios.post(url, customerData, {headers} );
            const resp = response.data;


            if (response) {
                setUserType("CUSTOMER");
                setId(resp.userId);
                goToHomePage(`/customermypages`);
                setLoggedIn(true);
                sessionStorage.setItem("jwt", resp.jwt)
            } else {
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
            const response = await axios.get(`${backendUrl}api/customer/${customerId}`,{
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
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }

            const response = await axios.get(`${backendUrl}api/jobs/getAllJobsForCustomerWithStatus/${customerId}`, {
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
