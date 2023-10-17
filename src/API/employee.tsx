import React, {useState} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';

const employee = {
    getEmployee: async (id: string | null) => {

        const headers = {
            empId: id
        }

        try {

            const response = await axios.post('http://localhost:8080/api/employee/getEmployee', null,  {headers});
            const data = response.data
            console.log(data)
            return data;

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }
};

export default employee;
