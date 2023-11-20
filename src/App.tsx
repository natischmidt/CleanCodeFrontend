import './App.css';
import { UserTypeProvider } from './components/context/UserTypeContext';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import Routing from "./Routing";

function App() {
    return (
        <BrowserRouter>
            <UserTypeProvider>
                <div className="container">
                    <Routing />
                </div>
            </UserTypeProvider>
        </BrowserRouter>
    );
}

export default App;

