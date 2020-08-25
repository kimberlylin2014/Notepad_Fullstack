import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const FormInput = ({onChange, name, type, placeholder}) => {
    return(
        <div className='FormInput'>
            <br/>
            <FormGroup>
                <Input type={type} name={name} onChange={onChange} placeholder={placeholder} />
            </FormGroup>
        </div>
    )
}

export default FormInput