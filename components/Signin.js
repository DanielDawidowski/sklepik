import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';


const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
        }
    }
`


class Signin extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    saveToState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Mutation 
                mutation={SIGNIN_MUTATION} 
                variables={this.state}
                refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
                >
                {(signin, { error, loading }) => {
                    return(
                        <form method='POST' onSubmit={async e => {
                            e.preventDefault();
                            const res = await signin();
                            // console.log(res);
                            this.setState({ name: '', email: '', password: ''});
                            Router.push('/events')
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign In</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email
                                    <input type="email" name="email" value={this.state.email} onChange={this.saveToState} />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input type="password" name="password"  value={this.state.password} onChange={this.saveToState} />
                                </label>
                                <button type='submit'>Sign In</button>
                            </fieldset>
                        </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default Signin;
export { SIGNIN_MUTATION };