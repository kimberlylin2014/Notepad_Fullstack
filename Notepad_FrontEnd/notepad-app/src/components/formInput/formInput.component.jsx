import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const FormInput = ({label, onChange, name, type}) => {
    return(
        <div className='FormInput'>
            <br/>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input type={type} name={name} id={name} onChange={onChange} />
            </FormGroup>
        </div>
    )
}

export default FormInput