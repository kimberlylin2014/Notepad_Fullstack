import React from 'react';
import './validationMessage.styles.scss';

const ValidationMessage = ({children, color}) => {
    return(
        <div className='ValidationMessage' style={{color: color}}>
            {children}
        </div>
    )
}

export default ValidationMessage;