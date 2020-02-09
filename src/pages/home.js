import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

import Grid from '@material-ui/core/Grid'

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import CircularProgress from '@material-ui/core/CircularProgress';


class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            screams: []
        }
    }

    componentDidMount() { //INITIAL FETCH
        console.log('Home componentDidMount()\n\n\n\n');
        this.props.getScreams()

        //screams use id not screamId!!!!!!!
    }

    
    /*
    static getDerivedStateFromProps(changedProps, changedState) {
        console.log('Home getDerivedStateFromProps()\n\n\n\n');

        console.log(`changed props:\n${JSON.stringify(changedProps.data)}`)
        console.log(`changed state:\n${JSON.stringify(changedState.screams)}`)
        //if(changedProps.data.screams.length > changedState.screams.length) return {screams: changedProps.data.screams}
        return null;
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        
        console.log('Home shouldComponentUpdate()\n\n\n\n');
        if(Object.keys(nextProps.data.scream).length > 0) return false;
        if((nextState.screams.length > 0) || nextProps.data.loading) {
            console.log('New screams inbound or loading')
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) { //SUBSEQUENT FETCHES
        console.log('Home componentDidUpdate()\n\n\n\n');
        
    }
    */
    
    render() {
        const { screams, loading } = this.props.data;
        // console.log('In render() of home: ' + screams.length);

        //when using an object as a BOOLEAN, it will be true if it's not null
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => {
                // console.log('SHOWING SCREAM ' + scream.id);
                return <Scream 
                            scream={scream} 
                            key={scream.id} 
                            raised="true"
                        />
            })
        ) : (<CircularProgress size={250} />);

        

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
    // screams: PropTypes.array.isRequired,
    // loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home);