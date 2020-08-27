import React from 'react';
import './noteList.styles.scss';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserPosts } from '../../redux/posts/post.selectors'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserPostsStart } from '../../redux/posts/post.actions';
import NoteContainer from '../../components/noteContainer/noteContainer.component';

class NoteList extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { currentUser, getUserPostsStart } = this.props;
        getUserPostsStart({currentUserID: currentUser.id})
    }
    render() {
        console.log('note list displaying posts')
        const {userPosts, currentUser} = this.props;
        console.log(userPosts)
        return(
            <div className='NoteList'>
                <h2>{currentUser.name}'s Notes</h2>
                 {userPosts ? userPosts.map(data =>  <NoteContainer key={data.id} postData={data}/>) : ''}
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userPosts: selectUserPosts
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUserPostsStart: (userID) => dispatch(getUserPostsStart(userID))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteList);