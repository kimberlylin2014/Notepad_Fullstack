import React from 'react';
import { connect } from 'react-redux';
import { registerUserStart, clearUserFormError, registerUserFailure } from '../../redux/user/user.actions';

import  { selectUserErrorMessage } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import FormRegister from '../formRegister/formRegister.component';

const Register = (props) => {
    return(
        <FormRegister {...props}/>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserStart: (credentials) => dispatch(registerUserStart(credentials)),
        clearUserFormError: () => dispatch(clearUserFormError()),
        registerUserFailure: (error) => dispatch(registerUserFailure(error))
    }
}

const mapStateToProps =  createStructuredSelector({
    userErrorMessage: selectUserErrorMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));