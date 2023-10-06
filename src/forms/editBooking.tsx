import React, {useEffect, useState} from 'react';
import axios from "axios";

interface editBookingProps {
    jobId: number | null;
    doneWithEdit: () => void;
}
const EditBookingForm: React.FC<editBookingProps> = ({jobId, doneWithEdit}) =>{

    const [date, setDate] = useState("")
    const [jobIds, setJobId] = useState("")
    const [jobStatus, setJobStatus] = useState("")
    const [jobType, setJobType] = useState("")
    const [paymentOption, setPaymentOption] = useState("")
    const [squareMeters, setSquareMeters] = useState("")
    const [timeSlot, setTimeSlot] = useState("")

    console.log(jobId + " ????????????????")
    useEffect(() => {
        console.log(jobId + " !!!!!!!!!!!!!!!!!")
        const preFillForm = async () =>{
            const url = `http://localhost:8080/api/jobs/getJob`
            const headers = {
                'jobId' : jobId?.toString()  // ? tar bort rödmarkering, avbryter det om det är null/undefined
            }
            const response = await axios.get(url, {headers})
            const data = response.data

            setDate(data.date)
            setJobId(data.jobId)
            setJobStatus(data.jobStatus);
            setJobType(data.jobtype)
            setPaymentOption(data.paymentOption)
            setSquareMeters(data.squareMeters)
            setTimeSlot(data.timeSlot)
        }
        preFillForm();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = `http://localhost:8080/api/jobs/update/${jobId}`;



            const editJobData = {
                date,
                jobId,
                jobStatus,
                jobType,
                paymentOption,
                squareMeters,
                timeSlot,
            };

            const headers = {
                'jobId': jobId?.toString(),
            };

            setDate("")
            setJobId("")
            setJobStatus("");
            setJobType("")
            setPaymentOption("")
            setSquareMeters("")
            setTimeSlot("")

            const response = await axios.put(url, editJobData, { headers });
            console.log('Job was updated', response.data);
            doneWithEdit();
        } catch (error) {
            console.error('Error updating booking', error);
        }
    };



    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2>Edit Bookng PÅ EGEN RISK!!!!!!!</h2>
                <input
                    type="text"
                    placeholder="JOb ID lär inte ändras"
                    style={styles.input}
                    value={jobIds}
                    onChange={(e) => setJobId(e.target.value)}
                    disabled={true}
                    required
                />
                <input
                    type="text"
                    placeholder="job Type"
                    style={styles.input}
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    disabled={true}
                    required
                />
                <input
                    type="text"
                    placeholder="Date"
                    style={styles.input}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={true}
                    required
                />
                <input
                    type="text"
                    placeholder="Time slot"
                    style={styles.input}
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    disabled={true}
                    required
                />
                <input
                    type="text"
                    placeholder="Job Status"
                    style={styles.input}
                    value={jobStatus}
                    onChange={(e) => setJobStatus(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="sqm"
                    style={styles.input}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    disabled={true}
                    required
                />
                <input
                    type="text"
                    placeholder="Payment option"
                    style={styles.input}
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    required
                />



                <button type="submit" style={styles.button}>
                    Update Booking
                </button>
                <button type="button" style={styles.button} onClick={doneWithEdit} >
                    Go Back
                </button>
            </form>
        </div>
    );
}
export default EditBookingForm;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#53af67',
        width: "500px",
        height: '760px',
        marginTop: '4%'
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '75%',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0d714a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
    },
}