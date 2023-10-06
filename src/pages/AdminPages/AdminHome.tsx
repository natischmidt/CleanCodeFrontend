import Header from "../../reusableComponents/header";
import Footer from "../../reusableComponents/footer";
import {AdminDashboard} from "../../components/AdminDashboard";
import AdminFooter from "./AdminFooter";

export default function HomePage() {
    return (
        <>
            <Header/>
            <AdminDashboard/>
            <AdminFooter/>
        </>
    )
}
