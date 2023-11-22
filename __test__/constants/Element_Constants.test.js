import { getPasteValidated } from '../../src/constants/Element_Constants.js';

describe('Testing Function - getPasteValidated', () => {
    let asideElem = { 
        type: "element-aside",
        elementdata: {
            bodymatter:[
                {
                    type:'figure'
                },
                {
                    type:'manifest',
                    contents:{
                        bodymatter:[
                            {
                                type:'poetry'
                            }
                        ]
                    }
                }
            ]
        }
    }
    let showhideElem = { 
        type: "showhide",
        interactive:{
            "show":[ {
                type:'figure'
            }],
            "hide":[ {
                type:'figure'
            }],
            "postertextobject":[ {
                type:'element-autheredtext'
            }]
        }
    }
    let separatorProps = {
        elementSelection: {},
        asideData: {
            index: "0-1",
            element: asideElem
        },
        index: "0-1"
    }

    let separatorProps1 = {
        elementSelection: {},
        asideData: {
            index: "2-0-1-1",
            element: showhideElem,
        },
        index: "2-0-1-1",
    }

    let separatorProps2 = {
        elementSelection: {},
        asideData: {
            index: "2-0-1-1",
            element: asideElem,
            parent: {type: "groupedcontent"}
        },
        index: "2-0-1-1",
    }

    it('Test1- getPasteValidated - Default case - P in Aside',()=>{
        let sourceType = 'ASIDE'
        let selectionType = 'TEXT'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(true);
    })
    it('Test2- getPasteValidated - Aside in Aside',()=>{
        let sourceType = 'ASIDE'
        let selectionType = 'ASIDE'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(false);
    })
    it('Test3- getPasteValidated - Stanza in Poetry',()=>{
        let sourceType = 'POETRY'
        let selectionType = 'STANZA'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(true);
    })
    it('Test4- getPasteValidated - Stanza in Citation',()=>{
        let sourceType = 'CITATION'
        let selectionType = 'STANZA'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(false);
    })
    it('Test2- getPasteValidated - Aside in Aside',()=>{
        let sourceType = 'ASIDE'
        let selectionType = 'SHOW_HIDE'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(true);
    })
    it('Test2- getPasteValidated - Aside in Aside',()=>{
        let sourceType = 'ASIDE'
        let selectionType = 'POETRY'
        let returnData = getPasteValidated(separatorProps, sourceType, selectionType);
        expect(returnData).toBe(true);
    })
    it('Test2- getPasteValidated - Blocklist in Showhide',()=>{
        let sourceType = 'SHOWHIDE'
        let selectionType = 'COLUMN_VIEW_1'
        let returnData = getPasteValidated(separatorProps1, sourceType, selectionType);
        expect(returnData).toBe(true);
    })
    it('Test2- getPasteValidated - Blocklist in aside',()=>{
        let sourceType = 'ASIDE'
        let selectionType = 'COLUMN_VIEW_1'
        let returnData = getPasteValidated(separatorProps2, sourceType, selectionType);
        expect(returnData).toBe(false);
    })
})