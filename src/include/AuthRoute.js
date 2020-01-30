//Under /include directory because it does not provide markup

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//Functional React Component
const AuthRoute = ({ //passed in properties
    component: SocialApeComp, //the component to render for the route
    authenticated,
    ...rest //spread the rest of properties we didn't destructure
}) => (
    <Route
    {...rest} //spread out the props that were passed in by the parent! (same as prop1='something' prop2='..' prop3=)
    render={  //
        (routeProps) => (
            (authenticated === true) ? <Redirect to='/' /> : <SocialApeComp {...routeProps} />            
        )            
    }
    />
);

export default AuthRoute 