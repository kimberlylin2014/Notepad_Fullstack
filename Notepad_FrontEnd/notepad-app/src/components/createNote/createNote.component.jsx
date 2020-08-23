import React from 'react';
import './createNote.styles.scss';
import CreateNoteModal from '../createNoteModal/createNoteModal.component';
import { createPostStart } from '../../redux/posts/post.actions';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import { select } from 'redux-saga/effects';
class CreateNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postText: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
         [name]: value
        })
    }
    handleSubmit() {
        const { createPostStart, currentUser } = this.props;
        const {postText} = this.state;
        const text = {
            postText: postText,
            currentUserID: currentUser.id
        }
        console.log(text)
        createPostStart(text);
    }
    render() {
        return(
            <div className='CreateNote'>
                <CreateNoteModal buttonLabel='Create' onChange={this.handleOnChange} handleSubmit={this.handleSubmit}/>
            </div>
        )
    } 
}

const mapDisptachToProps = (dispatch) => {
    return {
        createPostStart: (text) => dispatch(createPostStart(text))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDisptachToProps)(CreateNote);