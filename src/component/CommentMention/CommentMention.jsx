import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import './CommentMention.css'

const CommentMention = (props) => {
  const onCommentChange = (event, value) => {
    if (!props.readOnly) {
      props.handleCommentChange(value);
    }

  }

  const userMentionData = props.projectUsers.map(myUser => ({
    id: myUser.userId,
    display: `@${myUser.lastName}, ${myUser.firstName}`
  }));

  
    return (
      <div className="comment-mentions">
        <MentionsInput
          readOnly={props.readOnly}
          value={props.comment}
          onChange={onCommentChange}
          placeholder="Type something"
          className={`${props.readOnly ? 'no-border' : 'mentions'} ${props.isAddComment ? 'comment-mention' : `${props.isEditMode ? 'edit-mode reply-mention' : 'reply-mention'}`}`}
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