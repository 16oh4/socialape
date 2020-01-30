import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'; //method for type checking to minimize errors in application
import donkeyIcon from '../images/icon.png';
import { Link } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = (theme) => ({
    ...theme.styles //cannot CONTAIN PALETTE INFORMATION
});

// const styles = {
//     form: {
//       textAlign: 'center'
//     },
//     image: {
//         margin: '0px auto 0px auto'
//     },
//     pageTitle: {
//         margin: '0px auto 10px auto'
//     },
//     textField: {
//         margin: '10px auto 10px'
//     },
//     button: {
//         marginTop: 35,
//         position: 'relative',
//     },
//     customError: {
//         color: 'red',
//         fontSize: '0.8rem',  //relative to font-size of root (entire page)
//         marginTop: 10,
//     },
//     progress: {
//         position: 'absolute'
//     },
//   };

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        //if UI errors are not undefined, then add them to the state
        if(nextProps.UI.errors) { 
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault(); //so that login and password info are not displayed in address bar

        const userData ={
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history); //pass Route history
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value //name is used to name the property for email and password cases
        })
    }

    render() {
        //destructure loading out of UI prop
        const { classes, UI: { loading }} = this.props;
        const { errors } = this.state;
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={donkeyIcon} alt="Donkey Kong" className={classes.image}/>
                    {/*It's good for SEO to have H1 in each page!! */}
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
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
                        disabled={loading}>
                            Login

                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>

                        <br/>

                        <small>Don't have an account at SocialApe? Sign up <Link to="/signup">here</Link></small>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

//takes global state, and we take what we need for this login component

/*

user = {
    authenticated:
    credentials:
    likes:
    notifications:
}

UI = {
    loading:
    errors:
}

*/
//user and UI will be in this.props!!!
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

//loginUser will be in this.props!!
const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));