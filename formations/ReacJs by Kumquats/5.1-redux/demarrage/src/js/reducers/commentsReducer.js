import { COMMENT_LIST_COMPLETE } from "../actions";

export default function commentsReducer(state = [], action) {
  if (action.type == COMMENT_LIST_COMPLETE) {
    return action.comments;
  }
  return state;
}
