import React from 'react';
import { Spinner } from 'reactstrap';
import './withSpinner.styles.scss';

const WithSpinner = (WrappedComponent, height) => {
    const componentWithSpinner = ({isLoading, ...props}) => {
        return isLoading ? (
            <div className='PageWithSpinner' style={{height: height}}>
                <Spinner style={{ width: '5rem', height: '5rem' }} color="dark" />
            </div>
        ) : (
            <WrappedComponent {...props}/>
        )
    }
    return componentWithSpinner;
}

export default WithSpinner;