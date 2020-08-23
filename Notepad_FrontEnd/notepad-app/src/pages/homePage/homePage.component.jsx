import React from 'react';
import './homePage.styles.scss';
import NoteList from '../../components/noteList/noteList.component';
import CreateNote from '../../components/createNote/createNote.component';

const HomePage = () => {
    return(
        <div className='HomePage'>
            <CreateNote />
            <br/>
            <NoteList />
        </div>
    )
}

export default HomePage;