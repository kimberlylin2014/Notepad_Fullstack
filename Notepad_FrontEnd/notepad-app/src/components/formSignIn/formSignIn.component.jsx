import React from 'react';
import './formSignIn.styles.scss';
import FormInput from '../formInput/formInput.component';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { signInUserStart, clearUserFormError } from '../../redux/user/user.actions'
import ValidationMessage from '../validationMessage/validationMessage.component';
import { selectUserErrorMessage } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect'; 
import { withRouter } from 'react-router-dom';

class FormSignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
        const { email, password } = this.state;
        const { signInUserStart } = this.props;
        const finalEmail = email + this.state.emailDomain;
        const registerInfo = {
            email: finalEmail,
            password
        }
        signInUserStart(registerInfo);
    }

    handleClickRouterLink() {
        const { clearUserFormError, history } = this.props;
        history.push('/register')
        clearUserFormError();
    }

    render() {
        const { userErrorMessage } = this.props;
        return (
            <div className='FormSignIn'>
                <h3 className='mb-4'>Sign In</h3>
                <Form>
                    <InputGroup>
                        <Input placeholder="new username" onChange={this.handleOnChange} name='email' />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>{this.state.emailDomain}</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormInput
                        name='password'
                        type='password'
                        onChange={this.handleOnChange}
                        placeholder='password'
                    />
                    {userErrorMessage ? 
                    (<ValidationMessage color='#ec0101'>
                         <p>{userErrorMessage}</p> 
                    </ValidationMessage>) : ""}
                    <Button color="secondary" className='mr-2' onClick={this.handleOnSubmit}>Sign In</Button>
                    <Button color="primary" onClick={this.handleClickRouterLink}>Register</Button>
                </ Form>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInUserStart: (credentials) => dispatch(signInUserStart(credentials)),
        clearUserFormError: () => dispatch(clearUserFormError())
    }
}

const mapStateToProps = createStructuredSelector({
    userErrorMessage: selectUserErrorMessage
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSignIn));