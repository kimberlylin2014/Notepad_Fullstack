import React, {lazy, Suspense} from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'
import { connect } from 'react-redux';

// Components
// import FormRegisterContainer from './components/formRegister/formRegister.container';
// import HomePage from './pages/homePage/homePage.component';
// import FormSignInContainer from './components/formSignIn/formSignIn.container';
import Header from './components/header/header.component';
import SpinnerComponent from './components/spinnerComponent/spinnerComponent.component';
import ErrorBoundary from './components/errorBoundary/errorBoundary.component';
const HomePage = lazy(() => import('./pages/homePage/homePage.component'))
// const FormSignInContainer = lazy(() => import('./components/formSignIn/formSignIn.container'))
const SignInContainer = lazy(() => import('./components/signIn/signIn.container'))
const RegisterContainer = lazy(()=> import('./components/register/register.container'))

class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    return (
      <div className="App">
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<SpinnerComponent />}>
              <Route exact path='/register' render={(props) => {
                return currentUser ? <Redirect to='/'/>  : <RegisterContainer {...props} />
              }}/>
              <Route exact path='/'render={() => {
                return currentUser ? <HomePage /> : <Redirect to='/register' />
              }} />
              <Route exact path='/signIn'render={(props) => {
                return currentUser ?  <Redirect to='/'/>  : <SignInContainer {...props} />
              }} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(App);
