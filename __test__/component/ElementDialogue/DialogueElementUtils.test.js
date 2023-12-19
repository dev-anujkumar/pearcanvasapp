import config from "../../../src/config/config";
import ElementConstants from '../../../src/component/ElementContainer/ElementConstants';
import * as Utils from '../../../src/component/ElementDialogue/DialogueElementUtils'
describe('createPSDataForUpdateAPI', () => {
    it('Testing createPSDataForUpdateAPI', () => {
        const container = {
            slateVersionUrn: "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
            elementParentEntityUrn:'urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb',
            inputType: "ELEMENT_DIALOGUE",
            inputSubType: "NA",
            subtype: "workedexample",
            index: "0-0-0",
            status: "approved"
        }
        let result = Utils.createPSDataForUpdateAPI(container);
        expect(result);
    });
it('Testing createPSDataForUpdateAPI function IF case', () => {
    let elementDiscussion = {
        id: "1",
        status:"approved"
    }
    config.elementStatus= {[elementDiscussion.id]: "approved"}
    let props = {
        index: "",
        parentElement: {
            type: "",
            subtype: "",
            elementdata: "",
            groupeddata: "",
            contentUrn: "",
        },
        asideData:{
            type: ElementConstants.SHOW_HIDE
        },
    sectionType:"show",
    }
    let result = {
        "elementParentEntityUrn": undefined, 
        'id': '1',
        "index": "", 
        "inputSubType": "NA", 
        "inputType": "ELEMENT_DIALOGUE", 
        "sectionType": undefined,
        "slateVersionUrn": undefined,
        "status": "approved"
    }
    let finalData = Utils.createPSDataForUpdateAPI(props, elementDiscussion);
    expect(finalData).toEqual(result)
});
it('Testing createPSDataForUpdateAPI function ELSE case', () => {
    let elementDiscussion = {
        id: "1"
    }
  
    config.elementStatus= {[elementDiscussion.id]: "approved"}
    let props = {
        index: "",
        parentElement: {
            type: "",
            subtype: "",
            elementdata: "",
            groupeddata: "",
            contentUrn: "",
        },
        asideData:{
            type: ''
        },
    sectionType:"show",
    }
    let result = {
        "elementParentEntityUrn": undefined, 
        'id': '1',
        "index": "", 
        "inputSubType": "NA", 
        "inputType": "ELEMENT_DIALOGUE", 
        "slateVersionUrn": undefined,
    }
    let finalData = Utils.createPSDataForUpdateAPI(props, elementDiscussion);
    expect(finalData).toEqual(result)
});
it('Testing handleCommonEvents function IF case', () => {
    let addEvent = true
    let elementDiscussion = {
        id: "1"
    }
    jest.spyOn(document, 'querySelectorAll').mockImplementationOnce((id) => {
        if(id ===`.power-paste-icon,.split-icon, .delete-icon,.popup-button,.element-label`) {
        return [{
            classList:{
                add: jest.fn()
            }
        }]
    }
    })
    config.elementStatus= {[elementDiscussion.id]: "approved"}
    let props = {
        index: "",
        parentElement: {
            type: "",
            subtype: "",
            elementdata: "",
            groupeddata: "",
            contentUrn: "",
        },
        asideData:{
            type: ElementConstants.SHOW_HIDE
        },
    sectionType:"show",
    }
    let result = {
        "elementParentEntityUrn": undefined, 
        'id': '1',
        "index": "", 
        "inputSubType": "NA", 
        "inputType": "ELEMENT_DIALOGUE", 
        "slateVersionUrn": undefined,
    }
    let finalData = Utils.handleCommonEvents(props, addEvent);
    expect(finalData).toEqual(undefined)
});
it('Testing handleCommonEvents function ELSE case', () => {
    let elementDiscussion = {
        id: "1"
    }
    jest.spyOn(document, 'querySelectorAll').mockImplementationOnce((id) => {
        if(id ===`.power-paste-icon,.split-icon, .delete-icon,.popup-button,.element-label`) {
        return [{
            classList:{
                remove: jest.fn()
            }
        }]
    }
    })
    config.elementStatus= {[elementDiscussion.id]: "approved"}
    let props = {
        index: "",
        parentElement: {
            type: "",
            subtype: "",
            elementdata: "",
            groupeddata: "",
            contentUrn: "",
        },
        asideData:{
            type: ElementConstants.SHOW_HIDE
        },
    sectionType:"show",
    }
    let result = {
        "elementParentEntityUrn": undefined, 
        'id': '1',
        "index": "", 
        "inputSubType": "NA", 
        "inputType": "ELEMENT_DIALOGUE", 
        "slateVersionUrn": undefined,
    }
    let finalData = Utils.handleCommonEvents(props);
    expect(finalData).toEqual(undefined)
});
});
