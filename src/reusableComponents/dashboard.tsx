import React from 'react';


interface DashboardProps {
    userType: 'customer' | 'employee' | 'admin';
    userData: {
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        address: string,
        SSnumber: string,
        phoneNumber: string,
    }
}

const Dashboard: React.FC<DashboardProps> = ({ userType, userData }) => {
    return (
        <div className="dashboard" style={styles.dashboard}>
            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    {userType === 'admin'
                        ? 'All Upcoming Bookings'
                        : userType === 'customer'
                            ? 'My Upcoming Bookings'
                            : 'My Upcoming Shifts'}
                </div>
                <div className="section-content">

                </div>
            </div>

            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    User Data
                </div>
                <div className="section-content">
                    <div>First Name: {userData.firstname}</div>
                    <div>Last Name: {userData.lastname}</div>
                    <div>Email: {userData.email}</div>
                    <div>Address: {userData.address}</div>
                    <div>Social Security Number: {userData.SSnumber}</div>
                    <div>Phone Number: {userData.phoneNumber}</div>
                </div>
            </div>

            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    Today's Date and Time
                </div>
                <div className="section-content">
                    <div>Today's Date: {new Date().toLocaleDateString()}</div>
                    <div>Today's Time: {new Date().toLocaleTimeString()}</div>
                </div>
            </div>

            <div className="section" style={styles.section}>
                <div className="section-title" style={styles.sectionTitle}>
                    User-Specific Content
                </div>
                <div className="section-content">
                    {userType === 'admin' ? (
                        <div>Admin-specific content</div>
                    ) : userType === 'customer' ? (
                        <div>Customer-specific content</div>
                    ) : (
                        <div>Employee-specific content</div>
                    )}
                </div>
            </div>
        </div>
    );
};


const styles: { [key: string]: React.CSSProperties } = {
    dashboard: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: '10px',
    },
};
export default Dashboard;


