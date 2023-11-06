import axios, {AxiosError, AxiosResponse} from 'axios';
import ConvertTimeSlotToNiceTime from '../components/layout/ConvertTimeSlotToNiceTime';
import {useState} from 'react';


interface Job {
    date: string;
    jobId: number;
    customerId: string;
    timeSlot: string;

}

interface LoginCredentials {
    email: string;
    password: string;
}

interface EmployeeData {
    firstName: string;
    lastName: string;
    password: string;
    ssNumber: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    role: string;
    salary: number;
}

/*interface TimeSlots {
    EIGHT: boolean
    NINE: boolean
    TEN: boolean
    ELEVEN: boolean
    TWELVE: boolean
    THIRTEEN: boolean
    FOURTEEN: boolean
    FIFTEEN: boolean
    SIXTEEN: boolean
}*/

interface BusinessCustomerData {
    firstName: string;
    lastName: string;
    password: string;
    companyName: string;
    orgNumber: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
}

const admin = {
    getAllJobs: async (): Promise<Job[]> => {
        try {
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }

            const response = await axios.get('http://localhost:8080/api/jobs/getAllJobs', {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return response.data.map((job: Job) => {
                const date = new Date(job.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}
                -${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...job,
                    date: formattedDate,
                    id: job.jobId,
                    customerId: job.customerId ? job.customerId : 'N/A',
                    timeSlot: ConvertTimeSlotToNiceTime(job.timeSlot)
                };
            });
        } catch (error) {
            console.error('Error fetching customer data:', error);
            throw error;
        }
    },
    getJobByStatus: async (): Promise<Job[]> => {
        try {
            const statuses = ['DONE', 'APPROVED', 'UNAPPROVED', 'PAID', 'CANCELLED'];
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.get('http://localhost:8080/api/jobs/getByStatus', {
                params: { statuses },
                paramsSerializer: params => {
                    return `statuses=${statuses.join('&statuses=')}`;
                },
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return response.data.map((job: Job) => {
                const date = new Date(job.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {...job, date: formattedDate};
            });
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    },
    LogIn: (credentials: LoginCredentials): void => {
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        const handleLogin = (): void => {
            const baseURL = 'null';

            const credentials = {
                email,
                password
            };

            axios
                .post(baseURL, credentials)
                .then((response: AxiosResponse) => {

                })
                .catch((error: AxiosError) => {
                    console.error('Admin log in failed: ' + error.message);
                    throw error;
                });
        };
    },
    getAvailableEmp: async (date: string, hours: number): Promise<EmployeeData[]> => {


        if (!date) {
            console.error('Ogiltigt datum.');
            return [];
        }
        try {
            const Url = 'http://localhost:8080/api/jobs/getAvailableEmployees';
            const checkEmployees = {
                date: date,
                lookForAvailableThisManyHours: hours
            };
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, checkEmployees, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating employee', error);
            throw error;
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
        // email: string
    ): Promise<void> => {
        console.log("................*********" + timeSlotList);
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
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, bookingData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log('Booking was created', response.data);
        } catch (error) {
            console.error('Error creating booking', error);
            throw error;
        }
    },
    updateJobStatus: async (updateJobDTO: object): Promise<void> => {
        try {
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.put('http://localhost:8080/api/jobs/updateJob', updateJobDTO, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log("update request was made: ", response.status);
        } catch (error) {
            console.error('Error updating job', error);
            throw error;
        }
    },
    deleteJob: async (jobId: number): Promise<void> => {
        try {
            const Url = `http://localhost:8080/api/jobs/deleteJob`;
            const headers = {
                'jobId': jobId?.toString() || '',
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
            };
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.delete(Url, { headers });
            console.log('Deleting job was successful', response.data);

        } catch (error) {
            console.error('Error deleting job', error);
            throw error;
        }
    },
    createAdmin: async (adminData: EmployeeData): Promise<void> => {
        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, adminData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log('Admin was created', response.data);
        } catch (error) {
            console.error('Error creating admin', error);
            throw error;
        }
    },
    createBusinessCustomer: async (businessCustomerData: BusinessCustomerData): Promise<void> => {
        try {
            const Url = 'http://localhost:8080/api/customer/create';
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, businessCustomerData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log('Business Customer was created', response.data);
        } catch (error) {
            console.error('Error creating business customer', error);
            throw error;
        }
    },
    createEmployee: async (employeeData: EmployeeData): Promise<void> => {
        try {
            const Url = 'http://localhost:8080/api/employee/createEmployee';
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, employeeData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log('Employee was created', response.data);
        } catch (error) {
            console.error('Error creating employee', error);
            throw error;
        }
    },
    createPrivateCustomer: async (privateCustomerData: BusinessCustomerData) => {
        try {
            const Url = 'http://localhost:8080/api/customer/create';
            const jwt = sessionStorage.getItem("jwt");
            if (!jwt) {
                throw new Error("JWT not found in sessionStorage");
            }
            const response = await axios.post(Url, privateCustomerData, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            console.log('Private Customer was created', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating private customer', error);
            throw error;
        }
    },
    getJobDetails: async (jobId: number | null) => {
        try {
            if (jobId !== null) {
                const url = `http://localhost:8080/api/jobs/getJob`;
                const headers = {
                    'jobId': jobId?.toString() || '',
                    'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
                };
                const response = await axios.get(url, { headers });
                const data = response.data;
                console.log(response.data.customerId);
                if (!data || !data.jobId) {
                    console.log('Job with this id not found');
                } else {
                    return {
                        date: data.date || '',
                        loadedJobId: data.jobId?.toString() || '',
                        jobStatus: data.jobStatus || '',
                        jobType: data.jobType || '',
                        paymentOption: data.paymentOption || '',
                        squareMeters: data.squareMeters?.toString() || '',
                        timeSlot: data.timeSlot || '',
                        customerId: data.customerId,
                    };
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
    updateJob: async (
        date: string,
        jobId: number | null,
        jobStatus: string,
        jobType: string,
        paymentOption: string,
        squareMeters: string | null,
        timeSlot: string,
        customerId: string | null,
        message: string,
    ) => {
        try {
            if (jobId !== null) {
                const url = `http://localhost:8080/api/jobs/updateJob`;
                const editJobData = {
                    date,
                    jobId,
                    jobStatus,
                    jobType,
                    paymentOption,
                    squareMeters,
                    timeSlot,
                    customerId,
                };
                const jwt = sessionStorage.getItem("jwt");
                if (!jwt) {
                    throw new Error("JWT not found in sessionStorage");
                }
                await axios.put(url, editJobData, {
                    params: { message },
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log('Job was updated');
            }
        } catch (error) {
            console.error('Error updating booking', error);
        }
    },

};

export default admin;




