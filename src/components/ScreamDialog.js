import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButtonWrap from '../include/IconButtonWrap';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.styles,
    invisibleSeparator: {
        border: 'none', //hr has border by default
        margin: 4,
    }
})

class ScreamDialog extends Component {
    constructor(props) {
        super(props);
        console.log('       Dialog constructor(props)\n\n\n\n');
        this.state = {
            open: false
        }
    }

    //MOUNTING LIFECYCLE
    componentDidMount(){
        console.log('       Dialog componentDidMount()\n\n\n\n');
    }

    componentWillUnmount(){
        console.log('       Dialog componentWillUnmount()\n\n\n\n');
    }

    static getDerivedStateFromProps(changedProps, changedState) {
        console.log('       Dialog getDerivedStateFromProps\n\n\n\n');

        // const propsCopy = JSON.parse(JSON.stringify(changedProps));
        // delete propsCopy['classes'];
        // console.log(`Changed props:\n${JSON.stringify(propsCopy)}`);
        // console.log(`Changed state:\n${JSON.stringify(changedState)}`);

        return null;
    }

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

    componentDidUpdate() {
        console.log('       Dialog componentDidUpdate\n\n\n\n');
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.getScream(this.props.screamId);
    }

    

    render(){
        
        const { classes, 
            // eslint-disable-next-line
            scream: {screamId, body, createdAt, likeCount, commentCount, userImage, userHandle},
            UI: { loading } 
        } = this.props;

        // console.log(`   LOADING STATE: ${loadingScream}`);
        // console.log('OPEN STATE: ' + this.state.open)

        const screamMarkup = (
            (
                <Grid
                    container
                    spacing={2}
                >
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
                    </Grid>
                </Grid>
            )
        )

        const progress = (
            <CircularProgress
                size={200}
            ></CircularProgress>
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

    screamId: PropTypes.string.isRequired, //passed in from Scream.js parent
    userHandle: PropTypes.string.isRequired,

    scream: PropTypes.object.isRequired, //from Redux store
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
