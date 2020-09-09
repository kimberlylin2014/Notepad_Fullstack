import { shallow } from 'enzyme';
import React from 'react';
import CreateNote from './createNote.component';

it('expect to render Create Note component', ()=> {
    const mockButtonLabel = 'Create';
    expect(shallow(<CreateNote buttonLabel={mockButtonLabel}/>)).toMatchSnapshot();
})

it("correctly rendering OnClick",() => {
    const mockButtonLabel = 'Create';
    const wrapper = shallow(<CreateNote buttonLabel={mockButtonLabel}/>);
    wrapper.find('[id="createNote"]').simulate('onChange')
})


it("correctly rendering OnSubmit",() => {
    const mockButtonLabel = 'Create';
    const wrapper = shallow(<CreateNote buttonLabel={mockButtonLabel}/>);
    wrapper.find('[id="createNote"]').simulate('onSubmit')
})