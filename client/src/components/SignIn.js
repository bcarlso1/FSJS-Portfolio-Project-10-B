import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class SignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    render() {

        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <div class="bounds">
                <div class="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email"
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password"
                                />
                            </React.Fragment>
                        )}
                    />
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )

    }


    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value  // why this syntax
            };
        });
    }

    submit = () => {
            const { context } = this.props;
            const { emailAddress, password } = this.state;
            const { from } = this.props.location.state || { from: { pathname: '/' }}
            context.actions.signIn(emailAddress, password)
            .then( user => {
                if(user === null) {
                    this.setState(() => {
                        return { errors: [ 'Failed log-in' ]};
                    })
                } else {
                    this.props.history.push(from);
                    console.log(`Successful log-n ${emailAddress}!`)
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/notfound');
            })
    }

    cancel = () => {
        this.props.history.push('/');
    }

}

