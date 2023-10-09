import Header from "../../reusableComponents/header";
import AdminFooter from "./AdminFooter";
import BookingHistoryTable from "../../components/tabels/BookingHistoryTable";


export default function TransactionPage() {
    return (
        <>
            <Header/>
           <BookingHistoryTable/>
            <AdminFooter/>
        </>

    )
}