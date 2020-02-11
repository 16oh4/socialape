import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

import IconButtonWrap from '../../include/IconButtonWrap';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// MUI IMPORT
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux';


//const Link = require('react-router-dom').Link;

const styles = (theme) => ({
    ...theme.styles,
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative',
    },

    image: {
        minWidth: 200,
    },

    content: {
        padding: 25,
        objectFit: 'cover', //that way images won't get streteched
    }
});


//getScreams() uses id
//likes uses screamId
class Scream extends Component {

    // constructor(props){
    //     super(props);
    //     // console.log('   Scream constructor(props)\n\n\n\n');
    // }
    
    componentDidMount() {
        // console.log('   Scream componentDidMount()\n\n\n\n');
    }

    /*
    componentWillUnmount() {
        console.log('   Scream componentWillUnmount()\n\n\n\n');
    }
    */
    componentDidUpdate() {
        // console.log('  Scream componentDidUpdate()\n\n\n\n');
    }
    

    

    render() {
        dayjs.extend(relativeTime); //to use relative dates (2 days ago, 30 seconds ago)

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
               id,
                // eslint-disable-next-line
               likeCount,
                // eslint-disable-next-line
               commentCount
           },
            authenticated,
            credentials: {
                handle
            }
           
       } = this.props;

       

       const deleteButton = authenticated && (userHandle === handle) ? (
           <DeleteScream screamId={id} />
       ) : null //null does not render anything

        return (
            <Card className={classes.card} variant="elevation">

                {/*The image of the scream owner*/}
                <CardMedia 
                    image={userImage} 
                    title="Profile image" 
                    className={classes.image}
                />

                {/*The content for the scream*/}
                <CardContent className={classes.content}>

                    {/*The userhandle*/}
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>

                    {/*Trashcan icon for deleting the scream*/}
                    {deleteButton}

                    {/*The scream timestamp*/}
                    <Typography 
                        variant="body2" 
                        color="textSecondary"
                    >
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    {/*The scream body*/}
                    <Typography 
                        variant="body1"
                    >
                        {body}
                    </Typography>

                    {/*The Like Button*/}
                    <LikeButton screamId={id} likeCount={likeCount}/>
                    {/* <span>{likeCount} Likes</span> */}

                    {/* Comments button */}
                    <IconButtonWrap tip="Comments">
                        <ChatIcon color="primary"/>
                    </IconButtonWrap>
                    <span>{commentCount} Comments</span>

                    {/* The scream dialog to open!! */}
                    <ScreamDialog
                        screamId={id}
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                        // likeCount={likeCount}
                        // scream={scream}
                    ></ScreamDialog>

                </CardContent>

            </Card>
        )
    }
}

Scream.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    credentials: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool //not required, sometimes will happen
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    credentials: state.user.credentials,
    likes: state.user.likes
})

export default connect(mapStateToProps, null)(withStyles(styles)(Scream));