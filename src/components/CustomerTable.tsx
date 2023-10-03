import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";

export const CustomerTable: React.FC = () => {
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/customer/all')
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    const columns = [
        { key: 'id', title: 'Customer ID' },
        { key: 'firstName', title: 'Firstname' },
        { key: 'lastName', title: 'Lastname' },
        { key: 'email', title: 'Email' },
        { key: 'phoneNumber', title: 'Phone Number' },
        { key: 'address', title: 'Address' },
        { key: 'companyName', title: 'Company Name' },
        { key: 'orgNumber', title: 'Organisation Number' },
        { key: 'customerType', title: 'Customer Type' },
    ];

    return (
        <div className="customer-table" style={styles.customerTable}>
            <Table columns={columns} data={customerData} />
        </div>
    );
};

const styles = {
    customerTable: {
        textAlign: "left",
    },
}

