import React from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Popover from '@material-ui/core/Popover';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import '../styles/editdoc.css'

export default class NewDoc extends React.Component {

    constructor(props) {
        super(props);

        let docId = parseInt(window.location.href.split('edit/')[1]);

        this.state = {
            documents: [],
            id: docId,
            title: '',
            body: '',
            isExisted: false,
            isLong: false,
            isBlank: false,
            isSaved: false,
            anchorEl: null,
        };
    };

    componentDidMount() {
        this.getAllDoc();
        this.autoSave();
        document.getElementById("input-title").focus();
        this.handleSaveShortcut = window.addEventListener("keydown", e => {
            this.handleShortcutSave(e);
        });
    };

    handleShortcutSave = e => {
        if (e.ctrlKey && e.shiftKey && e.which === 83) {
            this.doubleFunctionSave(e);
        };
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            isExisted: false,
            isBlank: false,
            isLong: false,
            isSaved: false
        });
    };

    getAllDoc = async () => {
        const res = await fetch('https://word-shared-text-editor.herokuapp.com/getalldoc');
        const jsonData = await res.json();

        jsonData.results.map(({ id, title, body }) => {
            if (this.state.id === id) {
                this.setState({
                    documents: jsonData.results,
                    id,
                    title,
                    body
                });
            };
        });
    };

    handleSave = async () => {
        const { id, title, body, isExisted, isLong, isBlank } = this.state;
        let data = {
            title,
            body,
            "new_datetime": new Date()
        };

        if (!isExisted && !isLong && !isBlank) {
            await fetch(`https://word-shared-text-editor.herokuapp.com/edit/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        };
    };

    doubleFunctionSave = e => {
        this.handleSave();
        this.prompSave(e);
    };

    prompSave = e => {
        this.setState({
            isSaved: true,
            anchorEl: e.currentTarget
        });
        setTimeout(() => this.handleClose(), 2000);
    };

    autoSave = () => {
        setInterval(() => {
            this.handleSave()
        }, 10000);
    };

    afterFalseValid = () => {
        document.getElementById("input-title").focus();
        setTimeout(() => this.handleClose(), 2000);
    };

    checkTitle = e => {
        const { documents, id, title } = this.state;

        let currentTitle = '';

        documents.map(doc => {
            if (id !== doc.id) {
                if (title === doc.title) {
                    this.setState({
                        isExisted: true,
                        title: '',
                        anchorEl: e.currentTarget
                    });
                    this.afterFalseValid();
                }
            } else {
                currentTitle = doc.title;
            };
        });

        if (/^\s*$/.test(title)) {
            this.setState({
                isBlank: true,
                title: currentTitle,
                anchorEl: e.currentTarget
            });
            this.afterFalseValid();
        }
        if (title.length > 30) {
            this.setState({
                isLong: true,
                title: currentTitle,
                anchorEl: e.currentTarget
            });
            this.afterFalseValid();
        };
    };

    AlertMessage = () => {
        const { isExisted, isLong, isBlank, isSaved } = this.state;
        let message = '';

        if (isExisted) {
            message = 'Your doc title already exists!';
        } else if (isLong) {
            message = 'Your doc title must not exceed 30 characters!';
        } else if (isBlank) {
            message = 'Your doc title cannot be blank!';
        } else if (isSaved) {
            message = 'Your doc has been saved!';
        };

        return message;
    };

    render() {
        const { title, body, anchorEl, isSaved } = this.state;

        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <input id="input-title" onBlur={this.checkTitle} onChange={e => this.setState({ title: e.target.value })} value={title} />
                        </div>
                        <div className="col-12 mx-auto">
                            <CKEditor
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                data={body}
                                editor={ClassicEditor}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    this.setState({ body: data });
                                }}
                                config={{
                                    removePlugins: ['image'],
                                    toolbar: ['Heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'link', 'undo', 'redo']
                                }}
                            />
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-lg btn save-btn" onClick={this.doubleFunctionSave}>Save</button>
                        </div>
                        <div className="col-12 justify-content-center d-flex ">
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={this.handleClose}
                                anchorReference="anchorEl"
                                anchorEl={{ top: 1000 }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                {
                                    (isSaved)
                                        ?
                                        <div className="success-message"><CheckCircleIcon />&nbsp;<this.AlertMessage /></div>
                                        :
                                        <div className="alert-message"><WarningIcon />&nbsp;<this.AlertMessage /></div>
                                }
                            </Popover>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};