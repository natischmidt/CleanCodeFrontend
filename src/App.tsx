import './App.css'
import Routing from "./Routing";
import { UserTypeProvider } from "./components/context/UserTypeContext";

function App() {
    return (
        <UserTypeProvider>
            <div className="container">
                <Routing/>
            </div>
        </UserTypeProvider>
    );
}

export default App;
