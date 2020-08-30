import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'
import { connect } from 'react-redux';

// Components
import FormRegisterContainer from './components/formRegister/formRegister.container';
import Header from './components/header/header.component';
import HomePage from './pages/homePage/homePage.component';
import FormSignInContainer from './components/formSignIn/formSignIn.container'

class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    console.log(currentUser)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/register' render={(props) => {
            return currentUser ? <Redirect to='/'/>  : <FormRegisterContainer {...props} />
          }}/>
          <Route exact path='/'render={() => {
            return currentUser ? <HomePage /> : <Redirect to='/register' />
          }} />
          <Route exact path='/signin'render={(props) => {
            return currentUser ? <Redirect to='/'/>  : <FormSignInContainer {...props}/>
          }} />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(App);
