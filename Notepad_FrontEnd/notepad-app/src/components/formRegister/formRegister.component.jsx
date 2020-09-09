import React from 'react';
import './formRegister.styles.scss';
import FormInput from '../formInput/formInput.component';
import ValidationMessage from '../validationMessage/validationMessage.component';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { registerUserFailure } from '../../redux/user/user.actions';

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
        const { registerUserStart, registerUserFailure } = this.props;
        const finalEmail = email + this.state.emailDomain;
        if (name.length >= 2 || email.length >= 17 || password.length >= 5){
            const registerInfo = {
                name,
                email: finalEmail,
                password
            }
            registerUserStart(registerInfo);
        } else {
            registerUserFailure('Please Check Form Requirements')
        }
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

export default FormRegister;