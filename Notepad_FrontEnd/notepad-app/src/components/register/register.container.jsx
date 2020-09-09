import  { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading} from '../../redux/user/user.selectors';
import WithSpinner from '../withSpinner/withSpinner.component';
import Register from './register.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const RegisterContainer = connect(mapStateToProps)(WithSpinner(Register, '90vh'));

export default RegisterContainer;