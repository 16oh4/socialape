import React, { Component } from 'react'
import IconButtonWrap from '../../include/IconButtonWrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

class LikeButton extends Component {
    likedScream = () => {
        //If the likes array is defined AND it contains the scream the user requesteed to like
        // console.log(`Inside scream:\n${JSON.stringify(this.props.user.likes)}`)
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
            return true; //the user already liked the scream so don't do anything
        else return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }

    componentDidUpdate(nextProps, nextState, snapshot) {
        // console.log('               LikeButton componentDidUpdate()');
    }

    render() {

        // console.log('               LikeButton render()')
        const { authenticated } = this.props.user;
        const { likeCount } = this.props;

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
            <Link to="/login">
                <IconButtonWrap tip="Like">                    
                        <FavoriteBorder color="primary"/>                    
                </IconButtonWrap>
            </Link>
            );
        
        const likeButton = authenticated ? (
            <>
                {authLikeIcon}
                <span>{likeCount} {(likeCount !== 1) ? 'Likes' : 'Like'}</span>
            </>            
         ) : nonAuthLikeIcon;
        return (likeButton)
    }
}

LikeButton.propTypes = {
    // screamId: PropTypes.string.isRequired,

    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);