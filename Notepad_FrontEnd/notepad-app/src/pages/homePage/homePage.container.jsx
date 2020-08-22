import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserLoading } from '../../redux/user/user.selectors'
import HomePage from './homePage.component';
import WithSpinner from '../../components/withSpinner/withSpinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserLoading
})

const HomePageContainer = connect(mapStateToProps)(WithSpinner(HomePage));

export default HomePageContainer;