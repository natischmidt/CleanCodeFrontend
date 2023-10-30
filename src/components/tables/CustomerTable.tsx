import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from "./table";

interface customerTableProps {
    onUpdate: (cusId: number) => void;
}

export const CustomerTable: React.FC<customerTableProps> = ({onUpdate}) => {

    const [customerData, setCustomerData] = useState<any[]>([]);
    const [deleted, setDeleted] = useState(0);
    const [myFilter, setMyFilter] = useState('');

    useEffect(() => {

        axios.get('http://localhost:8080/api/customer/all')
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
            const Url = `http://localhost:8080/api/customer/delete/${id}`;
            const response = await axios.delete(Url);
            console.log('Deleting employee was successful', response.data);
            setDeleted(x => x + 1)

        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };


    const handleUpdate = (cusId: number) => {
        onUpdate(cusId)
    };

    const filteredCustomerData = customerData.filter((customer) =>
        myFilter === '' || customer.customerType === myFilter
    )

    return (
        <div className="customer-table" style={styles.customerTable}>
            <div>
                Filter on customer type: 
                <select
                    value={myFilter}
                    onChange={(e) => setMyFilter(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="PRIVATE">Private</option>
                    <option value="BUSINESS">Business</option>
                </select>
            </div>

            <Table columns={columns}
                   data={filteredCustomerData}
                   onDelete={handleDelete}
                   onUpdate={handleUpdate}
            />
        </div>
    );
};

const styles = {
    customerTable: {
        textAlign: "left" as 'left',
        display: "flex" as 'flex',
        justifyContent: "center" as 'center'
    },
}

