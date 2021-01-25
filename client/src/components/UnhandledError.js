import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => (

    // Display for 500 errors
    <div>
        <h1>Error</h1>
        <p>Sorry! We just encountered an unexpected error.</p>
        <Link href="/">Back to Home</Link>
    </div>
 
);

export default UnhandledError;