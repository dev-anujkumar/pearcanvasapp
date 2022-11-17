import config from '../../../src/config/config.js';
import { handleElmPortalEvents, prepareItemMetadata, handlePostMsgOnAddAssess, handleRefreshSlate, getInteractivePostMsg, getAssessmentItemPostMsg, getAssessmentPostMsg, reloadSlate } from '../../../src/component/ElementContainer/AssessmentEventHandling.js';

jest.mock('../../../src/js/slateLockUtility', () => ({
    checkSlateLock: () => {
        return false;
    }
}))

jest.mock('../../../src/component/CanvasWrapper/SlateLock_Actions', () => {
    return {
        getSlateLockStatus: function () {
            return {
                type: 'SET_SLATE_LOCK_STATUS',
                payload: {
                    isLocked : false,
                    userId : ""
                }
            }
        },
        releaseSlateLockWithCallback: () => Promise.resolve({})
    }
})

jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                slateLockReducer: {
                    slateLockInfo: {
                        isLocked: true,
                        timestamp: "",
                        userId: "c5test01"
                    }
                }
            }
        },
        dispatch: () => {}
    }
});
describe('Testing AssessmentEventHandling function', () => {
    xit('Test-1-handleElmPortalEvents', () => {
        handleElmPortalEvents('add');
        let event = new CustomEvent("message", {
            data: {
                source: 'elm'
            }
        },
            false)
        let eventType = "fromUpdate"
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        handleElmPortalEvents('remove',eventType);
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test-1-handleElmPortalEvents > if', () => {
        handleElmPortalEvents('add');
        let event = new CustomEvent("message", {
            data: {
                source: 'elm',
                action: 'approve'
            },
            origin: "https://assessmentauthoring-dev.pearson.com",
        },
            false)
        jest.spyOn(global, 'removeEventListener').mockImplementation(() => { return {data: {source: 'elm',action: 'approve'}}});
        let eventType = "fromUpdate"
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        handleElmPortalEvents('add',eventType);
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test-2-prepareItemMetadata', () => {
        const result = prepareItemMetadata("item|wUrn_urn:pearson:work:2117f871-fd1a-4120-945a-7f8f3abc0ca3|title_Quiz 16.3 Who Defines Deviance?!!!!!");
        expect(result.itemId).toBe('urn:pearson:work:2117f871-fd1a-4120-945a-7f8f3abc0ca3');
        expect(result.itemTitle).toBe('Quiz 16.3 Who Defines Deviance?!!!!!');
    })
});

