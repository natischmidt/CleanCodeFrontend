import '../../App.css'
import React, {useState} from 'react'
import LoginAdminOrEmployee from "../../components/forms/LoginAdminOrEmployeeForm";
import LoginCustomerForm from "../../components/forms/LoginCustomerForm";

export default function LoginPage() {

    const [isEmployeeLogin, setIsEmployeeLogin] = useState(true);

    return (
        <div style={styles.mainContainer}>
                <label style={styles.label}>
                    <input
                        style={styles.input}
                        type="checkbox"
                        checked={isEmployeeLogin}
                        onChange={() => setIsEmployeeLogin(!isEmployeeLogin)}
                    />
                         ---- Växla mellan dem
                </label>
                {isEmployeeLogin ? <LoginAdminOrEmployee /> : <LoginCustomerForm />}
        </div>
    )
}

const styles = {
    mainContainer: {
        display: "flex",
        flexDirection: 'column' as "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    input: {
        fontSize: '10rem',
        transform: "scale(4)"
    },
    label: {
        color: "black",
        fontSize: "40px",
    }
}
