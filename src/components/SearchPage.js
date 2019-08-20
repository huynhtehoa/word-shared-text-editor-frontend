import React from 'react';

import DocumentCard from './DocumentCard'

import Typography from '@material-ui/core/Typography';

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documents: []
        };
    };

    componentDidMount() {
        this.getSearchDocuments();
    }

    getSearchDocuments = async () => {
        let searchInput = window.location.search.split("=")[1];

        let res = await fetch(`https://word-shared-text-editor.herokuapp.com/search/${searchInput}`);
        let jsonData = await res.json();

        this.setState({
            documents: jsonData.results,
        });
    }

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
                        <button className="btn btn-large save-btn" onClick={() => window.location.replace(`http://word-messages.netlify.com`)}>View All Documents</button>
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
            </>
        );
    };
};