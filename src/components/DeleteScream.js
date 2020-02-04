import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import IconButtonWrap from '../include/IconButtonWrap';

// MUI Library
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.styles,
    deleteButton: {
        position: 'absolute',
        left: '90%'
    }
})

class DeleteScream extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false //For tracking dialog
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    deleteScream = () => {
        console.log(`About to delete!! ${this.props.screamId}`);
        this.props.deleteScream(this.props.screamId);
        this.setState({open: false});
    }

    render() {
        const { classes } = this.props;
        return(
            <>
                {/*This is the delete icon inside the scream */}
                <IconButtonWrap 
                    tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="primary"/>
                </IconButtonWrap>

                {/*The popup in the page after dialog button is clicked */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle>
                        Are you sure you want to delete this Scream?
                    </DialogTitle>

                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.deleteScream}
                            color="primary"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream));