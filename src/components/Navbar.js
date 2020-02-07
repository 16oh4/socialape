import React, { Component } from 'react';

import IconButtonWrap from '../include/IconButtonWrap';
import PostScream from './PostScream';

//MATERIAL UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeIcon from '@material-ui/icons/Home';
import NotifIcon from '@material-ui/icons/Notifications';

//REACT-ROUTER-DOM
import { Link } from 'react-router-dom';

//import Link from 'react-router-dom/Link';
//`require("react-router-dom").Link` instead of `require("react-router-dom/Link")`.



class Navbar extends Component {
    render() {
        const { auth } = this.props;

        const nonAuthMarkup = (
            <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
        );

        const authMarkup = (
            <>
                {/*Icon to post new scream with. Opens dialog to post new scream */}
                <PostScream/>
                
                {/*Goes to home page*/}
                <Link to="/">
                    <IconButtonWrap tip="Home">
                        <HomeIcon/>                
                    </IconButtonWrap>
                </Link>

                {/*Shows the notifications */}
                <IconButtonWrap tip="Notifications">
                    <NotifIcon/>                
                </IconButtonWrap>
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
    auth: PropTypes.bool.isRequired //must make sure the user is authenticated to render diff icons!
}

const mapStateToProps = (state) => ({
    auth: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar)