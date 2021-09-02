import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useDispatch } from 'react-redux';
import { getProjectUsers } from '../CommentsPanel/CommentsPanel_Action';
import './CommentMention.css'

const CommentMention = (props) => {
  const dispatch = useDispatch();
  const onCommentChange = (event, value) => {
    if (!props.readOnly) {
      props.handleCommentChange(value);
    }

  }

  const userMentionData = props.projectUsers.map(myUser => ({
    id: myUser.userId,
    display: `@${myUser.lastName}, ${myUser.firstName}`
  }));

  const getUsers = () => {
    // length is 0 if users clicks view in cypress 
    // from comments manager
    if(props.projectUsers.length === 0) {
      dispatch(getProjectUsers());
    }
  }

  
  const isEditableMode = `${props.isEditMode ? 'edit-mode reply-mention' : 'reply-mention'}`
    return (
      <div className="comment-mentions">
        <MentionsInput
          onFocus={getUsers}
          readOnly={props.readOnly}
          value={props.comment}
          onChange={onCommentChange}
          placeholder="Type something"
          className={`${props.readOnly ? 'no-border' : 'mentions'} ${props.isAddComment ? 'comment-mention' : isEditableMode }`}
          markup="@__display__(__id__)"
          allowSuggestionsAboveCursor={props.isAddComment ? false : true}
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
      </div>
    );
}

export default CommentMention