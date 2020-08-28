import React from 'react';
import './noteContainer.styles.scss';
import EditNoteModal from '../editNoteModal/editNoteModal.component';
import  {selectCurrentUser} from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deletePostStart } from '../../redux/posts/post.actions'

const NoteContainer = ({postData, currentUser, deletePostStart}) => {

    return (
        <div className='NoteContainer'>
            <div className='header'>
                <EditNoteModal buttonLabel='Edit' postData={postData}/>
                <div className='delete-icon' onClick={() => {
                    deletePostStart({currentUser, postData})
                }}>
                     &#10006;
                </div>
            </div>
            <div className='text-section'>
                <p className='note-text'>{postData.post}</p>
                <p className='timestamp'>Created: {postData.created}</p>
            </div>
           
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => {
    return {
        deletePostStart: (postData) => dispatch(deletePostStart(postData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);