import React from 'react';
import './homePage.styles.scss';
import NoteList from '../../components/noteList/noteList.component';
import CreateNote from '../../components/createNote/createNote.component';


import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserPosts } from '../../redux/posts/post.selectors'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserPostsStart, createPostStart, deletePostStart } from '../../redux/posts/post.actions';

const HomePage = (props) => {
    return(
        <div className='HomePage'>
            <CreateNote {...props}/>
            <NoteList {...props}/>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userPosts: selectUserPosts
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUserPostsStart: (userID) => dispatch(getUserPostsStart(userID)),
        createPostStart: (text) => dispatch(createPostStart(text)),
        deletePostStart: (postData) => dispatch(deletePostStart(postData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

