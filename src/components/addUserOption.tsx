import {useNavigate} from "react-router-dom";

const AddUserOption = () => {

    const goToAdminForm = useNavigate()
    const goToEmployeeForm = useNavigate()
    const goToPrivateCustomerForm = useNavigate()
    const goToBusinessCustomerForm = useNavigate()

    return (
        <div style={styles.container}>
            <div className="h1" style={styles.h1}>
                <h1>Create new:</h1>
                <div className="menuBtn" style={styles.menuBtns}>
                    <button type="submit" style={styles.button} onClick={() => {{goToAdminForm(("/AddAdmin"))}}}>
                        Admin
                    </button>
                    <button type="submit" style={styles.button} onClick={() => {{goToEmployeeForm(("/AddEmployee"))}}}>
                        Employee
                    </button>
                    <button type="submit" style={styles.button} onClick={() => {{goToPrivateCustomerForm(("/AddPrivateCustomer"))}}}>
                        Private Customer
                    </button>
                    <button type="submit" style={styles.button} onClick={() => {{goToBusinessCustomerForm(("/AddBusinessCustomer"))}}}>
                        Business Customer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserOption;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center' as "center",
        justifyContent: 'center' as "center",
        marginTop: '2%',
        color: '#000001',
    },
    menuBtns: {
        display: "flex",
        marginTop: '10%',
    },
    button: {
        backgroundColor: '#b3d9e3',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontWeight: 'normal',
    },
    h1: {
        justifyContent: "center" as 'center',
        textAlign: "center" as 'center'
    }
}
