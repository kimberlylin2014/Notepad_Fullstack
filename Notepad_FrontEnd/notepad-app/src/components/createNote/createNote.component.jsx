import React from 'react';
import './createNote.styles.scss';
import CreateNoteModal from '../createNoteModal/createNoteModal.component';

const CreateNote = () => {
    return(
        <div className='CreateNote'>
            <CreateNoteModal buttonLabel='Create'/>
        </div>
    )
}

export default CreateNote;