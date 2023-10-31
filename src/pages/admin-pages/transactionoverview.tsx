import HeaderComp from "../../components/layout/HeaderComp";
import AdminFooter from "./AdminFooter";
import BookingHistoryTable from "../../components/tables/BookingHistoryTable";


export default function TransactionPage() {
    return (
        <>
            <HeaderComp/>
           <BookingHistoryTable/>
            <AdminFooter/>
        </>

    )
}