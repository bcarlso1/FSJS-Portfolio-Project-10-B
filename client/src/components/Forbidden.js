import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';

const Forbidden = () => (
    <div class="forbidden">
            <h1>Access Forbidden</h1>
            <h2>You must be logged in to access the requested page.</h2>
            <h3>Please sign in and then we'll take you there.</h3>
        <SignIn />
    </div>
   
);

export default Forbidden;