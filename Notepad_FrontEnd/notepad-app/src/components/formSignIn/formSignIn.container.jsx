import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors';
import  WithSpinner from '../withSpinner/withSpinner.component';
import FormSignIn from './formSignIn.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const FormSignInContainer = connect(mapStateToProps)(WithSpinner(FormSignIn, '90vh'));

export default FormSignInContainer;