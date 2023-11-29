import React from 'react';

export const AboutModal: React.FC<{ onClose: () => void }> = ({onClose}) => {

    return (
        <div style={styles.modalContainer}>
            <div style={styles.modalInnerContainer}>
                <div style={styles.form} >
                    <h2>ABOUT US</h2>
                    <p style={styles.ptext}>This page was developed by Java programmers at EC Education.
                        The page is not deployed online and is only shown locally for training purpose.
                        The frontend is made with react and the backend is done with Java (spring boot).
                        We go by the name "Clean coders" and the crew is made of Ola, Adrian, Nati, Jimmy and Anton.
                        <p style={{fontWeight: 'bold'}}>For more information contact us at <a href={"mailto:StadaFintAB@gmail.com"}>StadaFintAB@gmail.com</a></p>

                    </p>
                    <button type="submit" style={styles.button} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    modalContainer: {
        width: "100vw",
        height: "100vh",
        zIndex: 9,
        position: "absolute" as 'absolute',
        top: "-41em",
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: 'flex',
        justifyContent: "center" as 'center',
        alignItems: "center" as 'center',
    },
    modalInnerContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '20px',
        border: '2px solid silver',
        borderRadius: '5px',
        backgroundColor: '#b3d9e3',
        width: "400px",
        marginTop: '4%',
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
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '3%',
        width: "150px"
    },
    label: {
        color: "black" as 'black',
        justifyContent: "center" as 'center',
        textAlign: "center" as "center",
    },
    customerTypeWrap: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: "100%"
    },
    boldText: {
        textDecoration: "underline"
    },
    ptext: {
        fontSize: "1rem",
    }
}
