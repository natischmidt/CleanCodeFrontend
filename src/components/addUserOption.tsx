import {useNavigate} from "react-router-dom";

const AddUserOption = () => {

    const goToAdminForm = useNavigate()
    const goToEmployeeForm = useNavigate()
    const goToPrivateCustomerForm = useNavigate()
    const goToBusinessCustomerForm = useNavigate()

    return (
        <div style={styles.container}>
            <button type="submit" style={styles.button} onClick={() => {{goToAdminForm(("/AddAdmin"))}}}>
                Create new Admin
            </button>
            <button type="submit" style={styles.button} onClick={() => {{goToEmployeeForm(("/AddEmployee"))}}}>
                Create new Employee
            </button>
            <button type="submit" style={styles.button} onClick={() => {{goToPrivateCustomerForm(("/AddPrivateCustomer"))}}}>
                Create new Private Customer
            </button>
            <button type="submit" style={styles.button} onClick={() => {{goToBusinessCustomerForm(("/AddBusinessCustomer"))}}}>
                Create new Business Customer
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
        // marginLeft: '30%',
        color: '#000001',
    },
    button: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '200px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
}