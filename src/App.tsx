import './App.css'
import Footer from './reusableComponents/footer'
import Routing from "./Routing";
import Header from "./reusableComponents/header";
import Table2 from "./reusableComponents/table2";
import LoginForm from "./components/formLogin";

function App() {

    return (
        <>
            <div className="container">
                <Routing/>
            </div>
        </>
    )
}

export default App