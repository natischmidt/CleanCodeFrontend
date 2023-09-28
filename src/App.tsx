import './App.css'
import Footer from './reusableComponents/footer'
import Routing from "./Routing";
import Header from "./reusableComponents/header";
import Table2 from "./reusableComponents/table2";

function App() {

    return (
        <>
            <Header></Header>
            <div className="container">
                <Routing/>
                {/*<Table2/>*/}
            </div>

            <Footer/>
        </>
    )
}

export default App