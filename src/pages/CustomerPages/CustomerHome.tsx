import Header from "../../reusableComponents/header";
import Footer from "../../reusableComponents/footer";
import {CustomerDashboard} from "../../components/CustomerDashboard";

export default function CustomerHomePage() {
    return (
        <>
            <Header/>
            <CustomerDashboard/>
            CUSTOMER PAGE
            <Footer/>
        </>
    )
}
