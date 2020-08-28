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
        console.log(currentUser)
        if(currentUser.comments) {
            getUserPostsStart({currentUserID: currentUser.id})
        }
        
    }

    render() {
        const {userPosts, currentUser} = this.props;
        return(
            <div className='NoteList'>
                  <h2>{currentUser.name}'s Notes</h2>
                <div className='container'>
                    <div className='row'>
                        {userPosts ? userPosts.map(data =>  {
                            console.log(data.id)
                               return <div key={data.id} className='col-md-4 col-6 eachRow' >
                                        <NoteContainer  postData={data}/>
                                      </div>
                         }) : ''}
                    </div>
                </div>      
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