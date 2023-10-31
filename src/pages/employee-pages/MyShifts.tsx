import React, {useEffect, useRef, useState} from "react";
import employee from "../../API/employee";
import {useUserType} from "../../components/context/UserTypeContext";
import TableId from "../../components/tables/TableId";
import JobDetails from "./JobDetails";
import ConvertTimeSlotToNiceTime from "../../components/layout/ConvertTimeSlotToNiceTime";
import admin from "../../API/admin";


const MyShifts = () => {

    const {id, setId} = useUserType();
    const [employeeShifts, setEmployeeShifts] = useState<any[]>([])
    //const [update, setUpdate] = useState(0)
    const update = useRef(0)
    //const [showDetails, setShowDetails] = useState(false)

    //const [jobId, setJobId] = useState(0)

    const handleDone = async (jobId: number) => {

        await employee.getJob(jobId).then(r => {
            const dataToSend = {
                jobId: r.jobId,
                jobtype: r.jobtype,
                date: r.date,
                jobStatus: "DONE",
                squareMeters: r.squareMeters,
                paymentOption: r.paymentOption,
                message: r.message,
                customerId: r.customerId
            }
            employee.updateJobStatus(dataToSend)
        })
        update.current = update.current +1;
        console.log(update.current + " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    }



    useEffect(() => {
        employee.getJobsByEmployee(id).then(r => {
                console.log(r)
                setEmployeeShifts(r)
            }
        )
    }, [update.current])
   // console.log(custId + " @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

    const columns = [
        {key: 'jobId', title: 'Booking ID'},
        {key: 'jobtype', title: 'Job type'},
        {key: 'date', title: 'Date'},
        {key: 'timeSlot', title: 'Time'},
        {key: 'jobStatus', title: 'Job Status'},
        // {key: 'squareMeters', title: 'Sqm'},
        // {key: 'paymentOption', title: 'Payment Option'},
        //{key: 'customerId', title: 'Customer Id'},
    ];

    return (
        <div style={styles.myShifts}>
            <TableId
                columns={columns}
                data={employeeShifts}
                buttons={[
                    {label: "Done", action:(jobId) => {handleDone(jobId)}, style:styles.done}
                ]}
                />
        </div>
    )
}

export default MyShifts;

const styles = {
    myShifts: {
        display: "flex",
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
    },
    done: {
        backgroundColor: '#48de47'
    }
}