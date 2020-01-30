import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import Scream from '../components/Scream';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screams: null
        }
    }
    componentDidMount() {
        axios.get('/screams')
        .then(res => {
           // console.log(res.data);

            this.setState({
                screams: res.data
            });
        })
        .catch(err => {
            console.error(err);
        })
    }
    render() {
        //when using an object as a BOOLEAN, it will be true if it's not null
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => {
                return <Scream scream={scream} key={scream.id} raised="true"/>
            })
        ) : (<p>Loading...</p>);


        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default Home