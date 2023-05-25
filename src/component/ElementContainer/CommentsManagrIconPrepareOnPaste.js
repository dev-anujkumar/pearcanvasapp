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
        elmUrn.push(element.id)
        element?.elementdata?.bodymatter?.map((item) => {
            if(item?.type === SHOW_HIDE) {
                elmUrn.push(item.id)
                showCommentsManagerIconInSH(item, elmUrn);
            } else
            if (item?.type === "manifest") {
                item?.contents?.bodymatter?.map((ele) => {
                    if(ele?.type === SHOW_HIDE) { /* Ex. -  WE:Body/SectionBreak:SH:P*/
                     elmUrn.push(ele.id)
                        showCommentsManagerIconInSH(ele, elmUrn);
                    } 
                    else { elmUrn.push(ele.id) } /* Ex. -  WE:Body/SectionBreak:P*/
                })
            }
            else if(item?.type === "manifestlist") { /* Show Icon in 2C:Aside:Element */
                showCommentsManagerBlockListIcon(item, elmUrn);
            }
             else {
                elmUrn.push(item.id) /* Ex. -  Aside/(WE:Head):P*/
            }
        })
    }
 return elmUrn
}

/**
* @function showCommentsManagerBlockListIcon
* @description Show comment's manager icon in right side of element inside containers; Ex. -  BL:P
*/
function showCommentsManagerBlockListIcon(element, elmUrn) {
    function getBlockListIds(item) {
      if (item && typeof item === 'object') {
        if (item?.id) {
            elmUrn.push(item.id);
        }
        Object.values(item).forEach(getBlockListIds);
      }
    }
    getBlockListIds(element);
    return elmUrn;
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
                }
                else if(item?.type === SHOW_HIDE) { /* Show Icon in 2C:Aside:Element */
                    elmUrn.push(item.id)
                    showCommentsManagerIconInSH(item, elmUrn);
                }
                else if(item?.type === "manifestlist") { /* Show Icon in 2C:Aside:Element */
                    showCommentsManagerBlockListIcon(item, elmUrn);
                }
                 else {
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
        case slateWrapperConstants.POP_UP:
                elmUrn.push(createdElementData.popupdata.postertextobject[0].id)
                createdElementData.popupdata.bodymatter.length > 0 && elmUrn.push(createdElementData.popupdata.bodymatter[0].id)
            break;
        case slateWrapperConstants.BLOCKLIST:
            elmUrn = showCommentsManagerBlockListIcon(createdElementData, elmUrn)
            break;
    }
    return (allComments).filter(({ commentOnEntity }) => {
        return elmUrn.some(function (commentEntity2) {
            return commentOnEntity === commentEntity2
        });
    });
}