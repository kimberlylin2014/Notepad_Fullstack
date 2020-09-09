import React from 'react';
import './noteList.styles.scss';
import NoteCard from '../../components/noteCard/noteCard.component';

class NoteList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { currentUser, getUserPostsStart } = this.props;
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
                <h2 id='list-header'>{listHeader}</h2>
                <div className='container'>
                    <div className='row' id='list-row'>
                        {userPosts.length > 0 ? userPosts.map(postData =>  {
                               return <div key={postData.id} className='col-md-4 col-6 eachRow' >
                                        {console.log(postData)}
                                        <NoteCard {...this.props} postData={postData}/>
                                      </div>
                         }) : ''}
                    </div>
                </div>      
            </div>
        )
    }
}

export default NoteList;