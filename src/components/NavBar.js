import React from 'react';

import { Nav, Navbar, Form, Button, FormControl } from 'react-bootstrap';

import '../styles/navbar.css'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newDocId: null,
            searchInput: '',
            searchedDocuments: [],
            isSearched: false
        };
    };

    handleSearchChange = e => {
        this.setState({
            searchInput: e.target.value
        });
    };

    handleSearch = e => {
        e.preventDefault();

        return window.location.replace(`http://localhost:3000/search?=${this.state.searchInput}`);
    }

    createDoc = async e => {
        e.preventDefault();

        let data = { "new_datetime": new Date() }

        let res = await fetch('https://127.0.0.1:5000/newdoc', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let jsonData = await res.json()
        this.setState({
            newDocId: jsonData.doc_id,
        }, () => window.location.replace(`http://localhost:3000/edit/${this.state.newDocId}`))

    };

    backHomePage = () => {
        return window.location.replace('http://localhost:3000')
    };

    faq = () => {
        return window.location.replace('http://localhost:3000/faq')
    }

    render() {

        return (
            <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
                <a className="nav-link" href="#" onClick={this.backHomePage}>
                    <Navbar.Brand>
                        WSTE
                    </Navbar.Brand>
                </a>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{ textAlign: "center" }}>
                    <Nav className="mr-auto">
                        <a className="nav-link" href="#" onClick={this.backHomePage}>All Documents</a>
                        <a className="nav-link" href="#" onClick={this.createDoc}>New Document</a>
                        <a className="nav-link" href="#" onClick={this.faq}>FAQ</a>
                    </Nav>
                    <Form inline onSubmit={this.handleSearch} className="d-flex justify-content-center ml-auto mt-4 mb-4 mt-xl-0 mb-xl-0">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleSearchChange} />
                        <Button variant="outline-info" onClick={this.handleSearch}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};