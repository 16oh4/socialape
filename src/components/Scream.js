import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import IconButtonWrap from '../include/IconButtonWrap';

// MUI IMPORT
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
    likedScream = () => {
        //If the likes array is defined AND it contains the scream the user requesteed to like
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.id))
            return true; //the user already liked the scream so don't do anything
        else return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.id);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.id);
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
               screamId,
                // eslint-disable-next-line
               likeCount,
                // eslint-disable-next-line
               commentCount
           },
           user: {
               authenticated,
               credentials: {
                   handle
               }
           }
       } = this.props;

       const authLikeIcon = this.likedScream() ? (
        <IconButtonWrap tip="Unlike" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary"/>            
        </IconButtonWrap>
       ) : (
        <IconButtonWrap tip="Like" onClick={this.likeScream}>
            <FavoriteBorder color="primary"/>
        </IconButtonWrap>
       );
       
       const nonAuthLikeIcon = (
        <IconButtonWrap tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary"/>
            </Link>
        </IconButtonWrap>
       );
        
       const likeButton = authenticated ? authLikeIcon : nonAuthLikeIcon;

       const deleteButton = authenticated && (userHandle === handle) ? (
           <DeleteScream screamId={screamId} />
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

                    {likeButton}

                    <span>{likeCount} Likes</span>

                    <IconButtonWrap tip="Comments">
                        <ChatIcon color="primary"/>
                    </IconButtonWrap>

                    <span>{commentCount} Comments</span>

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
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));