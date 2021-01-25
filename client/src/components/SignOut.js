import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
    context.actions.signOut();
    // signOut function in context
    
    return (
     <Redirect to="/" />
     // go to home
    );
}