import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'; //method for type checking to minimize errors in application
import donkeyIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            loading: false, //for spinner
            errors: {},
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault(); //so that login and password info are not displayed in address bar
        this.setState({
            loading: true
        });
        const userData ={
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', userData)
        .then(res => {
            console.log(res.data);
            this.setState({
                loading: false
            })

            //Store user login token
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);

            //Send user to homepage on successful login
            this.props.history.push('/'); //from React Router DOM
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            });
        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value //name is used to name the property for email and password cases
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);