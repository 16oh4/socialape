import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// MATERIAL UI!!!!!
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// ICONS
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {

    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.target
        });
    }
    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    }
    //send array of notifications to backend to mark read
    onMenuOpened = () => {

        //returns array of notification ID's that are not read
        let unreadNotifIds = this.props.notifications
        .filter(notif => !notif.read)
        .map(notif => notif.notificationId);
        
        this.props.markNotificationsRead(unreadNotifIds);
    }
    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationsIcon, notificationsMarkup;

        //if notifications is defined and not null, and if there are any notifs
        if(notifications && notifications.length > 0 ) {

            //Setup notificationIcon
            notifications.filter(notif => !notif.read).length > 0
                ? (notificationsIcon = (
                    <Badge 
                        badgeContent={notifications.filter(notif => notif.read === false).length}
                        color="secondary"
                    >
                        <NotificationsIcon/>
                    </Badge>
                )) : (
                    notificationsIcon = <NotificationsIcon/>
                )

            //Setup notificationsMarkup
            notificationsMarkup = (
                notifications.map(notif => {
                    const verb = notif.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(notif.createdAt).fromNow();
                    const iconColor = notif.read ? 'primary' : 'secondary';
                    const icon = notif.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
                    )

                    return (
                        <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                variant="body1"
                                to={`/users/${notif.recipient}/scream/${notif.screamId}`}
                            >
                                {notif.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            )

        } else {
            notificationsIcon = <NotificationsIcon/>;

            notificationsMarkup = (
                <MenuItem onClick={this.handleClose}>
                    <span>No notifs =(</span>
                </MenuItem>
            )
        }

        return (
            <>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);