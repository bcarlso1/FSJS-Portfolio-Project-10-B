import React from 'react';


export default ({ context}) => {
    // extract context property from props

    const authUser = context.authenticatedUser;
    
    return (
        <div className="header">
            <div className="bounds">
                <h1>{authUser.user[0].firstName} is authenticated!</h1>
            </div>
            <hr />
        </div>
    );
}



