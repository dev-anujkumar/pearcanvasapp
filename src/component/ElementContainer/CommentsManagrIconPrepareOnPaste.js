import { getShowhideChildUrns } from '../../constants/utility.js';
import * as slateWrapperConstants from "../SlateWrapper/SlateWrapperConstants"
import ElementConstants from '../ElementContainer/ElementConstants.js';
const { SHOW_HIDE, ELEMENT_ASIDE, MULTI_COLUMN } = ElementConstants;

/**
* @function showCommentsManagerAsideIcon
* @description Show comments manager icon in right side of element inside Asdie containers; Ex. - Aside:P
*/
function showCommentsManagerAsideIcon(element, elmUrn) {
    if(element?.type === ELEMENT_ASIDE) {
        element?.elementdata?.bodymatter?.map((item) => {
            if(item?.type === SHOW_HIDE) {
                showCommentsManagerIconInSH(item, elmUrn);
            } else
            if (item?.type === "manifest") {
                item?.contents?.bodymatter?.map((ele) => {
                    if(ele?.type === SHOW_HIDE) { /* Ex. -  WE:Body/SectionBreak:SH:P*/
                        showCommentsManagerIconInSH(ele, elmUrn);
                    } 
                    else { elmUrn.push(ele.id) } /* Ex. -  WE:Body/SectionBreak:P*/
                })
            } else {
                elmUrn.push(item.id) /* Ex. -  Aside/(WE:Head):P*/
            }
        })
    }
 return elmUrn
}

/**
* @function showCommentsManagerMultiColIcon
* @description Show comment's manager icon in right side of element inside containers; Ex. -  2C:P || 2C:Aside:P
*/
function showCommentsManagerMultiColIcon(element, elmUrn) {
    if(element?.type === MULTI_COLUMN) {
         element?.groupeddata?.bodymatter?.map(grpItem => {
            grpItem?.groupdata?.bodymatter?.map(item => {
                if(item?.type === ELEMENT_ASIDE) { /* Show Icon in 2C:Aside:Element */
                    showCommentsManagerAsideIcon(item, elmUrn);
                } else {
                    elmUrn.push(item.id); /* Show Icon in 2C:Element */
                }
            })
        })
    }
    return elmUrn
}

/**
* @function showCommentsManagerIconInSH
* @description Show comment's manager icon in right side of element inside Shohide; Ex. -  SH:P 
*/
function showCommentsManagerIconInSH(element, elmUrn) {
     ["show","hide"].forEach(sectionType => {
        element?.interactivedata?.[sectionType]?.map(item => {
            elmUrn.push(item.id);
        })
    })
    return elmUrn
}

export function prepareCommentsManagerIcon(type, createdElementData, elmUrn, allComments) {
    switch (type) {
        case slateWrapperConstants.WORKED_EXAMPLE:
        case slateWrapperConstants.CONTAINER:
            elmUrn = showCommentsManagerAsideIcon(createdElementData, elmUrn)
            break;
        case slateWrapperConstants.SECTION_BREAK:
        case slateWrapperConstants.CITATION:
        case slateWrapperConstants.POETRY:
            createdElementData.contents.bodymatter.map((item) => {
                elmUrn.push(item.id)
            })
            break;
        case slateWrapperConstants.TEXT:
        case slateWrapperConstants.ASSESSMENT:
        case slateWrapperConstants.ELEMENT_ASSESSMENT:
        case slateWrapperConstants.ELEMENT_PDF:
        case slateWrapperConstants.ELEMENT_CITATION:
        case slateWrapperConstants.STANZA:
        case slateWrapperConstants.IMAGE:
        case slateWrapperConstants.VIDEO:
        case slateWrapperConstants.AUDIO:
        case slateWrapperConstants.FIGURE_MML:
        case slateWrapperConstants.BLOCKCODE:
        case slateWrapperConstants.SMARTLINK:
        case slateWrapperConstants.MMI_ELM:
        case slateWrapperConstants.INTERACTIVE:
            elmUrn.push(createdElementData.id)
            break;
        case slateWrapperConstants.MULTI_COLUMN:
        case slateWrapperConstants.MULTI_COLUMN_3C:
            /** Column */
            elmUrn = showCommentsManagerMultiColIcon(createdElementData, elmUrn);
            break;
        case slateWrapperConstants.SHOW_HIDE:
            const urns = getShowhideChildUrns(createdElementData)
            elmUrn.push(...urns)
            break;
    }
    return (allComments).filter(({ commentOnEntity }) => {
        return elmUrn.some(function (commentEntity2) {
            return commentOnEntity === commentEntity2
        });
    });
}