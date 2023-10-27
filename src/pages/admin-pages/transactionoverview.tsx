import Header from "../../components/layout/header";
import AdminFooter from "./AdminFooter";
import BookingHistoryTable from "../../components/tables/BookingHistoryTable";


export default function TransactionPage() {
    return (
        <>
            <Header/>
           <BookingHistoryTable/>
            <AdminFooter/>
        </>

    )
}