import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'
import { connect } from 'react-redux';

// Components
import FormRegister from './components/formRegister/formRegister.component';
import Header from './components/header/header.component';
import HomePageContainer from './pages/homePage/homePage.container'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { currentUser } = this.props;
    let inSession;
    if(currentUser) {
      inSession = true;
    } else {
      inSession = false;
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/register' render={() => {
            return currentUser ? <Redirect to='/'/>  : <FormRegister  />
          }}/>
          <Route exact path='/'render={() => {
            return currentUser ? <HomePageContainer /> : <Redirect to='/register' />
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
