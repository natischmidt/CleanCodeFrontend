import {useNavigate} from "react-router-dom";
import {useUserType} from "../context/UserTypeContext";
import HeaderComp from "../layout/HeaderComp";
import React from "react";
import "../../styles/AddUserOption.css";

const AddUserOption = () => {

    const goToAdminForm = useNavigate()
    const goToEmployeeForm = useNavigate()
    const goToPrivateCustomerForm = useNavigate()
    const goToBusinessCustomerForm = useNavigate()
    const {userType} = useUserType();

    return (
        <>
            <HeaderComp/>
                <div style={styles.container}>
                    <div className="h1" style={styles.h1}>
                        <h1>Create new:</h1>
                        <div className="menuBtn menuBtns">
                            {userType === "ADMIN" && (
                                <button
                                    type="submit"
                                    className="button"
                                    onClick={() => {
                                        if (userType === "ADMIN") {
                                            goToAdminForm("/addadmin");
                                        }
                                    }}
                                >
                                    Admin
                                </button>
                            )}
                            {userType === "ADMIN" &&
                                <button type="submit"
                                        className="button"
                                        onClick={() =>
                                        {{goToEmployeeForm(("/addemployee"))}}}>
                                Employee
                            </button>}
                            <button type="submit" className="button" onClick={() => {{goToPrivateCustomerForm(("/addprivatecustomer"))}}}>
                                Private Customer
                            </button>
                            <button type="submit" className="button" onClick={() => {{goToBusinessCustomerForm(("/addbusinesscustomer"))}}}>
                                Business Customer
                            </button>
                        </div>
                    </div>
                </div>
        </>
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
    h1: {
        justifyContent: "center" as 'center',
        textAlign: "center" as 'center'
    }
}
