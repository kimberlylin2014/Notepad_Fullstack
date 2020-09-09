import { shallow } from 'enzyme';
import React from 'react';
import NoteList from './noteList.component';

it('Testing Note List Component when user has more than one comments', () => {
    const mockUserPosts = [{
        created: "Sun 9/6/20 1:43am",
        id: 203,
        modified: true,
        post: "1"
    }]
    const mockUser ={id: 75, name: "kimberly", email: "kimberly@notepad.com", joined: "2020-08-31T03:19:15.374Z", comments: ["1"]} 
    const mockGetUserPostsStart = function getUserPosts() {}
    expect(shallow(<NoteList currentUser={mockUser} userPosts={mockUserPosts} getUserPostsStart={mockGetUserPostsStart}/>)).toMatchSnapshot();
})

it('Testing Note List Component when user has zero comments', () => {
    const mockUserPosts = []
    const mockUser ={id: 75, name: "kimberly", email: "kimberly@notepad.com", joined: "2020-08-31T03:19:15.374Z", comments: ["1"]} 
    const mockGetUserPostsStart = function getUserPosts() {}
    const wrapper = shallow(<NoteList currentUser={mockUser} userPosts={mockUserPosts} getUserPostsStart={mockGetUserPostsStart}/>);
    expect(wrapper.find('[id="list-row"]').text()).toEqual("");
})

it('Testing Note List Component when user has zero comments, header should be Add New Note', () => {
    const mockUserPosts = []
    const mockUser ={id: 75, name: "kimberly", email: "kimberly@notepad.com", joined: "2020-08-31T03:19:15.374Z", comments: ["1"]} 
    const mockGetUserPostsStart = function getUserPosts() {}
    const wrapper = shallow(<NoteList currentUser={mockUser} userPosts={mockUserPosts} getUserPostsStart={mockGetUserPostsStart}/>);
    expect(wrapper.find('[id="list-header"]').text()).toEqual("Add A Note!");
})

it('Testing Note List Component when user has zero comments, header should be {UserName}s Note', () => {
    const mockUserPosts = [{
        created: "Sun 9/6/20 1:43am",
        id: 203,
        modified: true,
        post: "1"
    }]
    const mockUser ={id: 75, name: "kimberly", email: "kimberly@notepad.com", joined: "2020-08-31T03:19:15.374Z", comments: ["1"]} 
    const userName = mockUser.name[0].toUpperCase() + mockUser.name.slice(1);
    const mockGetUserPostsStart = function getUserPosts() {}
    const wrapper = shallow(<NoteList currentUser={mockUser} userPosts={mockUserPosts} getUserPostsStart={mockGetUserPostsStart}/>);
    expect(wrapper.find('[id="list-header"]').text()).toEqual(`${userName}'s Notes`);
})


it('Testing Note List Component when current user has zero comments', () => {
    const mockUserPosts = []
    const mockUser ={id: 75, name: "kimberly", email: "kimberly@notepad.com", joined: "2020-08-31T03:19:15.374Z", comments: []} 
    const mockGetUserPostsStart = function getUserPosts() {}
    const wrapper = shallow(<NoteList currentUser={mockUser} userPosts={mockUserPosts} getUserPostsStart={mockGetUserPostsStart}/>);
    expect(wrapper.find('[id="list-row"]').text()).toEqual("");
})

