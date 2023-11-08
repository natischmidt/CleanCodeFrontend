import React, {useEffect} from "react";
import {useLocation,useParams} from "react-router-dom";
import customer from "../API/customer";
import employee from "../API/employee";



function KlarnaConfirmation() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { jobId } = useParams<{jobId: string}>();
    const parsedJobId = Number(jobId)

    useEffect(() => {
        const updateStatus = async () => {
            if (jobId){
                try {
                    const r = await employee.getJob(parsedJobId);
                    const dataToSend = {
                        jobId: r.jobId,
                        jobtype: r.jobtype,
                        date: r.date,
                        jobStatus: "PAID",
                        squareMeters: r.squareMeters,
                        paymentOption: r.paymentOption,
                        message: r.message,
                        customerId: r.customerId
                    };
                    await employee.updateJobStatus(dataToSend);
                } catch (error) {
                    console.error("Det gick inte... ", error);
                }
            }
        }
        updateStatus()
    }, [jobId]);

    const handleClose = () => {
        window.parent.postMessage("navigateToCustomerMyPages", "*");
    }

    return (

            <div style={styles.confCont}>
                <p style={styles.bigText}>Thank you for your order!</p>
                <p style={styles.smallText}>Your payment have been registered.</p>
                <button type="button" style={styles.button} onClick={handleClose} >
                    Go Back
                </button>
            </div>

    );
}

export default KlarnaConfirmation;

const styles = {
    confCont: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center" as  "center",
        justifyContent: "center" as "center",
        /*border: "solid black 1px",
        margin: "3rem"*/


    },
    bigText: {
        paddingTop: "2rem",
        color: "black",
        fontSize: "2rem",
        fontWeight: "bold"
    },
    smallText:{
        color: "black",
        borderBottom: "solid black 2px"
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
}