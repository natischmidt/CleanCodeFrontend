import React from 'react';

interface DashboardProps {
    userType: 'customer' | 'employee' | 'admin';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            {userType === 'customer' ? (
                <CustomerDashboard />
            ) : userType === 'employee' ? (
                <EmployeeDashboard />
            ) : userType === 'admin' ? (
                <> <AdminDashboard />
                </>
            ) : (
                <div>User type not recognized</div>
            )}
        </div>
    );
};

const CustomerDashboard: React.FC = () => {
    return (
        <div>
            <p>Customer Dashboard </p>
        </div>
    );
};

const EmployeeDashboard: React.FC = () => {
    return (
        <div>
            <p>Employee Dashboard</p>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <p>Admin Dashboard </p>
        </div>
    );
};

export default Dashboard;


