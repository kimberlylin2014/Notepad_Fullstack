import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsUserPostLoading } from '../../redux/posts/post.selectors';
import NoteCard from './noteCard.component';
import WithSpinner from '../withSpinner/withSpinner.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsUserPostLoading
})

const NoteCardContainer = connect(mapStateToProps)(WithSpinner(NoteCard, '200px'))

export default NoteCardContainer;