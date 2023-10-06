import Header from "../reusableComponents/header";
import Footer from "../reusableComponents/footer";
import {AdminDashboard} from "../components/AdminDashboard";

export default function HomePage() {
    return (
        <>
            <Header/>
            <AdminDashboard/>
            <Footer/>
        </>
    )
}