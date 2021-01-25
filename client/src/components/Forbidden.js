import React from 'react';
import SignIn from './SignIn';
import withContext from '../Context';
import { withRouter } from 'react-router-dom';
const SignInWithContext = withContext(SignIn);
    // may not need context
const SignInWithRouter = withRouter(SignInWithContext);

const Forbidden = () => {
    
    
    return (
    <div className="forbidden">
            <h1>Access Forbidden</h1>
            <h2>You must be logged in to access the requested page.</h2>
            <h3>Please sign in and then we'll take you there.</h3>
        {/* Needed to get props.history into SignIn so that cancel button props.history.push will work */}
        {/* Not there because nested in Forbidden, but withRouter gives access to props.history */}
        <SignInWithRouter />
    </div>
   );
};

export default Forbidden;