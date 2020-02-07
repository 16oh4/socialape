import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButtonWrap from '../include/IconButtonWrap';
// import { validateScream } from '../include/validators';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

// Redux
import { connect } from 'react-redux';
import { postScream, clearErrors, clearSubmit } from '../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.styles,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    closeButton : {
        position: 'absolute',
        top: '5%',
        left: '90%'
    },
    screamForm: {
        textAlign: 'center'
    }
    
    
});

class PostScream extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            body: '',
            errors: {},
            test: 0,
        };
    }

    /*
    //MOUNTING LIFECYCLES
    componentDidMount() {
        console.log('       componentDidMount\n\n\n\n');
        const propsCopy = JSON.parse(JSON.stringify(this.props));
        delete propsCopy['classes'];
        console.log(`After mount props:\n${JSON.stringify(propsCopy)}`);
        console.log(`After mount state:\n${JSON.stringify(this.state)}`);
    }
    */

    //UPDATING LIFECYCLES (triggered when change in props or state)

    // #1
    static getDerivedStateFromProps(changedProps, changedState) {
        /*
        console.log('       getDerivedStateFromProps\n\n\n\n');
        const propsCopy = JSON.parse(JSON.stringify(changedProps));
        delete propsCopy['classes'];
        console.log(`Changed props:\n${JSON.stringify(propsCopy)}`);
        console.log(`Changed state:\n${JSON.stringify(changedState)}`);

        // if(changedState.open) return {test: 2}
        // return {test:1}; //return state properties to update

        //if errors are not null
        console.log(`changedProps: ${JSON.stringify(changedProps.UI.errors)}\n\n\n\n`);

        */

        if(changedProps.UI.errors) {
            return {errors: changedProps.UI.errors}
        }
        else if(!changedProps.UI.errors)
        {
            return {errors: {}};
        }
        return null;
    }

    //#2
    shouldComponentUpdate(nextProps, nextState) {
        // BAD PRACTICE TO USE JSON.STRINGIFY OR DEEP EQUALITY CHECKS

        /*
        console.log('       shouldComponentUpdate\n\n\n\n');
        const propsCopy = JSON.parse(JSON.stringify(this.props));
        delete propsCopy['classes'];
        console.log(`Prev props:\n${JSON.stringify(propsCopy)}`);
        console.log(`Prev state:\n${JSON.stringify(this.state)}`);
        console.log(`\n`);

        const nextPropsCopy = JSON.parse(JSON.stringify(nextProps));
        delete nextPropsCopy['classes'];
        console.log(`Next props:\n${JSON.stringify(nextPropsCopy)}`);
        console.log(`Next state:\n${JSON.stringify(nextState)}`);
        */

        

        return true; //should the render() method be called?
    }

    //#4
    getSnapshotBeforeUpdate(prevProps, prevState) {
        /*
        console.log('       getSnapshotBeforeUpdate\n\n\n\n');
        const propsCopy = JSON.parse(JSON.stringify(prevProps));
        delete propsCopy['classes'];
        console.log(`Snapshot props:\n${JSON.stringify(propsCopy)}`);
        console.log(`Snapshot state:\n${JSON.stringify(prevState)}`);
        */
        return 'bruno';
    }

    //#5
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*
        console.log('       componentDidUpdate\n\n\n\n');
        const propsCopy = JSON.parse(JSON.stringify(this.props));
        const prevPropsCopy = JSON.parse(JSON.stringify(prevProps));

        delete propsCopy['classes'];
        delete prevPropsCopy['classes'];

        console.log(`Snapshot from getSnapshotBeforeUpdate(prevProps, prevState):\n${snapshot}\n\n`)

        console.log(`Prev props:\n${JSON.stringify(prevPropsCopy)}`);
        console.log(`Prev state:\n${JSON.stringify(prevState)}\n\n`);

        console.log(`Updated props (current):\n${JSON.stringify(propsCopy)}`);
        console.log(`Updated state (current):\n${JSON.stringify(this.state)}`);
        

        if(Object.keys(this.state.errors) > 0) {
            console.log(`Errors.body received: ${this.state.errors.body}`);
        }
        */

        if(this.props.UI.submitted) {
            this.handleSubmitClose();
        }
    }


    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, body: '' });
    }
    handleSubmitClose = () => {
        this.props.clearSubmit();
        this.setState({ open: false, body: '' })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault(); //To prevent URL containing username and password
        this.props.postScream( {body: this.state.body} );
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        // console.log('               errors.body ' + errors.body+`\n\n\n`)

        let screamForm = (
            <form
                onSubmit={this.handleSubmit}
                className={classes.screamForm}                        
            >
                <TextField
                    name="body"
                    type="text"
                    label="SCREAM!!"
                    multiline
                    rows="3"
                    placeholder="For all the apes"
                    error={errors.body ? true : false}
                    helperText={errors.body}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={loading}
                >
                    Submit
                    
                    {loading && <CircularProgress
                        size={50}
                        className={classes.progressSpinner}
                    />}
                    
                </Button>

            </form>
        )

        let screamDialog = (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="md"
            >
                <IconButtonWrap
                    tip="Close"
                    onClick={this.handleClose}
                    tipClassName={classes.closeButton}
                >
                    <CloseIcon/>
                </IconButtonWrap>

                <DialogTitle>Post a new screammmm</DialogTitle>
                <DialogContent>
                    {screamForm}
                </DialogContent>
            </Dialog>
        )

        return (
            <>
                <IconButtonWrap 
                    onClick={this.handleOpen} 
                    tip="POST SCREAM"
                >
                    <AddIcon/>
                </IconButtonWrap>

                {screamDialog}
            </>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearSubmit: PropTypes.func.isRequired,

    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ // ({}) means it doesn't contain business logic inside!
// "auto" returns the object
    UI: state.UI
})

const mapActionsToProps = {
    postScream,
    clearErrors,
    clearSubmit
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream))