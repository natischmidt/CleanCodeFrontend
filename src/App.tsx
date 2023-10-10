import './App.css'
import Routing from "./Routing";
import { UserTypeProvider } from "./components/UserTypeContext";

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
