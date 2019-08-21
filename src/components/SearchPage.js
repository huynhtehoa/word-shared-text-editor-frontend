import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import { RingLoader } from 'react-spinners';

import DocumentCard from './DocumentCard';
import NavBar from './NavBar';

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            loading: true
        };
    };

    componentDidMount() {
        this.getSearchDocuments();
    };

    getSearchDocuments = async () => {
        let searchInput = window.location.search.split("=")[1];

        let res = await fetch(`https://word-shared-text-editor.herokuapp.com/search/${searchInput}`);
        let jsonData = await res.json();

        this.setState({
            documents: jsonData.results,
            loading: false
        });
    };

    Document = () => {
        const { documents } = this.state
        if (documents.length === 0) {
            return (
                <>
                    <div className="col-12 flex-box" style={{ marginTop: '280px' }}>
                        <Typography variant="h6">
                            No documents found
                        </Typography>
                    </div>
                    <div className="col-12 flex-box">
                        <Link to='/'><button className="btn btn-large save-btn">View All Documents</button></Link>
                    </div>
                </>
            )
        } else {
            return documents.map(document => {
                return (
                    <div key={document.id} className="col flex-box">
                        <DocumentCard document={document} />
                    </div>
                );
            });
        };
    };

    render() {
        return (
            <>
                <NavBar />
                {
                    (this.state.loading)
                        ?
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                            <RingLoader color={"#17a2b8"} />
                        </div>
                        :
                        <div className="container">
                            <div className="row">
                                <div className="col flex-box">
                                    <h2>Your search results</h2>
                                </div>
                            </div>
                            <div className="row">
                                <this.Document />
                            </div>
                        </div>
                }
            </>
        );
    };
};