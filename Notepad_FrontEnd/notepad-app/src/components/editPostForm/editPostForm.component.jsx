import React from 'react';
import { Form, FormGroup, Input, Button} from 'reactstrap';
import { updatePostStart } from '../../redux/posts/post.actions';
import { connect } from 'react-redux';
import { selectCurrentUser  } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

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
        const { updatePostStart, currentUser} = this.props;
        const newPostData = {
            text,
            postID,
            userID: currentUser.id
        }
        updatePostStart(newPostData);
    }

    render() {
        const {toggle} = this.props;
        return(
            <div className='EditPostForm'>
                <Form>
                    <FormGroup>
                        <Input type="textarea" name="text" onChange={this.handleOnChange} value={this.state.text}/>
                    </FormGroup>

                </Form>
                <Button color="info" onClick={()=> {
                    this.handleUpdateClick()
                    toggle()
                }} >Update</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostStart: (newPostData) => dispatch(updatePostStart(newPostData))
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);