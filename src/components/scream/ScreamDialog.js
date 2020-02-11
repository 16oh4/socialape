import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButtonWrap from '../../include/IconButtonWrap';
import dayjs from 'dayjs';
import Comments from './Comments';
import CommentForm from './CommentForm';
import {Link} from 'react-router-dom';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';

const styles = (theme) => ({
    ...theme.styles,
    
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%', //for circle image
        objectFit: 'cover' //so ratio is 1:1 and doesn't stretch it
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        margin: '50 0 50 0',
    }
})

class ScreamDialog extends Component {
    constructor(props) {
        super(props);
        // console.log('       Dialog constructor(props)\n\n\n\n');
        this.state = {
            open: false,
            oldPath: '',
            newPath: '',
            scream: {}
        }
    }

    //MOUNTING LIFECYCLE
    componentDidMount(){
        // console.log('       Dialog componentDidMount()\n\n\n\n');
        if(this.props.openDialog) this.handleOpen();
    }

    componentWillUnmount(){
        // console.log('       Dialog componentWillUnmount()\n\n\n\n');
    }

    
    static getDerivedStateFromProps(changedProps, changedState) {
        // console.log('       Dialog getDerivedStateFromProps\n\n\n\n');
        // const { screams } = changedProps;

        // let index = screams.findIndex( scream => (scream.id === changedProps.screamId) );

        // return {scream: screams[index]};


        // const propsCopy = JSON.parse(JSON.stringify(changedProps));
        // delete propsCopy['classes'];
        // console.log(`Changed props:\n${JSON.stringify(propsCopy)}`);
        // console.log(`Changed state:\n${JSON.stringify(changedState)}`);

        return null;
    }
    /*

    shouldComponentUpdate(nextProps, nextState) {
        console.log('       Dialog shouldComponentUpdate\n\n\n\n');

        const propsCopy = JSON.parse(JSON.stringify(this.props));
        delete propsCopy['classes'];
        console.log(`Prev props:\n${JSON.stringify(propsCopy)}`);
        console.log(`Prev state:\n${JSON.stringify(this.state)}`);
        console.log(`\n`);

        const nextPropsCopy = JSON.parse(JSON.stringify(nextProps));
        delete nextPropsCopy['classes'];
        console.log(`Next props:\n${JSON.stringify(nextPropsCopy)}`);
        console.log(`Next state:\n${JSON.stringify(nextState)}`);

        return true;
    }
    */
    componentDidUpdate() {
        // console.log('       Dialog componentDidUpdate\n\n\n\n');
        // this.props.getScream(this.props.screamId);
    }
    

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({
            open: false,
        })
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`

        window.history.pushState(null, null, newPath);

        this.setState({
            open: true,
            oldPath,
            newPath
        })
        this.props.getScream(this.props.screamId);
    }

    

    render(){
        


        const { classes, 
            scream: {screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments},
            UI: { loading },
        } = this.props;

        // const { 
        //     scream: {id, body, createdAt, likeCount, commentCount, userImage, userHandle, comments},
        // } = this.state;

        // console.log('Scream Dialog: ' + JSON.stringify(scream));

        const screamMarkup = (
            (
                <Grid
                    container
                    direction='row'
                    alignContent='center'
                    spacing={2}
                >
                    {/* User image */}
                    <Grid item sm={5}> 
                        <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    </Grid>

                    <Grid item sm={7}>
                        {/* User handle */}
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
    
                        {/* Separator */}
                        <hr className={classes.invisibleSeparator}/>
    
                        {/* Created at */}
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
    
                        <hr className={classes.invisibleSeparator}/>
    
                        {/* Body */}
                        <Typography variant="body1">
                            {body}
                        </Typography>

                        {/* Like button */}
                        <LikeButton screamId={screamId} likeCount={likeCount}></LikeButton>

                        {/* Comments button */}
                        <IconButtonWrap tip="Comments">
                            <ChatIcon color="primary"/>
                        </IconButtonWrap>
                        <span>{commentCount} Comments</span>                        
                    </Grid>

                    <hr className={classes.visibleSeparator}/>
                    {/* To input a new comment */}
                    <CommentForm screamId={screamId} />

                    {/*Display comments  */}
                    <Comments comments={comments}/>
                </Grid>
            )
        )

        const progress = (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={70} thickness={0.5}/>
            </div>
        )

        const dialogMarkup = loading ? progress : screamMarkup;

        return (
            <>
                {/*Icon to expand the scream comments*/}
                <IconButtonWrap
                    onClick={this.handleOpen}
                    tip="Expand scream"
                    tipClassName={classes.expandButton}                
                >
                    <UnfoldMore color="primary"/>
                </IconButtonWrap>

                {/*Little dialog window that will show scream comments and details */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    {/*Dialog close button */}
                    <IconButtonWrap
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon color="primary"/>
                    </IconButtonWrap>

                    {/* To display the scream */}
                    <DialogContent
                        className={classes.dialogContent}
                    >
                        {dialogMarkup}
                    </DialogContent>

                </Dialog>
            </>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired, //from the import

    screamId: PropTypes.string.isRequired,      //passed in from Scream.js parent
    userHandle: PropTypes.string.isRequired,    //passed in from Scream.js parent

    scream: PropTypes.object.isRequired,    //from Redux store
    // screams: PropTypes.array.isRequired,
    UI: PropTypes.object.isRequired         //from Redux store
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    // screams: state.data.screams,
    UI: state.UI,
    likes: state.user.likes
})

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
