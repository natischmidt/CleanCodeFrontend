import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TableId from "./TableId";

interface employeeTableProps {
    onUpdate: (empId: number) => void;
}

export const EmployeeTable: React.FC<employeeTableProps> = ({onUpdate}) => {
    const [deleted, setDeleted] = useState(0);
    const [employeeData, setEmployeeData] = useState<any[]>([]);
    const [myFilter, setMyFilter] = useState('');
    const [searchUser, setSearchUser] = useState('');

    const filteredCustomerData = employeeData.filter((emp) =>
        (myFilter === '' || emp.role === myFilter) &&
        (emp.lastName.toLowerCase().includes(searchUser.toLowerCase()) || searchUser === '')
    )

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        };
        axios.get('http://localhost:8080/api/employee/getAllEmployees', {headers: headers})
            .then((response) => {
                setEmployeeData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, [deleted]);


    const columns = [
        {key: 'id', title: 'Employee ID'},
        {key: 'firstName', title: 'Firstname'},
        {key: 'lastName', title: 'Lastname'},
        {key: 'ssNumber', title: 'SSN'},
        {key: 'email', title: 'Email'},
        {key: 'phoneNumber', title: 'Phone Number'},
        {key: 'address', title: 'Address'},
        {key: 'role', title: 'Role'},
        {key: 'salary', title: 'Salary'},
    ];

    const handleDelete = async (empId: number) => {
        try {
            const Url = `http://localhost:8080/api/employee/deleteEmployee`;
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
                'empId': empId.toString()
            }
            const response = await axios.delete(Url, {headers});
            console.log('Deleting employee was successful', response.data);
            setDeleted(x => x + 1)
        } catch (error) {
            console.error(error)
        }
    };

    const handleUpdate = (empId: number) => {
        onUpdate(empId);
    };

    return (
        <>
            <div style={styles.filterContainer}>
                <div>
                    Search by lastname:
                    <input
                        typeof="text"
                        value={searchUser}
                        style={{width: '6rem', marginLeft: '0.5rem'}}
                        onChange={(e) => setSearchUser(e.target.value)}/>
                </div>
                <div>
                    Filter by role
                    <select
                        value={myFilter}
                        onChange={(e) => setMyFilter(e.target.value)}
                        style={{marginLeft: '0.5rem'}}
                    >
                        <option value="">All</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                    </select>
                </div>
            </div>
            <div className="employee-table" style={styles.employeeTable}>
                <TableId columns={columns}
                         data={filteredCustomerData}
                         buttons={[
                             {
                                 label: "Update", action: (id) => {
                                     handleUpdate(id)
                                 }, style: styles.update
                             },
                             {
                                 label: "Delete", action: (id) => {
                                     handleDelete(id)
                                 }, style: styles.delete
                             },
                         ]}
                />
            </div>
        </>
    );
};

const styles = {
    employeeTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
    delete: {
        backgroundColor: "#f83f3f",
    },
    update: {
        backgroundColor: "#729ca8",
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center',
        gridGap: '2rem',
    },
}

