import  { shallow } from 'enzyme';
import React from 'react';
import ErrorPage from './errorPage.component';

it('expect to render Error Page', ()=> {
    expect(shallow(<ErrorPage />)).toMatchSnapshot()
})


