import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButtonWrap from '../include/IconButtonWrap';

// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from      '@material-ui/core/IconButton';
import Tooltip from         '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from      '@material-ui/icons/AccountCircle';



const styles = (theme) => ({
    ...theme.styles,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
        this.mapUserDetailsToState(this.props.creds);
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value //name is used to name the property for email and password cases
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userDetails = {
            ...this.state
        }

        delete userDetails['open'];

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    componentDidMount() {
        const { creds } = this.props; //get creds from this.props
        this.mapUserDetailsToState(creds);
    }
    
    mapUserDetailsToState = (creds) => {
        this.setState({ //if fields are undefined set to empty string
            bio: creds.bio ? creds.bio : '',
            website: creds.website ? creds.website : '',
            location: creds.location ? creds.location : '',
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <IconButtonWrap 
                    tip="Edit details" 
                    onClick={this.handleOpen}
                    btnClassName={classes.button} 
                >
                    <AccountCircle color="primary"/>
                </IconButtonWrap>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm" //Max width for Dialog
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            {/*For displaying the bio */}
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="Tell the apes about yourself"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            {/*For displaying the bio */}
                            <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="What's your website?"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />

                            {/*For displaying the location */}
                            <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where is your jungle"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="primary"                        
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleSubmit}
                            color="primary"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </>
        );
    }
}

EditDetails.propTypes = {
    //states
    creds: PropTypes.object.isRequired,
    // UI: PropTypes.object.isRequired,
    //actions
    editUserDetails: PropTypes.func.isRequired,

    //MUI
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (reduxState) => ({
    creds: reduxState.user.credentials, //get the credentials from the passed in props
    // UI: reduxState.UI
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))