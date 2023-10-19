import axios from 'axios';

const employee = {
    getEmployee: async (id: string | null) => {

        const headers = {
            empId: id
        }

        try {

            const response = await axios.post('http://localhost:8080/api/employee/getEmployee', null, {headers});
            const data = response.data
            console.log(data)
            return data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    },

    getJobsByEmployee: async (id: string | null) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/jobs/getAllJobsForEmployee/${id}`)
            return response.data.map((job: any) => {
                const date = new Date(job.date);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                return {
                    ...job,
                    date: formattedDate,
                    id: job.jobId,
                    customerId: job.customer ? job.customer.id : 'N/A'
                }

            })

        } catch (error) {
            console.log(error)
        }
    },

    getJob: async (id: number) => {

        const headers = {
            jobId: id.toString()
        }
        try {
            const response = await axios.get('http://localhost:8080/api/jobs/getJob',  {headers});
            const data = response.data
            console.log(data)
            return data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    },
};


export default employee;
