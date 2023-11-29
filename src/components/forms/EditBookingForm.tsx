import React, {useEffect, useState} from 'react';
import admin from "../../API/admin";
import ConvertTimeSlotToNiceTime from "../layout/ConvertTimeSlotToNiceTime";

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
    const [squareMeters, setSquareMeters] = useState(0)
    const [timeSlot, setTimeSlot] = useState("")
    const [message, setMessage] = useState<string>("");
    const [customerId, setCustomerId] = useState<String | null>(null);

    useEffect(() => {
        if (jobId !== null) {
            const preFillForm = async () => {
                try {

                    const data = await admin.getJobDetails(jobId)
                    const dateTwo = new Date(data.date)
                    const formattedDate = `${dateTwo.getFullYear()}-${String(dateTwo.getMonth() + 1).padStart(2, '0')}-${String(dateTwo.getDate()).padStart(2, '0')}`;

                    if (!data || !data.jobId) {

                    } else {
                        setDate(formattedDate || '')
                        setLoadedJobId(data.jobId?.toString() || '')
                        setJobStatus(data.jobStatus || '')
                        setJobType(data.jobtype || '')
                        setPaymentOption(data.paymentOption || '')
                        setSquareMeters(data.squareMeters || 0)
                        setTimeSlot(data.timeSlot || '')
                        setCustomerId(data.customerId)
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

                const editJobData = {
                    jobId,
                    jobType,
                    date,
                    timeSlot,
                    jobStatus,
                    squareMeters,
                    paymentOption,
                    message,
                    customerId,
                };

                await admin.updateJobStatus(editJobData);
                doneWithEdit();
            }
        } catch (error) {
            console.error('Error updating booking', error);
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.h2}>Edit Booking</h2>
                <p style={styles.pTag}>Job ID: {loadedjobId}</p>
                <p style={styles.pTag}>Job Type: {jobType}</p>
                <p style={styles.pTag}>Date: {date}</p>
                <p style={styles.pTag}>Time: {ConvertTimeSlotToNiceTime(timeSlot)}</p>

                <p style={styles.pTag}>Choose job status :</p>
                <select
                    value={jobStatus}
                    style={styles.select}
                    onChange={(e) => setJobStatus(e.target.value)}
                >

                    <option value="PENDING">Pending</option>
                    <option value="DONE">Done</option>
                    <option value="APPROVED">Approved</option>
                    <option value="UNAPPROVED">Unapproved</option>
                    <option value="PAID">Paid</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <p style={styles.pTag}>Square meters :</p>
                <input
                    type="number"
                    placeholder="sqm"
                    style={styles.input}
                    value={`${squareMeters}`}
                    onChange={(e) => setSquareMeters(Number(e.target.value))}
                    required
                />
                <br/>
                <p style={styles.pTag}>Payment method :</p>
                <select
                    value={paymentOption}
                    style={styles.select}
                    onChange={(e) => setPaymentOption(e.target.value)}
                >
                    <option value="">Choose payment option:</option>
                    <option value="KLARNA">Klarna</option>
                </select>
                <br/>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add message..."
                    style={styles.inputText}
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
        backgroundColor: '#b3d9e3',
        width: "500px",
        // height: '760px',
        marginTop: '2%',
        marginBottom: "2%"
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        width: "200px"
    },
    input: {
        marginTop: '3px',
        marginBottom: '3px',
        padding: '5px',
        width: '47%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },

    select: {
        marginTop: '3px',
        marginBottom: '3px',
        padding: '5px',
        width: '50%',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    pTag:{
        margin: "0.3rem",
        fontSize: "1.1rem"
    },
    h2:{
        fontSize: "2rem",
        margin: "0.5rem",
        fontWeight: "bold",
        textDecoration: "underline"
    },
    inputText:{
        marginTop: '5%',
        marginBottom: '3px',
        padding: '5px',
        width: '70%',
        height: "5rem",
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    }
}
