import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        // shorten references

        // header appears on all routes
        
        return (
            <div className="header">
                <div className="bounds">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    { authUser ?
                        <React.Fragment>
                             <span>Welcome, {authUser.user[0].firstName}!</span>
                                    {/* display authenticed user */}
                            <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                       :
                       <React.Fragment>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/signin">Sign In</Link>
                       </React.Fragment>
                    }
                </nav>
                </div>
                <hr />
            </div>
        )
    }
};



