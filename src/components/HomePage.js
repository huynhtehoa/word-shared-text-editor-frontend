import React from 'react';

import Typography from '@material-ui/core/Typography';

import { RingLoader } from 'react-spinners';

import DocumentCard from './DocumentCard'

import '../styles/homepage.css'

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            pageNo: 1,
            totalPages: null,
            scrolling: false,
            loading: true
        };
    };

    componentDidMount() {
        this.getDoc();
        this.scrollListener = window.addEventListener("scroll", e => {
            this.handleScroll(e)
        });

    };

    getDoc = async () => {
        const { pageNo, documents } = this.state;
        const res = await fetch(`https://word-shared-text-editor.herokuapp.com/getdoc/${pageNo}`);
        const jsonData = await res.json();

        this.setState({
            documents: documents.concat(jsonData.results),
            totalPages: jsonData.total_pages,
            scrolling: false,
            loading: false
        });
    };

    loadMore = () => {
        this.setState({
            pageNo: this.state.pageNo + 1,
            scrolling: true
        }, () => this.getDoc())
    }

    handleScroll = e => {
        const { scrolling, totalPages, pageNo } = this.state
        if (scrolling) return
        if (totalPages <= pageNo) return

        const lastCol = document.querySelector("div.document-container > div:last-child")
        const lastColOffset = lastCol.offsetTop + lastCol.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        let bottomOffset = 20

        if (pageOffset > lastColOffset - bottomOffset) this.loadMore()
    }

    Document = () => {
        const { documents } = this.state

        if (documents.length === 0) {
            return (
                <>
                    <div className="col-12 flex-box" style={{ marginTop: '100px' }}>
                        <Typography variant="h6">
                            Currently, there is no message available
                        </Typography>
                    </div>
                    <div className="col-12 flex-box">
                        <button className="btn btn-large save-btn" onClick={() => window.location.replace(`http://world-messages.netlify.com/edit/${document.id}`)}>Create One Now!</button>
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
                {/* {
                    (this.state.loading)
                        ?
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                            <RingLoader color={"#17a2b8"} />
                        </div>
                        : */}
                        <div className="container document-container">
                            <div className="row">
                                <div className="col-12 flex-box mb-3 text-center">
                                    <Typography variant="h2">
                                        World-shared Message Editor
                            </Typography>
                                </div>
                                <div className="col-12 flex-box mb-5 text-center">
                                    <Typography variant="h4" className="sub-title">
                                        <span>Share your message to the world now!</span>
                                    </Typography>
                                </div>
                            </div>
                            <div className="row">
                                <this.Document />
                            </div>
                        </div>
                {/* } */}
            </>
        );
    };
};