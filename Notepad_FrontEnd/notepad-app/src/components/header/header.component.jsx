import React, { useState } from 'react';
import './header.styles.scss';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logOutUser } from '../../redux/user/user.actions'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect'

const Header = ({logOutUser, history, currentUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='Header'>
      <Navbar color="dark" dark expand="md" >
        <div className='container'>
          <NavbarBrand><span role='img' aria-label='brand' className='notepad-icon'>&#9997;</span>Notepad</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  {currentUser ?  <NavLink className='logout' onClick={() => {
                    logOutUser();
                    history.push('/')
                  }}>Log Out</NavLink> : ""}
              
              </NavItem>

            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: () => dispatch(logOutUser())
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));