import { combineReducers } from 'redux'
import CategoryReducer from './CategoryReducer'
import PostReducer from './PostReducer'
import SortReducer from './SortReducer'
import CommentReducer from './CommentReducer'

export default combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  sort: SortReducer,
  comments: CommentReducer,
})