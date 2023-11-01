import React, {useContext, useEffect} from "react";
import KlarnaModalContext from "./KlarnaModalContext";

function KlarnaConfirmation() {



    useEffect(() => {

    }, []);

    const handleClose = () => {

    }

    return (

            <div style={styles.confCont}>
                <p style={styles.bigText}>Tack för din beställning!</p>
                <p style={styles.smallText}>Nu har din betalning gått igenom.</p>
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