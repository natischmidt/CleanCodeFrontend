import {useNavigate} from "react-router-dom";
import addAdmin from "../forms/addAdmin";

const AddUserOption = () => {

    const goToAdminForm = useNavigate()

    return (
        <div style={styles.container}>
            {/*<button type="submit" style={styles.button} onClick={() => {{goToAdminForm((addAdmin))}}}>*/}
            {/*    Add Admin*/}
            {/*</button>*/}
            <button type="submit" style={styles.button}>
                Add Employee
            </button>
            <button type="submit" style={styles.button}>
                Add Private Customer
            </button>
            <button type="submit" style={styles.button}>
                Add Business Customer
            </button>
        </div>
    );
};

export default AddUserOption;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
    },
    button: {
        padding: '13px 25px',
        backgroundColor: '#53b067',
        color: 'black',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '25px',
        fontSize: '1.2rem',
    },
}