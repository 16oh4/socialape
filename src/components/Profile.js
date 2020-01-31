import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

// MUI Elements
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// MUI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center', //aligns div to center, which then aligns image child to center
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%',
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {
    handleImageChange = (event) => {
        //will have files in an array, but need to select the first one
        const image = event.target.files[0]; //gets the file pointer from the user's selection 
        const formData = new FormData(); //pascal case because class
        formData.append('image', image, image.name); //adds the user's file to the form data. Like I did in postman

        this.props.uploadImage(formData); //for Redux
    }

    handleEditPicture = () => { //whenever the edit icon is clicked, it will send a click to the hidden upload button!!
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const {
            classes, //passed from Material UI withStyles higher-order component
            user: {  //passed from Redux
                credentials: { 
                    handle, 
                    createdAt, 
                    imageUrl,
                    bio,
                    website,
                    location
                },
                loading,
                authenticated
            }
        } = this.props;

        let authMarkup = (
            <Paper className={classes.paper}>
                <div className={classes.profile}>

                    {/*Profile image */}
                    <div className="image-wrapper">
                        <img 
                            className="profile-image" 
                            src={imageUrl} 
                            alt="profile_image"
                        />

                        {/*Onchange triggered when file selected*/}
                        <input 
                            type="file" 
                            id="imageInput" 
                            hidden="hidden" 
                            onChange={this.handleImageChange} 
                        /> 

                        {/*IconButton used to have the pencil icon to edit image */}
                        {/*Tooltip creates a popup description on child element when hovered */}
                        <Tooltip
                            title="Edit profile picture"
                            placement="right"
                        >
                            <IconButton 
                                onClick={this.handleEditPicture} 
                                className="button"
                            >
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    {/*Horizontal ruler to give space between. Since inside profile styled div, already styled on its own.
                    using property className="hr" would be redundant */}
                    <hr/>

                    {/*Profile text */}
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>

                        <hr/>

                        {bio && <Typography variant="body2">{bio}</Typography>}

                        <hr/>

                        {location && (
                            <Fragment> {/*Fragment is a React component that wraps elements as one element */}
                                <LocationOn color="primary"/> 
                                <span>{location}</span>
                            </Fragment>
                        )}

                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                {/*
                                ->  target="_blank" makes it open in a new window. 
                                ->  noopener is a security measure that makes sure the new link runs on a separate browser process. 
                                    It prevents access to window.opener property. Otherwise, the other website could change code 
                                    on mine!
                                ->  noreferrer prevents the Referer header from being sent to the new page
                                */}
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                            </Fragment>
                        )}

                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

                    </div>

                    {/*For logging out */}
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Paper>
        );

        let nonAuthMarkup = (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">No profile found, please login again</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        );

        let profileMarkup = loading ? (<p>loading...</p>) : (authenticated ? authMarkup : nonAuthMarkup);

        return (
            profileMarkup
        );
    }
}
const mapStateToProps = (state) => ({ //returns an object
    user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired, //redux state
    classes: PropTypes.object.isRequired, //MUI classes
    logoutUser: PropTypes.func.isRequired, //redux action
    uploadImage: PropTypes.func.isRequired, //redux action
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));