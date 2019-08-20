import React from 'react';

import { Nav, Navbar, Form, Button, FormControl } from 'react-bootstrap';

import { NavLink } from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import '../styles/navbar.css'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newDocId: null,
            documents: [],
            searchPreview: [],
            searchInput: '',
            isSearched: false,
        };
    };

    componentDidMount = () => {
        this.getAllDoc();
    };

    getAllDoc = async () => {
        const res = await fetch('https://word-shared-text-editor.herokuapp.com/getalldoc');
        const jsonData = await res.json();

        this.setState({
            documents: jsonData.results
        });
    };

    searchPreview = (searchInput) => {
        if (/^\s*$/.test(searchInput)) {
            this.hidePreview();
            this.setState({
                searchPreview: [],
            });
        } else {
            let filteredPreview = this.state.documents.filter(doc =>
                doc.title.concat(doc.body).toLowerCase().includes(searchInput.toLowerCase()))
            this.setState({
                searchPreview: filteredPreview,
            }, () => this.RenderPreview());
        };
    };

    hidePreview = () => {
        return document.getElementById('dropdown-content').style.display = "none";
    }

    RenderPreview = () => {
        const { searchPreview } = this.state;

        return (
            searchPreview.map(({ title, id }) => {
                document.getElementById('dropdown-content').style.display = "block";
                return (
                    <NavLink key={id} to='#' onClick={e => this.clickThroughPreview(e, id)}>
                        {title}
                    </NavLink>
                );
            })
        );
    };

    clickThroughPreview = (e, id) => {
        this.hidePreview();
        return window.location.replace(`https://world-messages.netlify.com/edit/${id}`);
    };

    handleSearchChange = e => {
        this.setState({
            searchInput: e.target.value
        }, () => this.searchPreview(this.state.searchInput));
    };

    handleSearch = e => {
        const { searchInput } = this.state;

        e.preventDefault();

        if (/^\s*$/.test(searchInput)) {
            alert('You cannot leave it blank');
        } else {
            this.setState({
                isSearched: true
            }, () => window.location.replace(`https://world-messages.netlify.com/search?=${searchInput}`));
        };
    };

    createDoc = async e => {
        e.preventDefault();

        let data = { "new_datetime": new Date() }

        let res = await fetch('https://word-shared-text-editor.herokuapp.com/newdoc', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let jsonData = await res.json()
        this.setState({
            newDocId: jsonData.doc_id,
        }, () => window.location.replace(`https://world-messages.netlify.com/edit/${this.state.newDocId}`))
    };

    handleClickAway = () => {
        this.hidePreview();
        document.getElementById('search-input').value = "";
        this.setState({
            searchInput: "",
            searchPreview: []
        });
    };

    render() {

        return (
            <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
                <NavLink to='/'>
                    <Navbar.Brand>
                        WSME
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{ textAlign: "center" }}>
                    <Nav className="mr-auto">
                        <NavLink to='/' className="nav-link">All Messages</NavLink>
                        <NavLink to='#' className="nav-link" onClick={this.createDoc}>New Message</NavLink>
                        <NavLink to='/faq' className="nav-link">FAQ</NavLink>
                    </Nav>
                    <Form inline onSubmit={this.handleSearch} className="d-flex justify-content-center ml-auto mt-4 mb-4 mt-xl-0 mb-xl-0">
                        <div className="dropdown">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearchChange} />
                            <ClickAwayListener onClickAway={this.handleClickAway}>
                                <div id="dropdown-content">
                                    <this.RenderPreview />
                                </div>
                            </ClickAwayListener>
                        </div>
                        <Button variant="outline-info" id="search-input" onClick={this.handleSearch}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};