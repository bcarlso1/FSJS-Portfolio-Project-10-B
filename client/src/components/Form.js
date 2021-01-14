
import React from 'react';

export default (props) => {
    const { 
        cancel,
        elements, 
        errors,
        submit
    } = props;


    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <button className="button" type="submit">Submit</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2> Validation Error</h2>
                <div>{ errors } </div>
            </div>
        );
    }

    return errorsDisplay;
}
