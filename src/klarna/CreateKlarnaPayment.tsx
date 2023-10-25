import React from "react";

interface editKlarnaProps {
    jobId: number | null;
    doneWithEdit: () => void;
}

const CreateKlarnaPayment: React.FC<editKlarnaProps> = ({jobId, doneWithEdit}) => {
    return (
        <div className="container" style={styles.container}>
            <h1 style={styles.h1}>Klarna</h1>
            <div className="klarnaCont" style={styles.klarnaCont}>

                <button type="submit" style={styles.button}>
                    Basic
                </button>
                <button type="submit" style={styles.button}>
                    Advanced
                </button>
                <button type="submit" style={styles.button}>
                    Diamond
                </button>
                <button type="submit" style={styles.button}>
                    Window
                </button>

            </div>
            <div className="klarnaCont" style={styles.klarnaCont2}>
                <button type="button" style={styles.button} onClick={doneWithEdit} >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default CreateKlarnaPayment

const styles = {
    container:{
      display: "flex",
      flexDirection: "column" as "column"
    },
    klarnaCont: {
        display: 'flex',
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
        color: '#000001',
        // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
    klarnaCont2: {
        display: 'flex',
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
        color: '#000001',

    },
    button: {
        backgroundColor: '#b3d9e3',
        marginLeft: '5%',
        height: '60px',
        fontWeight: 'normal',
        width: "150px",
        margin: "2%"
    },
    h1: {
        justifyContent: "center" as 'center',
        textAlign: "center" as 'center',
        marginTop: "4%",
        fontSize: "4rem"
    }
}
