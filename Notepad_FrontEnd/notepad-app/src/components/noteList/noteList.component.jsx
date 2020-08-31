import React from 'react';
import './noteList.styles.scss';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectUserPosts } from '../../redux/posts/post.selectors'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserPostsStart } from '../../redux/posts/post.actions';
import NoteCard from '../../components/noteCard/noteCard.component';

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
        let {userPosts, currentUser : {name}} = this.props;
        name = name[0].toUpperCase() + name.slice(1);
        const listHeader = userPosts.length === 0 ? "Add A Note!" : `${name}'s Notes`
        return(
            <div className='NoteList'>
                <h2>{listHeader}</h2>
                <div className='container'>
                    <div className='row'>
                        {userPosts ? userPosts.map(data =>  {
                               return <div key={data.id} className='col-md-4 col-6 eachRow' >
                                        <NoteCard postData={data}/>
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