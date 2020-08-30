import  { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading} from '../../redux/user/user.selectors';
import WithSpinner from '../withSpinner/withSpinner.component';
import FormRegister from './formRegister.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const FormRegisterContainer = connect(mapStateToProps)(WithSpinner(FormRegister, '90vh'));

export default FormRegisterContainer;