import React, {useEffect, useRef, useState} from "react";
import employee from "../../API/employee";
import {useUserType} from "../../components/context/UserTypeContext";
import Table from "../../components/tables/Table";
import JobDetails from "./JobDetails";
import ConvertTimeSlotToNiceTime from "../../components/layout/ConvertTimeSlotToNiceTime";


const MyShifts = () => {

    const {id, setId} = useUserType();
    const [employeeShifts, setEmployeeShifts] = useState<any[]>([])
    const [showDetails, setShowDetails] = useState(false)

    const [jobId, setJobId] = useState(0)

    const handleUpdate = (jobId: number) => {
        setShowDetails(!showDetails)

        setJobId(jobId)
    }

    const handleClose = () => {
        setShowDetails(false)
    }

    useEffect(() => {
        employee.getJobsByEmployee(id).then(r => {
                console.log(r)
                setEmployeeShifts(r)
            }
        )


    }, [])

    const columns = [
        {key: 'jobId', title: 'Booking ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Job Status'},
        // {key: 'squareMeters', title: 'Sqm'},
        // {key: 'paymentOption', title: 'Payment Option'},
        // {key: 'customerId', title: 'Customer Id'},
    ];

    return (
        <div style={styles.myShifts}>
            {!showDetails ? <Table
                columns={columns}
                data={employeeShifts}
                onDelete={() => {
                }}
                onUpdate={handleUpdate}/> :
                <JobDetails close={handleClose} jobId={jobId}/>
            }
        </div>
    )
}

export default MyShifts;

const styles = {
    myShifts: {
        display: "flex",
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
    }
}