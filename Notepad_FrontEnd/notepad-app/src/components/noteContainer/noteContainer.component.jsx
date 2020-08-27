import React from 'react';
import './noteContainer.styles.scss';
import { Button } from 'reactstrap';
import EditNoteModal from '../editNoteModal/editNoteModal.component';
import  {selectCurrentUser} from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deletePostStart } from '../../redux/posts/post.actions'

const NoteContainer = ({postData, currentUser, deletePostStart}) => {
    const {id} = postData;
    return (
        <div className='NoteContainer'>
            <div className='header'>
                <EditNoteModal buttonLabel='Edit' postData={postData}/>
                <Button color="secondary" onClick={() => {
                    deletePostStart({currentUser, postData})
                }}>Delete</Button>
            </div>
            <p>{postData.post}</p>
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