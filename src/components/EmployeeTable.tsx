import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";
import {useNavigate} from "react-router-dom";

export const EmployeeTable: React.FC = () => {

    // const [firstname, setFirstname] = useState('');
    // const [lastname, setLastname] = useState('');
    // const [email, setEmail] = useState('');
    // const [phonenumber, setPhoneNumber] = useState('');
    // const [ss, setSs] = useState('');
    // const [salary, setSalary] = useState <number> ();
    // const [address, setAddress] = useState('');
    // const [password, setPassword] = useState('');

    const [deleted, setDeleted] = useState(0);

    const goToEditEmployeeForm = useNavigate()

    const [employeeData, setEmployeeData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/employee/getAllEmployees')
            .then((response) => {
                setEmployeeData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, [deleted]);


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

    const handleDelete = async (empId: number) => {

            try {
                const Url = `http://localhost:8080/api/employee/deleteEmployee`;

                const headers = {
                    'empId' : empId.toString()
                }

                const response = await axios.delete(Url, {headers});

                console.log('Deleting employee was successful', response.data);

                setDeleted(x => x +1)

            } catch (error) {
                console.error('Error deleting employee', error);
            }
    };

    // const handleUpdate = async (employeeDTO: any) => {
    //
    //     try {
    //         const Url = `http://localhost:8080/api/employee/editEmployee`;
    //
    //         const employeeData = {
    //             id: employeeDTO.id,
    //             firstName: firstname,
    //             lastName: lastname,
    //             password: password,
    //             ssNumber: ss,
    //             email: email,
    //             phoneNumber: phonenumber,
    //             address: address,
    //             role: "EMPLOYEE",
    //             salary: salary,
    //         };
    //
    //         const response = await axios.put(Url, employeeData);
    //
    //         console.log('Updating employee was successful', response.data);
    //
    //     } catch (error) {
    //         console.error('Error updating employee', error);
    //     }
    // };

    return (
        <div className="employee-table" style={styles.employeeTable}>

            <Table columns={columns}
                   data={employeeData}
                   onDelete={handleDelete}
                   onUpdate={goToEditEmployeeForm}
            />
        </div>
    );
};

const styles = {
    employeeTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}

