import React  from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import './CommentMention.css'

const CommentMention = (props) => {
    
  const userMentionData = props.projectUsers.map(myUser => ({
      id: myUser.userId,
      display: `${myUser.firstName} ${myUser.lastName}`
    }));
  
    return (
      <div className="comment-mentions">
        <MentionsInput
          value={props.comment}
          onChange={(event) => props.handleCommentChange(event.target.value)}
          placeholder="Type..."
          className={`mentions ${props.isAddComment ? 'comment-mention' : 'reply-mention'}`}
          markup="@[__display__](__type__:__id__)"
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

