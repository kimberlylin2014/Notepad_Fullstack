import React from 'react';
import { shallow } from 'enzyme';
import NoteCard from './noteCard.component';

it('Test if Note Card component is rendering', () => {
    const mockPostData = {id: 207, post: "zxc", created: "Sun 9/6/20 5:24pm", modified: false}
    const wrapper = shallow(<NoteCard postData={mockPostData}/>);
    expect(wrapper).toMatchSnapshot()
})


it('Test if Note Card modified is true', () => {
    const mockPostData = {id: 207, post: "zxc", created: "Sun 9/6/20 5:24pm", modified: true}
    const wrapper = shallow(<NoteCard postData={mockPostData}/>);
    expect(wrapper.find('[className="modified"]').text()).toEqual(`Modified`)
})

it('Test if Note Card modified is false', () => {
    const mockPostData = {id: 207, post: "zxc", created: "Sun 9/6/20 5:24pm", modified: false}
    const wrapper = shallow(<NoteCard postData={mockPostData}/>);
    expect(wrapper.find('[className="created"]').text()).toEqual(`Created:`)
})

it('Test Note Card Click Event', () => {
    const mockPostData = {id: 207, post: "zxc", created: "Sun 9/6/20 5:24pm", modified: false}
    const mockFunction = jest.fn()
    const wrapper = shallow(<NoteCard postData={mockPostData} deletePostStart={mockFunction}/>);
    wrapper.find('[className="delete-icon"]').simulate('click');
    expect(mockFunction.mock.calls.length).toBe(1)
})