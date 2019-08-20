import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import '../styles/documentcard.css'

const useStyles = makeStyles({
    card: {
        width: 350,
        height: 300,
        margin: '10px 0',
        border: '1px solid gray'
    },
    title: {
        overflow: 'hidden',
        textAlign: 'center'
    },
    body: {
        height: 140
    },
    date: {
        display: 'block',
        marginTop: '1.5rem'
    }
});

const handleEditClick = (e, id) => {
    return window.location.replace(`http://world-messages.netlify.com/edit/${id}`)
}

export default function DocumentCard(props) {
    const classes = useStyles();
    const { id, title, body, created_at, updated_at } = props.document;
    console.log(body)
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={e => handleEditClick(e, id)}>
                <CardContent
                    className={classes.body + " " + "over-flow"}
                >
                    <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: body }} />
                </CardContent>
                <CardContent>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.date}>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                    Created at: {moment(created_at).format('MMM Do YY, h:mm a')}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" component="p">
                    Updated at: {moment(updated_at).format('MMM Do YY, h:mm a')}
                </Typography>
            </CardActions>
        </Card>
    );
}