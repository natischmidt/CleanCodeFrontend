import React from 'react';
import {EmployeeDashboard} from "../components/EmployeeDashboard";
import {CustomerDashboard} from "../components/CustomerDashboard";
import {AdminDashboard} from "../components/AdminDashboard";

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

export default Dashboard;


