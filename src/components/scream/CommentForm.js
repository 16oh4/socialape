import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Redux
import { connect } from 'react-redux'
import { submitComment, clearSubmit } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
    ...theme.styles
})

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            errors: {},
        }
    }

    isRealValue = (obj) =>
    {
        return obj && obj !== null && (typeof obj !== 'undefined');
    }

    static getDerivedStateFromProps(changedProps, changedState) {
        if( changedProps.UI.errors !== null && (typeof changedProps.UI.errors !== 'undefined') ) {
            console.log(`COMMENT ERRORS:\n\n\n\n${changedProps.UI.errors}`)
            return ({
                errors: changedProps.UI.errors
            });
        } else if(!changedProps.UI.errors) {
            return {errors: {}}
        }        
        else return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.UI.submitted) {
            // this.handleSubmitClose();
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.submitComment(this.props.screamId,
            { body: this.state.body }
        );
    }
    handleSubmitClose = () => {
        console.log('yo');
        this.props.clearSubmit();
        this.setState({ body: '' })
    }
    render() {
        const { classes, authenticated, UI: {loading}} = this.props;
        const { errors, body } = this.state;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name="body" //what will show on handlerFunctions as event.target.name
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        {loading && <CircularProgress size={20} position='relative'/>}
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    //from Redux
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,

    //from MUI
    classes: PropTypes.object.isRequired,
    
    //from parent component
    screamId: PropTypes.string.isRequired,    
}

CommentForm.propTypes = {
    UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    submitComment: PropTypes.func.isRequired,
    clearSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
})

const mapDispatchToProps = {
    submitComment,
    clearSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentForm))