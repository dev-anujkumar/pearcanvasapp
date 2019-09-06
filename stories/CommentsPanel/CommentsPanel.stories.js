import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import CommentsPanel from '../../src/component/CommentsPanel/CommentsPanel';
import { Provider } from 'react-redux';
import store from  '../../src/appstore/store.js'

export const comments = [{
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "this is comment",
  "commentStatus": "OPEN",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [{
    "commentCreator": "c5test01",
    "commentDateTime": "2019-08-25T04:56:38.241Z",
    "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
    "commentString": "zxczcczz",
    "commentType": "commentReply"
  }],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
},
{
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "paragraph",
  "commentStatus": "Resolved",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [{
    "commentCreator": "c5test01",
    "commentDateTime": "2019-08-25T04:56:38.241Z",
    "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
    "commentString": "zxczcczz",
    "commentType": "commentReply"
  }],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
}
]
export const commentsWithoutReply = [
{
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "sadsa",
  "commentStatus": "Resolved",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
}
]

storiesOf('CommentsPanel', module)
   .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  //.addDecorator(withInfo)
  .add('Commnets Panel', () => <CommentsPanel comments = {comments} onClick={action('Add Comments with reply')} />, { notes: "Add Comments" })
  .add('Without reply comment' , () => <CommentsPanel comments = {commentsWithoutReply} onClick={action('Add Comments without reply')} />, { notes: "Add Comments" })
  .add('Without no comment' , () => <CommentsPanel comments = {null} onClick={action('Add Comments without reply')} />, { notes: "Add Comments" })
