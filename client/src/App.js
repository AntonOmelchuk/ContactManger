import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alert";

import ContactState from './context/contacts/contactState';
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";

const App = () => {
    return (
        <AlertState>
        <AuthState>
        <ContactState>
            <BrowserRouter>
                <>
                    <Navbar />
                    <div className="container">
                        <Alert />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </div>
                </>
            </BrowserRouter>
        </ContactState>
        </AuthState>
        </AlertState>
    );
};

export default App;