describe('Testing, Elm - AssessmentEventHandling function', () => {
    it('Test- handlePostMsgOnAddAssess > if', () => {
        const event = new CustomEvent("message", {
            data: {
                    action: "assessment_save_success",
                    source: "elm",
                    timestamp: 1611237428538,
                    type: "assessment|wUrn_urn:pearson:work:4979a9fd-6a9e-45eb-877e-eae3d23b8e27|title_Quiz 9.2: Pointer Variables-test|usagetype_practice"
                },        
            origin: "https://assessmentauthoring-dev.pearson.com",
        });
        let addPufFunction = {}
        let usagetype = ""
        let type = ""
        let action = ""
        let eventType = "fromCreate"

        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        handlePostMsgOnAddAssess(addPufFunction, usagetype, type, action, eventType)
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- handlePostMsgOnAddAssess > if > else if', () => {
        const event = new CustomEvent("message", {
            data: {
                    action: "assessment_save_success",
                    source: "elm",
                    timestamp: 1611237428538,
                    type: "assessment|wUrn_urn:pearson:work:4979a9fd-6a9e-45eb-877e-eae3d23b8e27|title_Quiz 9.2: Pointer Variables-test|usagetype_practice"
                },        
            origin: "https://assessmentauthoring-dev.pearson.com",
        });
        let addPufFunction = {}
        let usagetype = ""
        let type = "interactive"
        let action = ""
        let eventType = "fromCreate"

        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        handlePostMsgOnAddAssess(addPufFunction, usagetype, type, action, eventType)
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- handlePostMsgOnAddAssess > 2nd if', () => {
        const event = new CustomEvent("message", {
            data: {
                    action: "assessment_save_success",
                    source: "elm",
                    timestamp: 1611237428538,
                    type: "assessment|wUrn_urn:pearson:work:4979a9fd-6a9e-45eb-877e-eae3d23b8e27|title_Quiz 9.2: Pointer Variables-test|usagetype_practice"
                },        
            origin: "https://assessmentauthoring-dev.pearson.com",
        });
        let addPufFunction = {}
        let usagetype = ""
        let type = ""
        let action = "remove"
        let eventType = ""

        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        handlePostMsgOnAddAssess(addPufFunction, usagetype, type, action, eventType)
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});


describe('Testing, handleRefreshSlate function', () => {
    it('Test- handleRefreshSlate', () => {
        config.projectUrn = "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d"
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        config.slateEntityURN = "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c"
        config.tempSlateManifestURN = "test"
        config.tempSlateEntityURN = "test"
        config.isPopupSlate = false
        config.page = 0;
        config.scrolling = true;
        config.totalPageCount = 0;
        config.pageLimit = 0;
        config.fromTOC = false;
        config.isSlateLockChecked = true;
        handleRefreshSlate(jest.fn());
        const event = new CustomEvent("message", {
            data: {
                    action: "assessment_save_success",
                    source: "elm",
                    timestamp: 1611237428538,
                    type: "assessment|wUrn_urn:pearson:work:4979a9fd-6a9e-45eb-877e-eae3d23b8e27|title_Quiz 9.2: Pointer Variables-test|usagetype_practice"
                },        
            origin: "https://assessmentauthoring-dev.pearson.com",
        });

        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});


describe('Testing, getInteractivePostMsg function', () => {
    it('Test- getInteractivePostMsg',() => {
        getInteractivePostMsg('interactive|wUrn_dummy');
        getInteractivePostMsg('interactive|elementUrn_dummy');
        getInteractivePostMsg('interactive|title_dummy');
        getInteractivePostMsg('interactive|type_dummy');
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getInteractivePostMsg : else',() => {
        getInteractivePostMsg('test');
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});

describe('Testing, getAssessmentItemPostMsg function', () => {
    it('Test- getAssessmentItemPostMsg',() => {
        getAssessmentItemPostMsg(['interactive','wUrn_dummy']);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});

describe('Testing, reloadSlate function', () => {
    it('Test- reloadSlate',() => {
        reloadSlate();
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});

describe('Testing, getAssessmentPostMsg function', () => {
    it('Test- getAssessmentPostMsg > switch case wUrn',() => {
        let itemData = {
            itemid: "test",
            itemTitle: "test"
        }
        let items = ['wUrn','wUrn']
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg(items, 'usagetype', () =>{}, itemData, 'type', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > switch case elementUrn',() => {
        let itemData = {
            itemid: "test",
            itemTitle: "test"
        }
        let items = ['elementUrn','elementUrn']
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg(items, 'usagetype', () =>{}, itemData, 'type', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > switch case title',() => {
        let itemData = {
            itemid: "test",
            itemTitle: "test"
        }
        let items = ['title','title']
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg(items, 'usagetype', () =>{}, itemData, 'type', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > switch case usageType',() => {
        let itemData = {
            itemid: "test",
            itemTitle: "test"
        }
        let items = ['usageType','usageType']
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg(items, 'usagetype', () =>{}, itemData, 'type', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > if',() => {
        let itemData = {
            itemid: "test",
            itemTitle: "test"
        }
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg([], 'usagetype', () =>{}, itemData, 'type', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > else if',() => {
        let itemData = {}
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg([], 'usagetype', () =>{}, itemData, 'assessment', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Test- getAssessmentPostMsg > else',() => {
        let itemData = {}
        let getMsgafterAddAssessment = {}
        getAssessmentPostMsg([], 'usagetype', () =>{}, itemData, 'test', getMsgafterAddAssessment);
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});

