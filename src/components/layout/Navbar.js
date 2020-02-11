import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import IconButtonWrap from '../../include/IconButtonWrap';
import PostScream from '../scream/PostScream';

//MATERIAL UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeIcon from '@material-ui/icons/Home';

//REACT-ROUTER-DOM
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import Typography from '@material-ui/core/Typography';

//import Link from 'react-router-dom/Link';
//`require("react-router-dom").Link` instead of `require("react-router-dom/Link")`.

const styles = theme => ({
    ...theme.styles,
    titleTypo : {
        textDecoration: 'none',
        marginRight: 20
    }
})

class Navbar extends Component {
    render() {
        const { auth, classes } = this.props;

        const nonAuthMarkup = (
            <>
            <Link to="/" className={classes.titleTypo}>
                    <Typography variant="h6" to="/" color="secondary">
                        S O C I A L - A P E
                    </Typography>
                </Link>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
        );

        const authMarkup = (
            <>
                <Link to="/" className={classes.titleTypo}>
                    <Typography variant="h6" to="/">
                        S O C I A L - A P E
                    </Typography>
                </Link>
                {/*Icon to post new scream with. Opens dialog to post new scream */}
                <PostScream/>
                
                {/*Goes to home page*/}
                <Link to="/">
                    <IconButtonWrap tip="Home">
                        <HomeIcon/>                
                    </IconButtonWrap>
                </Link>

                {/*Shows the notifications */}
                <Notifications/>
            </>
        );

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {auth ? authMarkup : nonAuthMarkup}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.bool.isRequired, //must make sure the user is authenticated to render diff icons!
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar))