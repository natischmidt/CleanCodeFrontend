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
        { key: 'firstName', title: 'Firstname' },
        { key: 'lastName', title: 'Lastname' },
        { key: 'password', title: 'Password' },
        { key: 'ssNumber', title: 'SSN' },
        { key: 'email', title: 'Email' },
        { key: 'phoneNumber', title: 'Phone Number' },
        { key: 'address', title: 'Address' },
        { key: 'role', title: 'Role' },
        { key: 'salary', title: 'Salary' },
    ];

    const handleDelete = (id: number) => {

    };

    const handleUpdate = (id: number) => {

    };

    return (
        <div className="employee-table" style={styles.employeeTable}>

            <Table columns={columns}
                   data={employeeData}
                   onDelete={handleDelete}
                   onUpdate={handleUpdate}
            />
        </div>
    );
};

const styles = {
    employeeTable: {
        textAlign: "left",
    },
}

