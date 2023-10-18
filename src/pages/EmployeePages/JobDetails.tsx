import React, {useEffect, useState} from "react";
import employee from "../../API/employee";

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
    const [message, setMessage] = useState("")
    const [customerId, setCustomerId] = useState("")

    useEffect(() => {
        employee.getJob(jobId).then(r => {
                setJobType(r.jobtype)
                setDate(r.date)
                setTimeSlot(r.timeSlot)
                setJobStatus(r.jobStatus)
                setSquareMeters(r.squareMeters)
                setMessage(r.message)
                setCustomerId(r.customerId)
            }
        )


    }, [])


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
            <div style={styles.noEditField}><h3>{jobStatus}</h3></div>
            <div style={styles.noEditField}><h3>{message}</h3></div>
            <div style={styles.noEditField}><h3>{customerId}</h3></div>

            <button onClick={() => close()}>close</button>
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
    }
}