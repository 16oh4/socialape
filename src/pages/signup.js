import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'; //method for type checking to minimize errors in application
import donkeyIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// DATA VALIDATION
import { validateSignupData } from '../include/validators';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.styles //CANNOT CONTAIN PALETTE INFORMATION
})

class Signup extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
        }
    }

    //whenever the UI REDUCER sets errors, add them to the state
    static getDerivedStateFromProps(props, state) {
        if(props.UI.errors) {
            return ({
                errors: props.UI.errors
            });
        }
        else return null;
    }
    
    handleSubmit = (event) => {
        event.preventDefault(); //so that signup info is not displayed in address bar

        const newUserData ={
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }

        //pass in this.props.history that came from <Route> component
        //so that I can redirect the user!!
        const validation = validateSignupData(newUserData);
        if(validation.valid)
            this.props.signupUser(newUserData, this.props.history);
        else this.setState({errors: validation.errors});
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value //name is used to name the property for email and password cases
        })
    }

    render() {
        //destructure loading object from UI
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={donkeyIcon} alt="Donkey Kong" className={classes.image}/>
                    {/*It's good for SEO to have H1 in each page!! */}
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        {/*type property is good practice but not needed */}
                        <TextField id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth/>

                        {/*type="password" hides input while typing */}
                        <TextField id="password" 
                        name="password" 
                        type="password" 
                        label="Password"
                        className={classes.textField} 
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth/>

                        <TextField id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password"
                        className={classes.textField} 
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth/>

                        <TextField id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle"
                        className={classes.textField} 
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle}
                        onChange={this.handleChange}
                        fullWidth/>

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}
                        >
                            Signup

                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>

                        <br/>

                        <small>Already have an account? Login <Link to="/login">here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

//check to make sure the classes prop is an object!, ONLY WORKS IN DEVELOPMENT MODE
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
};

//the function in the userActions.js file will be mapped to this.props.signupUser()!
const mapActionsToProps = {
    signupUser
};

// mapDispatchToProps == mapActionsToProps
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));