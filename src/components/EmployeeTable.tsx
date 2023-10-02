import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";


export const EmployeeTable: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/employee/getAllEmployees')
            .then((response) => {
                setEmployeeData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const columns = [
        { key: 'id', title: 'Employee ID' },
        { key: 'firstname', title: 'First Name' },
        { key: 'lastname', title: 'First Name' },
        { key: 'password', title: 'Password' },
        { key: 'ssnumber', title: 'SS Number' },
        { key: 'email', title: 'Email' },
        { key: 'phonenumber', title: 'Phone Number' },
        { key: 'adress', title: 'Adress' },
        { key: 'role', title: 'Role' },
        { key: 'salary', title: 'Salary' },
    ];

    return <Table columns={columns} data={employeeData} />;
};