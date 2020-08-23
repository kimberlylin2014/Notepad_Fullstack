import React from 'react';
import './formSignIn.styles.scss';
import FormInput from '../formInput/formInput.component';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { signInUserStart } from '../../redux/user/user.actions'
import { Link } from 'react-router-dom';

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

    render() {
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
                    <Button color="secondary" onClick={this.handleOnSubmit}>Sign In</Button>
                    <Link to='/register'>Register</Link>
                </ Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInUserStart: (credentials) => dispatch(signInUserStart(credentials))
    }
}

export default connect(null, mapDispatchToProps)(FormSignIn);