import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import  withSpinner from '../withSpinner/withSpinner.component';
import FormSignIn from './formSignIn.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const FormSignInContainer = connect(mapStateToProps)(withSpinner(FormSignIn));

export default FormSignInContainer;