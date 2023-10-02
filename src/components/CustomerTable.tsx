import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../reusableComponents/table";

export const CustomerTable: React.FC = () => {
    const [customerData, setCustomerData] = useState<any[]>([]);

    useEffect(() => {

        axios.get('http://localhost:8080/api/customer/getAllCustomers')
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
            });
    }, []);


    const columns = [
        { key: 'id', title: 'Customer ID' },
        { key: 'firstname', title: 'First Name' },
        { key: 'lastname', title: 'Last Name' },
        { key: 'companyname', title: 'Company Name' },
        { key: 'orgnumber', title: 'Organisation Number' },
        { key: 'email', title: 'Email' },
        { key: 'phonenumber', title: 'Phone Number' },
        { key: 'adress', title: 'Adress' },
        { key: 'customertype', title: 'Customer Type' },
    ];

    return <Table columns={columns} data={customerData} />;
};

