import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'

const {
    REACT_APP_API_URL
} = config

import { OPEN_GLOSSARY_FOOTNOTE, UPDATE_FOOTNOTEGLOSSARY } from "./../../constants/Action_Constants";

export const glossaaryFootnotePopup = (status, glossaaryFootnote, glossaryfootnoteid, elementWorkId, elementType) => async (dispatch) => {
    let glossaaryFootnoteValue = {
        "type": glossaaryFootnote,
        "popUpStatus": status,
        elementWorkId,
        elementType,
        glossaryfootnoteid
    }

    if(status === true){
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        var footnoteContentText;
         //find element 
         for(let i in newBodymatter){
            if( newBodymatter[i].versionUrn== elementWorkId){
                footnoteContentText = newBodymatter[i].html['footnotes'][glossaryfootnoteid];
                console.log('this is footnote text', glossaryfootnoteid, newBodymatter[i].html['footnotes'][glossaryfootnoteid])
            }
        }
    }


    return await dispatch({
        type: OPEN_GLOSSARY_FOOTNOTE,
        // payload: glossaaryFootnoteValue
        payload: {
            glossaaryFootnoteValue :  glossaaryFootnoteValue,
            glossaryFootNoteCurrentValue : footnoteContentText
        }
    });
}

/**
 * saveGlossaryAndFootnote | this method is used for to save glossary and footnote
 * @param {*} elementWorkId, element's workurn of which glosssary&footnote is being saved
 * @param {*} elementType, element's type of which glosssary&footnote is being saved
 * @param {*} glossaryfootnoteid, glosary/footnote's work id
 * @param {*} type, type whether glossary or footnote
 */
export const saveGlossaryAndFootnote = (elementWorkId, elementType, glossaryfootnoteid, type, term, definition) => {
    let glossaryEntry = Object.create({})
    let footnoteEntry = Object.create({})
    let semanticType = type.toUpperCase()
    let data = {}
    switch(semanticType){
        case "FOOTNOTE":
                footnoteEntry[glossaryfootnoteid] = definition
                        data = {
                id: elementWorkId,
                type: elementType,
                versionUrn: null,
                contentUrn: null,
                html: {
                    text: null,
                    glossaryentries: {},
                    footnotes: footnoteEntry,
                    assetspopover: {}
                }
            }
            break;

        case "GLOSSARY":
                glossaryEntry[glossaryfootnoteid] = JSON.stringify({
                    term,
                    definition
                })
               data = {
                    id: elementWorkId,
                    type: elementType,
                    versionUrn: null,
                    contentUrn: null,
                    html: {
                        text: null,
                        glossaryentries:  glossaryEntry,
                        footnotes: {},
                        assetspopover: {}
                    }
                }
            break;
    }
    
    let url = `${REACT_APP_API_URL}v1/slate/element?type=${type.toUpperCase()}&id=${glossaryfootnoteid}`
    axios.put(url, JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        const slateId = config.slateManifestURN;
        const parentData = store.getState().appStore.slateLevelData;
        let newParentData = JSON.parse(JSON.stringify(parentData));
        let newBodymatter = newParentData[slateId].contents.bodymatter;
        //find element 
        for(let i in newBodymatter){
            if( newBodymatter[i].contentUrn== res.data.contentUrn){
                newBodymatter[i] = res.data
            }
        }
        console.log('>>>>Newbody', newParentData)
        //  newParentData = JSON.parse(JSON.stringify(newParentData));

        store.dispatch({
            type: UPDATE_FOOTNOTEGLOSSARY,
            payload: {
                slateLevelData: newParentData
            }
        })
        
        console.log("save glossary footnote API success : ", res.data)
    }).catch(err => {
        console.log("save glossary footnote API error : ", err)
    })
}