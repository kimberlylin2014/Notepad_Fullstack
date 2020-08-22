import React from 'react';
import { Spinner } from 'reactstrap';
import './withSpinner.styles.scss';

const WithSpinner = (WrappedComponent) => {
    const componentWithSpinner = ({isLoading}) => {
        return isLoading ? (
            <div className='PageWithSpinner'>
                <Spinner style={{ width: '5rem', height: '5rem' }} color="dark" />
            </div>
        ) : (
            <WrappedComponent />
        )
    }
    return componentWithSpinner;
}

export default WithSpinner;