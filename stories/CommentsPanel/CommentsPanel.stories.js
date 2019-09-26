import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import CommentsPanel from '../../src/component/CommentsPanel/CommentsPanel';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import { comments, comment,commentWithoutReply } from '../../fixtures/commentPanelData';
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);

const commentsWithData = mockStore({
  commentsPanelReducer: {
    comments: comments,
    togglePanel: true,
    toggleReplyForm: true
  }
});
const commentsWithoutReply = mockStore({
  commentsPanelReducer: {
    comments: commentWithoutReply,
    togglePanel: true
  }
});
const commentsWithoutData = mockStore({
  commentsPanelReducer: {
    comments: [],
    togglePanel: true
  }
});


storiesOf('CommentsPanel', module)
  .addDecorator(withInfo)
  .add('Commnets Panel', () => <Provider store={commentsWithData}><CommentsPanel onClick={action('Add Comments with reply')} /></Provider>, { notes: "Add Comments" })
  .add('Without reply comment', () => <Provider store={commentsWithoutReply}><CommentsPanel togglePanel={true} onClick={action('Add Comments without reply')} /></Provider>, { notes: "Add Comments" })
  .add('Without no comment', () => <Provider store={commentsWithoutData}><CommentsPanel togglePanel={true} comments={null} onClick={action('Add Comments without reply')} /></Provider>, { notes: "Add Comments" })
