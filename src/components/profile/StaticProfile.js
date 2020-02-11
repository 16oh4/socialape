import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.styles
});

const StaticProfile = (props) => {
    const { classes, profile : { handle, createdAt, imageUrl, bio, website, location } } = props;

    const profileImageMarkup = (
        <div className="image-wrapper">
            <img 
                className="profile-image" 
                src={imageUrl} 
                alt="profile_image"
            />
        </div>
    );

    const profileDetailsMarkup = (
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
                    <hr/>
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
                    <hr/>
                </Fragment>
            )}

            <Fragment>
                <CalendarToday color="primary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
            </Fragment>

        </div>
    )


    let authMarkup = (
        <Paper className={classes.paper}>
            <div className={classes.staticProfile}>

                {/*Profile image */}
                {profileImageMarkup}

                {/*Horizontal ruler to give space between. Since inside profile styled div, already styled on its own.
                using property className="hr" would be redundant */}
                <hr/>

                {/*Profile text */}
                {profileDetailsMarkup}
                
            </div>

            
        </Paper>
        
    );

    return authMarkup;

}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);