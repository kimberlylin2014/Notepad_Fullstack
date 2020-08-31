import React from 'react';
import './formRegister.styles.scss';
import FormInput from '../formInput/formInput.component';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUserStart, clearUserFormError } from '../../redux/user/user.actions';
import ValidationMessage from '../validationMessage/validationMessage.component';
import  { selectUserErrorMessage } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

class FormRegister extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            emailDomain: '@notepad.com'
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleClickRouterLink = this.handleClickRouterLink.bind(this);
    }

    handleOnChange(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const { email, password, name } = this.state;
        const { registerUserStart } = this.props;
        const finalEmail = email + this.state.emailDomain;
        const registerInfo = {
            name,
            email: finalEmail,
            password
        }
        registerUserStart(registerInfo);
    }

    handleClickRouterLink() {
        const { clearUserFormError, history } = this.props;
        history.push('/signin');
        clearUserFormError();
    }

    render() {
        const { userErrorMessage } = this.props;
        return (
            <div className='FormRegister'>
                <h3>Register</h3>
                <Form>
                    <FormInput
                        label='Name'
                        name='name'
                        type='text'
                        onChange={this.handleOnChange}
                        placeholder='Name'
                    />
                    <InputGroup>
                        <Input placeholder="username" onChange={this.handleOnChange} name='email' />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>{this.state.emailDomain}</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormInput
                        // label='Create Password'
                        name='password'
                        type='password'
                        onChange={this.handleOnChange}
                        placeholder='Create Password'
                    />
                    {userErrorMessage ? 
                    (<ValidationMessage color='#ec0101'>
                         <p className='mb-3'>{userErrorMessage}</p> 
                    </ValidationMessage>) : ""}
                    {userErrorMessage === "Please Check Form Requirements" ? 
                    (<ValidationMessage color='#40a8c4'>
                         <p className='m-0'>Name needs a minimum of 2 characters.</p> 
                         <p>Username and Password need a minimum of 5 characters.</p> 
                    </ValidationMessage>) : ""}
                    <Button color="secondary" className='mr-2' onClick={this.handleOnSubmit}>Register</Button>
                    <Button color="primary" onClick={this.handleClickRouterLink}>Sign In</Button>
                </ Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserStart: (credentials) => dispatch(registerUserStart(credentials)),
        clearUserFormError: () => dispatch(clearUserFormError())
    }
}

const mapStateToProps =  createStructuredSelector({
    userErrorMessage: selectUserErrorMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormRegister));