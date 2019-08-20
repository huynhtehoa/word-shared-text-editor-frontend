import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid #343a40',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        color: 'white',
        backgroundColor: '#343a40',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

export default function Faq() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mb-5 text-center">
                    <Typography variant="h2">
                        Frequently Asked Questions
                    </Typography>
                </div>
                <div className="col-12">
                    <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>How can I save my message?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ol>
                                    <li>
                                        Message is automatically saved every 1 minute
                                    </li>
                                    <li>
                                        You can use shortcut Ctrl + Shift + S
                                    </li>
                                    <li>
                                        You can click the Save button
                                    </li>
                                </ol>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>How can I delete my message?</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Thinking your message is silly? Don't worry. Maybe you'll find out that 1/7 people on Earth are just as silly as you are 💗
          </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>I want to add more to the project!</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <ul>
                                    <li>
                                        Create a message and we can chat!
                                    </li>
                                    <li>
                                        Search for 'contribute' in the searchbar or click <a href="/edit/2" target="_blank">here</a>!
                                    </li>
                                </ul>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography>Updating...</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                More functions and FAQ are comming soon!
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        </div>
    );
}