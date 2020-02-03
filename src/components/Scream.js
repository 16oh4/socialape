import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MUI IMPORT
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions'

//const Link = require('react-router-dom').Link;

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },

    image: {
        minWidth: 200,
    },

    content: {
        padding: 25,
        objectFit: 'cover', //that way images won't get streteched
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);

        //DESTRUCTURING
        //same as const classes = this.props.classes

        //TO ACCESS with scream.userImage, scream.screamId
        /*
        const { 
            classes, 
            scream : { 
                ...scream
            } 
        } = this.props;
        */
       //TO ACCESS with userImage, screamId
       const {
           classes,
           scream : {
               body,
               createdAt,
               userImage,
               userHandle,
               // eslint-disable-next-line
               screamId,
                // eslint-disable-next-line
               likeCount,
                // eslint-disable-next-line
               commentCount
           }
       } = this.props;
        
        
        return (
            <Card className={classes.card} variant="elevation">
                {/*The  */}
                <CardMedia 
                    image={userImage} 
                    title="Profile image" 
                    className={classes.image}
                />

                <CardContent className={classes.content}>

                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>

                    <Typography 
                        variant="body2" 
                        color="textSecondary"
                    >
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography 
                        variant="body1"
                    >
                        {body}
                    </Typography>

                </CardContent>

            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));