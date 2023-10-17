import {useEffect, useState} from "react";
import employee from "../../API/employee";

interface IjobDetails {
    jobId: number
    close: () => void
}

export default function JobDetails ({jobId, close} : IjobDetails) {

    const [jobType, setJobType] = useState("")
    const [date, setDate] = useState("")
    const [timeSlot, setTimeSlot] = useState("")
    const [jobStatus, setJobStatus] = useState("")
    const [squareMeters, setSquareMeters] = useState(0)
    const [message, setMessage] = useState("")
    const [customerId, setCustomerId] = useState("")

    useEffect(() => {
        employee.getJob(jobId).then(r => {
            setJobType(r.jobType)
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
            {jobId}
            <p>{jobType}</p>
            <p>{date}</p>
            <p>{timeSlot}</p>
            <p>{jobStatus}</p>
            <p>{squareMeters}</p>
            <p>{message}</p>
            <p>{customerId}</p>

            <button onClick={() => close()}>close</button>
        </div>
    )

}