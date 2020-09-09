import React from 'react';
import FormRegister from './formRegister.component';
import { shallow } from 'enzyme';

describe("Form Register Tests", () => {
    const wrapper = shallow(<FormRegister />)
    it('Form Sign In SnapShot Test', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    it('Password Input should change value when OnChange is called', ()=> {
        const event = {
            target: {value: "hello", name: 'password'}
        }
        wrapper.find('[name="password"]').simulate("change", event)
        expect(wrapper.state('password')).toBe('hello')
    })

    it('Email Input should change value when OnChange is called', ()=> {
        const event = {
            target: {value: "hello", name: 'email'}
        }
        wrapper.find('[name="email"]').simulate("change", event)
        expect(wrapper.state('email')).toBe('hello')
    })

    it('Password Input should change value when OnChange is called', ()=> {
        const event = {
            target: {value: "hello", name: 'name'}
        }
        wrapper.find('[name="name"]').simulate("change", event)
        expect(wrapper.state('name')).toBe('hello')
    })

})