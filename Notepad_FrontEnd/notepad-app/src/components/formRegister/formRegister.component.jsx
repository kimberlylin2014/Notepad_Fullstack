import React from 'react';
import './formRegister.styles.scss';
import FormInput from '../formInput/formInput.component';
import { Form, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUserStart } from '../../redux/user/user.actions';

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

    render() {
        return (
            <div className='FormRegister'>
                <h3>Register</h3>
                <Form>
                    <FormInput
                        label='Name'
                        name='name'
                        type='text'
                        onChange={this.handleOnChange}
                    />
                    <InputGroup>
                        <Input placeholder="new username" onChange={this.handleOnChange} name='email' />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>{this.state.emailDomain}</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <FormInput
                        label='Create Password'
                        name='password'
                        type='password'
                        onChange={this.handleOnChange}
                    />
                    <Button color="secondary" onClick={this.handleOnSubmit}>Register</Button>
                </ Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUserStart: (credentials) => dispatch(registerUserStart(credentials))
    }
}

export default connect(null, mapDispatchToProps)(FormRegister);