import React, {useEffect, useRef, useState} from "react";
import employee from "../../API/employee";
// import Select from 'react-select'
import {useUserType} from "../../components/context/UserTypeContext";
import admin from "../../API/admin";

interface IjobDetails {
    jobId: number
    close: () => void
}

export default function JobDetails({jobId, close}: IjobDetails) {

    const [jobType, setJobType] = useState("")
    const [date, setDate] = useState("")
    const [timeSlot, setTimeSlot] = useState("")
    const [jobStatus, setJobStatus] = useState("")
    const [squareMeters, setSquareMeters] = useState(0)
    const [paymentOption , setPaymentOption] = useState("")
    const [message, setMessage] = useState("")
    const [customerId, setCustomerId] = useState("")
    const custId = useRef("");
    const userType = useUserType().userType;
    const [customerFirstName, setCustomerFirstName] = useState("")
    const [customerLastName, setCustomerLastName] = useState("")
    const [customerCompanyName, setCustomerCompanyName] = useState("")
    const [customerAddress, setCustomerAdress] = useState("")
    const [customerCity, setCustomerCity] = useState("")
    const [customerPostalCode, setCustomerPostalCode] = useState("")

    let selectOption = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'DONE', label: 'Done' },
        { value: 'APPROVED', label: 'Approved' },
        { value: 'UNAPPROVED', label: 'Unapproved' },
        { value: 'PAID', label: 'Paid' },
        { value: 'CANCELLED', label: 'Cancelled' }]

    useEffect(() => {

        employee.getJob(jobId).then(r => {
                setJobType(r.jobtype)
                setDate(r.date)
                setTimeSlot(r.timeSlot)
                setJobStatus(r.jobStatus)
                setSquareMeters(r.squareMeters)
                setPaymentOption(r.paymentOption)
                setMessage(r.message)
                setCustomerId(r.customerId)
                custId.current = r.customerId

                employee.getCustomer(custId.current).then(r => {
                    setCustomerFirstName(r.firstName)
                    setCustomerLastName(r.lastName)
                    setCustomerCompanyName(r.companyName)
                    setCustomerAdress(r.address)
                    setCustomerCity(r.city)
                    setCustomerPostalCode(r.postalCode)
                })
            }

            // employee.getCustomer(r.customerId)

        )

    }, [])

    const updateJobStatus = () => {

        // @ts-ignore
        if(userType == "ADMIN") {
           const dataToSend = {
               jobId: jobId,
               jobtype: jobType,
               date: date,

               jobStatus: jobStatus,
               squareMeters: squareMeters,
               paymentOption: paymentOption,
               message: message,
               customerId: customerId
           }
            admin.updateJobStatus(dataToSend).then(r => {
                console.log(r)
            })

        } else { // @ts-ignore
            if(userType == "EMPLOYEE") {
                        if(jobStatus == "PENDING" || jobStatus == "DONE") {
                            const dataToSend = {
                                jobId: jobId,
                                jobtype: jobType,
                                date: date,
                                jobStatus: jobStatus,
                                squareMeters: squareMeters,
                                paymentOption: paymentOption,
                                message: message,
                                customerId: customerId
                            }
                            employee.updateJobStatus(dataToSend).then(r => {
                                console.log(r)
                            })
                        }
                    }
        }
    }

    return (
        <div>
            <div style = {styles.jobIdDiv}>
            <h3>Job id: {jobId}</h3>
            </div>
            <div style={styles.jobTypeDiv}>
                <h3>
                    Job type: {jobType}
                </h3>
            </div>
            <div style = {styles.timeDiv}>

                <div style={styles.timeField}><h3 style={styles.timeText}>{date.substring(0,10)}</h3></div>
                <div style={styles.timeField}><h3 style={styles.timeText}>{timeSlot}</h3></div>
            </div>

            <div style={styles.jobTypeDiv}>


                <select
                    style={styles.select}
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    required>
                    <option value="" disabled>{jobStatus}</option>
                    {selectOption.map( (status) => (
                        <option key={status.label} value={status.value}>{status.value}</option>
                    ))}
                </select>
                <button onClick={updateJobStatus} style = {styles.submitButton}>Submit status</button>

            </div>
            <div style={styles.messageDiv}><p style={styles.messageText}>{message}</p></div>

            <div style={styles.addressDiv}>
                {customerCompanyName != '' && <h3>{customerCompanyName}</h3>}
                <h3>{customerFirstName} {customerLastName}</h3>
                <h3>{customerAddress}</h3>
                <h3>{customerPostalCode} {customerCity}</h3>

            </div>

            <button onClick={() => close()} style={styles.closeButton}>close</button>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    jobIdDiv: {
        borderRadius: "5px",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
    },

    noEditField: {
        backgroundColor: "#c4c4c4",
        // margin: "1 rem",
        border: "1px black"
    },
    timeDiv: {
        borderRadius: "5px",
        padding: "0.1rem",
        marginTop: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        color: 'black',
    },
    timeField: {

        margin: "0.2rem",
        width: "40%",
        height: "3rem",
    },
    timeText: {
        // alignSelf: "center",
        // textAlign: "center" as "center",
    },
    jobTypeDiv: {
        borderRadius: "5px",
        padding: "0.1rem",
        marginTop: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
    },
    select: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '0.5rem',
        width: '80%',
        borderRadius: '5px',
    },
    submitButton: {
        marginBottom: "0.2rem",
        backgroundColor: "#e7e7e7",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',

    },
    messageDiv: {
        display: "flex",
        borderRadius: "5px",
        padding: "0.3rem",
        marginTop: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",

    },
    messageText: {
        // alignSelf: "flex-start"
    },
    addressDiv: {
        borderRadius: "5px",
        padding: "0.1rem",
        marginTop: "3%",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        backgroundColor : "#b3d9e3",
        marginBottom: "0.5rem",
    },
    closeButton: {
        backgroundColor: "#729ca8",
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',

    }
}
