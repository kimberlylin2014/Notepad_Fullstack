import React from 'react';
import './noteContainer.styles.scss';
import { Button } from 'reactstrap';
import EditNoteModal from '../editNoteModal/editNoteModal.component';

const NoteContainer = ({postData}) => {
    console.log(postData)
    return (
        <div className='NoteContainer'>
            <div className='header'>
                <EditNoteModal buttonLabel='Edit' postData={postData}/>
                <Button color="secondary">Delete</Button>
            </div>
            <p>{postData.post}</p>
        </div>
    )
}

export default NoteContainer;