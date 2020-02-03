import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream';
import Profile from '../components/Profile';
import CircularProgress from '@material-ui/core/CircularProgress';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screams: null
        }
    }
    componentDidMount() {
        this.props.getScreams()
    }
    render() {
        const { screams, loading } = this.props.data;

        //when using an object as a BOOLEAN, it will be true if it's not null
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => {
                return <Scream scream={scream} key={scream.id} raised="true"/>
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
}

const mapStateToProps = (state) => ({
    data: state.data //gets the state from the dataReducer
});

const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home);