import React from 'react';
import './noteList.styles.scss';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserPosts } from '../../redux/posts/post.selectors'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserPostsStart } from '../../redux/posts/post.actions';


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
        const {userPosts} = this.props;
        return(
            <div className='NoteList'>
                <h1>the list</h1>
                {userPosts ? userPosts.map(data => <p>{data.post}</p>) : ''}
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