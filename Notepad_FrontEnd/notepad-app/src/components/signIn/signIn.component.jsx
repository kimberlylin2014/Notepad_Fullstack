import React from 'react';
import { connect } from 'react-redux';
import { signInUserStart, clearUserFormError } from '../../redux/user/user.actions';
import { selectUserErrorMessage } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect'; 
import { withRouter } from 'react-router-dom';
import SignInForm from '../formSignIn/formSignIn.component';

const SignIn = (props) => {
    return(
        <div>
            <SignInForm {...props}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInUserStart: (credentials) => dispatch(signInUserStart(credentials)),
        clearUserFormError: () => dispatch(clearUserFormError())
    }
}

const mapStateToProps = createStructuredSelector({
    userErrorMessage: selectUserErrorMessage
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));