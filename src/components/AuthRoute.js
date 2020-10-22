import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Container from '../modules/usuarios/Container';

export default function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                props =>
                    sessionStorage.getItem("token") ? (
                        <Container><Component {...props} /></Container>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    );
};
