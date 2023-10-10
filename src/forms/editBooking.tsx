import React, {useEffect, useState} from 'react';
import axios from "axios";

interface editBookingProps {
    jobId: number | null;
    doneWithEdit: () => void;
}
const EditBookingForm: React.FC<editBookingProps> = ({jobId, doneWithEdit}) =>{

    const [date, setDate] = useState("")
    const [loadedjobId, setLoadedJobId]  = useState<number | null>(null);
    const [jobStatus, setJobStatus] = useState("")
    const [jobType, setJobType] = useState("")
    const [paymentOption, setPaymentOption] = useState("")
    const [squareMeters, setSquareMeters] = useState("")
    const [timeSlot, setTimeSlot] = useState("")
    const [message, setMessage] = useState<string>("");



    useEffect(() => {


        if (jobId !== null) {
            const preFillForm = async () => {
                try {
                    const url = `http://localhost:8080/api/jobs/getJob`;
                    const headers = {
                        'jobId': jobId?.toString() || '',
                    };
                    const response = await axios.get(url, { headers });
                    const data = response.data;

                    if (!data || !data.jobId) {
                        console.log('Job with this id not found');
                    } else {
                        setDate(data.date || '');
                        setLoadedJobId(data.jobId?.toString() || '');
                        setJobStatus(data.jobStatus || '');
                        setJobType(data.jobType || '');
                        setPaymentOption(data.paymentOption || '');
                        setSquareMeters(data.squareMeters?.toString() || '');
                        setTimeSlot(data.timeSlot || '');
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            preFillForm();
        }
    }, [jobId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (jobId !== null) {
                const url = `http://localhost:8080/api/jobs/update/`;

                const editJobData = {
                    date,
                    jobId,
                    jobStatus,
                    jobType,
                    paymentOption,
                    squareMeters,
                    timeSlot,
                };


                await axios.put(url, editJobData, {params: {message}});
                console.log('Job was updated');
                doneWithEdit();
            }
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
                    value={`${loadedjobId}`}
                    onChange={(e) => setLoadedJobId(Number(e.target.value))}
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
                <select
                    value={jobStatus}
                    style={styles.input}
                    onChange={(e) => setJobStatus(e.target.value)}
                >
                    <option value="">Choose job status:</option>
                    <option value="PENDING">Pending</option>
                    <option value="DONE">Done</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="APPROVED">Approved</option>
                    <option value="UNAPPROVED">Unapproved</option>
                    <option value="PAID">Paid</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <input
                    type="text"
                    placeholder="sqm"
                    style={styles.input}
                    value={squareMeters}
                    onChange={(e) => setSquareMeters(e.target.value)}
                    disabled={true}
                    required
                />
                <select
                    value={paymentOption}
                    style={styles.input}
                    onChange={(e) => setPaymentOption(e.target.value)}
                >
                    <option value="">Choose payment option:</option>
                    <option value="KLARNA">Klarna</option>
                    <option value="CASH">Cash</option>
                </select>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="send a message?"
                    style={styles.input}
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