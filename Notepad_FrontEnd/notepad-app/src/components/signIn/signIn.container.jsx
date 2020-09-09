import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import  WithSpinner from '../withSpinner/withSpinner.component';
import SignIn from './signIn.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const SignInContainer = connect(mapStateToProps)(WithSpinner(SignIn, '90vh'));

export default SignInContainer;