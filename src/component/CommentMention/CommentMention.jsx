import React  from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from "./defaultStyle.js";
import replyDefaultStyle from './replyDefaultStyle.js';

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
          markup="@[__display__](__type__:__id__)"
          allowSuggestionsAboveCursor={props.isAddComment ? false : true}
          style={props.isAddComment ? defaultStyle : replyDefaultStyle}
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
      </div>
    );
  }

export default CommentMention

