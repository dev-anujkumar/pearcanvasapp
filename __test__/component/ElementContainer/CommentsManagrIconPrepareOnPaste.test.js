import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { prepareCommentsManagerIcon } from '../../../src/component/ElementContainer/CommentsManagrIconPrepareOnPaste';
import * as slateWrapperConstants from "../../../src/component/SlateWrapper/SlateWrapperConstants";
import { createStore } from 'redux';
import { getShowhideChildUrns } from "../../../src/constants/utility";

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

let type1 = slateWrapperConstants.WORKED_EXAMPLE;
let commentEntity2 = "urn:pearson:work:23093f93-95ed-48fa-af24-ee4efe557c6a"
let commentOnEntity = "urn:pearson:work:23093f93-95ed-48fa-af24-ee4efe557c6a"
let elmUrn1 = {
    some: function(commentEntity2) {
        return commentOnEntity == commentEntity2
    }
}

let type2 = slateWrapperConstants.SECTION_BREAK;
let createdElementData2 = {
    contents: {
        bodymatter: [1, 2, 3, 4, 5]
    }
}
let elmUrn2 = [];

let type4 = slateWrapperConstants.TEXT;
let elmUrn4 = [];
let createdElementData4 = {
    id: 1
};

let type5 = slateWrapperConstants.MULTI_COLUMN;
const arr5 = ["show","hide"];
const elmUrn5 = [];
let createdElementData5 = {
    groupeddata: {
        bodymatter: [
            {
                groupdata: {
                    bodymatter: [{type: "ELEMENT_ASIDE"}, {type: "SHOW_HIDE"}, {type: "different"}]
            }
        }
        ]
    },
    type: "MULTI_COLUMN"
};

let type6 = slateWrapperConstants.SHOW_HIDE;
const elmUrn6 = [];
let createdElementData6 = {
    interactivedata: "data"
};   

let type7 = slateWrapperConstants.POP_UP;
const elmUrn7 = [];
let createdElementData7 = {
    popupdata: {
        postertextobject: [{id : 1}],
        bodymatter: [{id : 1}]
    }
};   


describe('prepareCommentsManagerIcon cases --', () => {

    it('WORKED_EXAMPLE', () => {
        prepareCommentsManagerIcon(type1, "", elmUrn1, allComments);
    
    });
    it('SECTION_BREAK', () => {
        prepareCommentsManagerIcon(type2, createdElementData2, elmUrn2, allComments);
    
    });
    it('TEXT', () => {
        prepareCommentsManagerIcon(type4, createdElementData4, elmUrn4, allComments);
    
    });
    it('MULTI_COLUMN', () => {
        prepareCommentsManagerIcon(type5, createdElementData5, elmUrn5, allComments);
    
    });
    it('SHOW_HIDE', () => {
        prepareCommentsManagerIcon(type6, createdElementData6, elmUrn6, allComments);
    
    });
    it('POP_UP', () => {
        prepareCommentsManagerIcon(type7, createdElementData7, elmUrn7, allComments);
    
    });

}); 