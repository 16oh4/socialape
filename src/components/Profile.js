import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


class Profile extends Component {
    render() {

        const { 
            classes, //passed from Material UI theme
            user: {  //passed from Redux
                credentials: { 
                    handle, 
                    createdAt, 
                    imageUrl,
                    bio,
                    website,
                    location
                }
            }
        }

        return (
            <div>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({ //returns an object
    user: state.user
})

const styles = (theme) => ({
    ...theme.styles //cannot CONTAIN PALETTE INFORMATION
});

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));