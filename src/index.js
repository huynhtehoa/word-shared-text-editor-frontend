import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";

import HomePage from './components/HomePage';
import EditDoc from './components/EditDoc';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import Faq from './components/Faq';

import './styles/index.css';

var history = createBrowserHistory();

function App() {

    return (
        <Router history={history}>
            <NavBar />
            <div className="scroll-top" >
                <ScrollUpButton />
            </div>
            <div style={{ marginTop: '105px' }}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/edit/:id" component={EditDoc} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/faq" component={Faq} />
                </Switch>
            </div>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();