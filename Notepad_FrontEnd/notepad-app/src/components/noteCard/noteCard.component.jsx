import React from 'react';
import './noteCard.styles.scss';
import EditNoteModal from '../editNoteModal/editNoteModal.component';

const NoteCard = ({postData, currentUser, deletePostStart}) => {
    return (
        <div className='NoteCard'>
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
                <p className='timestamp'> {postData.modified ? <span className='modified'>Modified</span> : <span className='created'>Created:</span> } &nbsp;{postData.created}</p>
            </div>
           
        </div>
    )
}

export default NoteCard;