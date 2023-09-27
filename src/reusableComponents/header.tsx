import './App.css'
import logo from "../assets/logo2.png";

export default function header() {
    return (
        <>
            <div className="headerContainer">
                <div className="logo">
                    <img id="logo3" src={logo} alt="logo3"/>
                </div>
                <div className="menuButtons">
                    <button id="Booking">Booking</button>
                    <button id="Employees">Employees</button>
                    <button id="Customers">Customers</button>
                    <button id="GDPR">GDPR</button>
                    <button id="SignOut">SignOut</button>
                </div>
            </div>
        </>
    )
}