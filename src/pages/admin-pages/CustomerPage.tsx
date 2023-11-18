import React, {useState} from "react";
import HeaderComp from "../../components/layout/HeaderComp";
import {CustomerTable} from "../../components/tables/CustomerTable";
import EditCustomerForm from "../../components/forms/EditCustomerForm";
import "../../styles/CustomerPage.css"

export default function CustomerPage() {

    const  [showUpdateCustomer, setShowUpdateCustomer] = useState(false)
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

    const handleUpdate = (cusId: number) =>{
        setSelectedCustomerId(cusId);
        setShowUpdateCustomer(true);
    }
    const handleUpdateComplete = () => [
        setShowUpdateCustomer(false)
    ]

    return (
        <>
            <HeaderComp/>
            <div className="h1 h11">
                <h1>Customers</h1>

                {!showUpdateCustomer ? <CustomerTable onUpdate={(cusId: number) => handleUpdate(cusId)} /> :
                <EditCustomerForm cusId={selectedCustomerId} doneWithEdit={handleUpdateComplete} /> }
                {/*<CustomerFooter/>*/}
            </div>
        </>
    )
}
