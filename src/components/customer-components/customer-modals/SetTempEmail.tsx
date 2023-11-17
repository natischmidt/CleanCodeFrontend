import {useRef, useState} from "react";
import customer from "../../../API/customer";
import {useUserType} from "../../context/UserTypeContext";

interface ISetTempEmail {
    email: (tempMail: string) => void
    toCalendar: (jobType: string) => void
    jobType: string
}

export default function SetTempEmail({email, jobType, toCalendar}: ISetTempEmail) {

    const tempMail = useRef('');
    const [okToGoOn, setOkToGoOn] = useState(false)
    const [emailStyle, setEmailStyle] = useState(styles.input);
    const emailRegex = new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|.(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");


    const isTheFieldOk = () => {
        if(tempMail.current == '' || !tempMail.current.match(emailRegex)) {
            setEmailStyle(styles.invalidInput)
            setOkToGoOn(false)
        } else {
            setEmailStyle(styles.input)
            setOkToGoOn(true)
        }

    }

    const setTheEmail = () => {
        email(tempMail.current)

        customer.registerTemp(tempMail.current).then(r => {
                toCalendar(jobType)
        }

        )
    }

    return (
        <div style={styles.body}>
            <p>You may make an order without registering with us. Please enter your email adress, and we will be in touch with you shortly after you have completed the booking..</p>

            <input
                placeholder={"enter your email address"}
                style={emailStyle}
                onFocus={() => {

                isTheFieldOk()
                }}
                onChange={(value) => {
                    tempMail.current = value.target.value
                    isTheFieldOk()

                }}
            />
            {okToGoOn ?
            <button
                style={styles.button}
                onClick={() => setTheEmail()}
            >Submit</button>
                :
                <button
                    style={styles.inactiveButton}
                >Submit</button>
            }
        </div>
    )
}

const styles = {
    body: {
        display: 'flex' as 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center'
    },
    input: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '20rem',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem"
    },
    invalidInput: {
        marginTop: '10px',
        marginBottom: '15px',
        padding: '10px',
        width: '20rem',
        borderRadius: '5px',
        fontFamily: "PlomPraeng",
        fontSize: "1rem",
        backgroundColor: "#ffe4e4",
        border: "red 2px solid",
    },button: {
        padding: '10px 20px',
        backgroundColor: '#2b7285',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '3%',
        width: "150px"
    },
    inactiveButton: {
        padding: '10px 20px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '3%',
        width: "150px",

    },
}