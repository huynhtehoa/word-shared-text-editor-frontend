import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";

import HomePage from './components/HomePage';
import EditDoc from './components/EditDoc';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import Faq from './components/Faq';

import './styles/index.css';

function App() {

    return (
        <Router>
            <NavBar />
            <div className="scroll-top" >
                <ScrollUpButton />
            </div>
            <div style={{ marginTop: '105px' }}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/edit/:id" component={EditDoc} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/faq" component={Faq} />
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();