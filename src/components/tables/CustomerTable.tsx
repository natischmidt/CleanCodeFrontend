import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TableId from "./TableId";

interface customerTableProps {
    onUpdate: (cusId: number) => void;
}

export const CustomerTable: React.FC<customerTableProps> = ({onUpdate}) => {

    const [customerData, setCustomerData] = useState<any[]>([]);
    const [deleted, setDeleted] = useState(0);
    const [myFilter, setMyFilter] = useState('');
    const [searchUser, setSearchUser] = useState('');

    useEffect(() => {

        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        };
        axios.get('http://localhost:8080/api/customer/all', {headers: headers})
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, [deleted]);

    const columns = [
        {key: 'id', title: 'Customer ID'},
        {key: 'firstName', title: 'Firstname'},
        {key: 'lastName', title: 'Lastname'},
        {key: 'email', title: 'Email'},
        {key: 'phoneNumber', title: 'Phone Number'},
        {key: 'address', title: 'Address'},
        {key: 'companyName', title: 'Company Name'},
        {key: 'orgNumber', title: 'Organisation Number'},
        {key: 'customerType', title: 'Customer Type'},
    ];

    const handleDelete = async (id: number) => {

        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            };

            const Url = `http://localhost:8080/api/customer/delete/${id}`;
            const response = await axios.delete(Url, {headers: headers});
            setDeleted(x => x + 1)

        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };

    const handleUpdate = (cusId: number) => {
        onUpdate(cusId)
    };

    const filteredCustomerData = customerData.filter((customer) =>
        (myFilter === '' || customer.customerType === myFilter) &&
        (customer.lastName.toLowerCase().includes(searchUser.toLowerCase()) || searchUser === '')
    )
    //style={styles.container}
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
                    Filter by type
                    <select
                        value={myFilter}
                        onChange={(e) => setMyFilter(e.target.value)}
                        style={{marginLeft: '0.5rem'}}
                    >
                        <option value="">All</option>
                        <option value="PRIVATE">Private</option>
                        <option value="BUSINESS">Business</option>
                    </select>
                </div>
            </div>
            <div className="customer-table" style={styles.customerTable}>
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
/*onDelete={handleDelete}
onUpdate={handleUpdate}*/
const styles = {
    customerTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center',
        gridGap: '2rem',
    },
    delete: {
        backgroundColor: "#f83f3f",
    },
    update: {
        backgroundColor: "#729ca8",
    },
}
