import React, { useState } from 'react';
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
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Notepad</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                {currentUser ?  <NavLink onClick={() => {
                  logOutUser();
                  history.push('/')
                }}>Log Out</NavLink> : ""}
             
            </NavItem>

          </Nav>
        </Collapse>
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