import logo from "../assets/logo3.png";

export default function Header() {
    return (
        <div className="headerContainer" style={styles.header}>
            <div className="logo">
                <img id="logo3" src={logo} alt="logo3" style={styles.logo}/>
            </div>
            <div className="menuButtons" style={styles.menuButtons}>
                <button id="Booking" style={styles.booking}>Booking</button>
                <button id="Employees" style={styles.employees}>Employees</button>
                <button id="Customers" style={styles.customers}>Customers</button>
                <button id="GDPR" style={styles.gdpr}>GDPR</button>
                <button id="SignOut" style={styles.signout}>Sign Out</button>
            </div>
        </div>
    )
}

const styles = {
    header: {
        backgroundColor: '#E2FFF8',
        borderBottom: '5px solid #52af66',
        display: 'flex',
        padding: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '320px',
        height: '180px',
    },
    menuButtons: {
        display: 'flex',
        marginLeft: '45%',
        color: '#000001',
    },
    booking: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    employees: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    customers: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    gdpr: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
    signout: {
        backgroundColor: '#53b067',
        marginLeft: '5%',
        width: '180px',
        height: '60px',
        fontSize: '1.2rem',
        fontWeight: 'normal',
    },
}
