import { clearElement, createDiscussionForUpdateAPI, removeLabel } from "../../../src/component/ElementDiscussion/Utils";
import config from "../../../src/config/config";

describe('Testing Element Discussion Utils functions ', () => {
    it('Testing createDiscussionForUpdateAPI function -- if case', () => {
        let elementDiscussion = {
            id: "1"
        }
        let props = {
            index: "0-0-0",
            parentElement: {
                type: "groupedcontent",
                groupeddata: {"bodymatter": {0: {}, 1: {contentUrn: "testUrn"}}},
                contentUrn: ""
            }
        }
        let result = {
            "elementParentEntityUrn": undefined, 
            "id": "1", 
            "index": "0", 
            "inputSubType": "NA", 
            "inputType": "DISCUSSION", 
            "slateVersionUrn": undefined
        }
        let format = createDiscussionForUpdateAPI(props, elementDiscussion);
        expect(format).toEqual(result)
    })
    it('Testing createDiscussionForUpdateAPI function -- else if case', () => {
        let elementDiscussion = {
            id: "1"
        }
        let props = {
            index: "0-0-0",
            parentElement: {
                type: "element-aside",
                subtype: "workedexample",
                elementdata: {"bodymatter": {0: {}, 1: {contentUrn: "testUrn"}}},
                contentUrn: ""
            }
        }
        let result = {
            "elementParentEntityUrn": undefined, 
            "id": "1", 
            "index": "0", 
            "inputSubType": "NA", 
            "inputType": "DISCUSSION", 
            "slateVersionUrn": undefined
        }
        let format = createDiscussionForUpdateAPI(props, elementDiscussion);
        expect(format).toEqual(result)
    })
    it('Testing createDiscussionForUpdateAPI function -- else case', () => {
        let elementDiscussion = {
            id: "1",
            status: "approved"
        }
        config.elementStatus= {[elementDiscussion.id]: "approved"}
        let props = {
            index: "",
            parentElement: {
                type: "",
                subtype: "",
                elementdata: "",
                groupeddata: "",
                contentUrn: ""
            }
        }
        let result = {
            "elementParentEntityUrn": undefined, 
            "id": "1", 
            "index": "", 
            "inputSubType": "NA", 
            "inputType": "DISCUSSION", 
            "slateVersionUrn": undefined,
            "status":"approved"
        }
        let format = createDiscussionForUpdateAPI(props, elementDiscussion);
        expect(format).toEqual(result)
    })
    it('Testing clearElement function', () => {
        let element = {
            elementdata: "test"
        }
        let format = clearElement(element);
        expect(format).toEqual({})
    })
    it('Testing removeLabel function -- if case', () => {
        let html = "testing"
        let format = removeLabel(html);
        expect(format).toEqual(html)
    })
    it('Testing removeLabel function -- else case', () => {
        let html = ""
        let format = removeLabel(html);
        expect(format).toEqual(html)
    })
});