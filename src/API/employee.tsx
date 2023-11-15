import axios from 'axios';
import ConvertTimeSlotToNiceTime from "../components/layout/ConvertTimeSlotToNiceTime";

const headers = {
    'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
    'Content-Type': 'application/json',
};

const backendUrl = "http://localhost:8080/"

const employee = {
    getEmployee: async (id: string | null) => {

        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
            empId: id?.toString()
        }
        // const config = {
        //     headers: {
        //         'empId': id?.toString() || ''
        //     },
        // };

        try {

            const response = await axios.get(`${backendUrl}api/employee/getEmployee`, {headers});
            const data = response.data
            console.log(data)
            return data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    },

    getJobsByEmployee: async (id: string | null) => {
        try {
            const response = await axios.get(`${backendUrl}api/jobs/getAllJobsForEmployee/${id}`,{
                headers
            })
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

            })

        } catch (error) {
            console.log(error)
        }
    },

    getJob: async (id: number) => {

        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
            jobId: id.toString()
        }
        try {
            const response = await axios.get(`${backendUrl}api/jobs/getJob`, {
               headers
            });
            const data = response.data
            console.log(data)
            return data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    },

    updateJobStatus: async (updateJobDTO: object) => {
        console.log("-----------------------------", updateJobDTO)

        try {
            const response = await axios.put(`${backendUrl}api/jobs/updateJob`, updateJobDTO, {
                headers
            })
            console.log("update request was made: ", response.status)

        } catch (error) {
            console.log(error)
        }
    },
    getCustomer: async (customerId: string) => {

        try {
            const response = await axios.get(`${backendUrl}api/customer/${customerId}`,{
               headers
            })

            return response.data

        } catch (error) {
            console.log(error)
        }
    },

    getSalary: async (empId: any) => {
        try {
            const response = await axios.get(`${backendUrl}api/employee/getSalary/${empId}`,{
                headers
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    fetchJobsForEmployeeWithStatus: async (empId: string | null, status: string[]) => {
        try {
            console.log(`Fetching jobs for empId: ${empId}`);

            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            }

            const response = await axios.get(`${backendUrl}api/jobs/getAllJobsForEmployeeWithStatus/${empId}`, {
               headers: headers,
                params: {
                    status: status
                },
                paramsSerializer: params => {
                    return `status=${params.status.join('&status=')}`
                }
            });

            return response.data.map((job: any) => {
                const date = new Date(job.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...job,
                    date: formattedDate,
                    id: job.jobId,
                    employeeId: job.employee ? job.employee.id : 'N/A',
                    timeSlot: ConvertTimeSlotToNiceTime(job.timeSlot)
                }
            });
        } catch (error) {
            throw error;
        }
    },

    logoutEmployee: async (empId: string | null) => {
        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        }
        try {

            console.log("########################" + empId)

            const url = `${backendUrl}api/auth/logout/${empId}`

            const response = await axios.get(url, {headers: headers})
            console.log(response)

        } catch (error){
            throw error
        }
    }
};

export default employee;
