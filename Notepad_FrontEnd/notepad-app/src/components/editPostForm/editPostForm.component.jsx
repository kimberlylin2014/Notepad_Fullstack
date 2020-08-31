import React from 'react';
import { Form, FormGroup, Input, Button} from 'reactstrap';
import { updatePostStart, updatePostFailure } from '../../redux/posts/post.actions';
import { connect } from 'react-redux';
import { selectCurrentUser  } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectPostError } from '../../redux/posts/post.selectors'

class EditPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.postData.post,
            postID: props.postData.id
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }

    handleOnChange(e) {
        const {value, name} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleUpdateClick() {
        const { text, postID } = this.state;
        const { updatePostStart, updatePostFailure, currentUser, postData, toggle} = this.props;
        console.log(postData.post)
        if(postData.post !== this.state.text) {
            const newPostData = {
                text,
                postID,
                userID: currentUser.id
            }
            toggle()
            updatePostStart(newPostData);
        } else {
            updatePostFailure('No changes were detected!')
            console.log('nothing to update')
        }
    }
    
    render() {
        const { postError } = this.props;
        let warning;
        if(postError) {
            warning = 'You didn\'t make any changes'
        }
        return(
            <div className='EditPostForm'>
                <Form>
                    <FormGroup>
                        <Input type="textarea" name="text" onChange={this.handleOnChange} value={this.state.text}/>
                    </FormGroup>
                </Form>
                <p style={{color: '#5eaaa8'}}>{warning}</p>
                <Button color="info" onClick={()=> {
                    this.handleUpdateClick()
                }} >Update</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostStart: (newPostData) => dispatch(updatePostStart(newPostData)),
        updatePostFailure: (errorMessage) => dispatch(updatePostFailure(errorMessage))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    postError: selectPostError
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);