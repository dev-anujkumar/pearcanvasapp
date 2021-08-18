import React  from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import './CommentMention.css';

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
          className="mentions"
          markup="@*__display__*"
          allowSuggestionsAboveCursor={false}
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

