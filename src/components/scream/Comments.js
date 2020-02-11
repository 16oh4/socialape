import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Material UI Pkg

// Use treeshaking to reduce build size!!
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.styles,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover', //incase image ratio is not 1:1
        borderRadius: '50%' //radius starts halfway through each border
    },
    commentData: {
        marginLeft: '40px'
    }
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map( (comment, index) => {
                    const { userHandle, userImage, body, createdAt } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                {/*  In each item (comment) there is a container*/}
                                {/* On the left is the image, on the right is the body */}
                                <Grid container>

                                    {/* User image */}
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>

                                    {/* Comment details */}
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>

                                            {/* Link to user handle */}
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary">
                                                    {userHandle}
                                            </Typography>

                                            {/* Timestamp of comment */}
                                            <Typography 
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>

                                            <hr className={classes.invisibleSeparator}/>

                                            {/* Body of comment */}
                                            <Typography variant="body1"> 
                                                {body}                      
                                            </Typography>

                                        </div>
                                        {/* Comment details Grid Item */}
                                    </Grid>
                                    {/* Grid Container for profile image and comment detail grid items*/}
                                </Grid>
                                {/* Entire comment as a Grid item */}
                            </Grid>
                            {/* If I'm rendering the last comment, then don't add the <hr> */}
                            {(index !== comments.length - 1) && (
                                <hr className={classes.visibleSeparator}/>
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Comments);