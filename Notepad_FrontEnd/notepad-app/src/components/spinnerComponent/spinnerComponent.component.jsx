import React from 'react';
import { Spinner } from 'reactstrap';
import './spinnerComponent.styles.scss';

const SpinnerComponent = ({height}) => {
    return(
        <div className='SpinnerComponent' style={{height: height}}>
            <Spinner style={{ width: '5rem', height: '5rem' }} color="dark" />
        </div>
    )
}

export default SpinnerComponent;