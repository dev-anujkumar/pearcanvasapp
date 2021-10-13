import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { prepareCommentsManagerIcon } from '../../../src/component/ElementContainer/CommentsManagrIconPrepareOnPaste';
import * as slateWrapperConstants from "../../../src/component/SlateWrapper/SlateWrapperConstants";
import { createStore } from 'redux';

// export function prepareCommentsManagerIcon() {
//     switch(type) {
//         case slateWrapperConstants.WORKED_EXAMPLE:
//     }
// }

const allComments = [
    {
        commentAssignee: "David,Metcalfe, David",
        commentCreator: "David,Metcalfe, David",
        commentDateTime: "2021-08-24T07:04:28.029Z",
        commentOnEntity: "urn:pearson:work:2ef5884a-17b4-47ed-a187-4cb2d1c40c75",
        commentStatus: "Open",
        commentString: "hi @Kira Thaler Marbit Kira(uthalki) jhaihapihahp; @Gangadharan, Hari Hari(ugangha) halkga;h;",
        commentType: "comment",
        commentUrn: "urn:pearson:comment:bb329a49-0cf4-4838-b893-6ba21211a002",
        entitySlateType: "section",
        entitySlateUrn: "urn:pearson:manifest:77a9e4a8-3cc3-4596-8614-fa143a217440",
        isCommentSelected: true
    },
    {
        commentAssignee: "David,Metcalfe, David",
        commentCreator: "David,Metcalfe, David",
        commentDateTime: "2021-08-12T09:53:16.423Z",
        commentOnEntity: "urn:pearson:work:23093f93-95ed-48fa-af24-ee4efe557c6a",
        commentReplyUrn: ["urn:pearson:comment:284a4f8b-9803-4647-b06c-3d66e9ac4776"],
        commentStatus: "Open",
        commentString: "@David,Metcalfe, David ('userId':'vmetcda') i amcomment2",
        commentType: "comment",
        commentUrn: "urn:pearson:comment:1943cd80-32fb-44fc-9a90-eeefeabda4b2",
        entitySlateType: "section",
        entitySlateUrn: "urn:pearson:manifest:d6dd3aad-7a7d-4996-8354-733be19235cc",
        isCommentSelected: true
    }]

let type1 = slateWrapperConstants.CONTAINER;


describe('prepareCommentsManagerIcon cases --', () => {
    it('WORKED_EXAMPLE', () => {
        expect(prepareCommentsManagerIcon(type1, "", "", allComments)).toBeCalled(1);
      });
});