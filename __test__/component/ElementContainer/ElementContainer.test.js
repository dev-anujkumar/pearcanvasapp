import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer';
import PageNumberElement from './../../../src/component/SlateWrapper/PageNumberElement';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { comments } from '../../../fixtures/commentPanelData.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];
import wipData from './wipData';
import config from '../../../src/config/config';
import { fn } from 'moment';

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    appStore: {
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "element-authoredtext",
            elementWipType: "element-authoredtext",
            primaryOption: "primary-heading",
            secondaryOption: "secondary-heading-1",
            index: "1-0",
            tag: "H1"
        }
    },
    slateLockReducer: {
        slateLockInfo: {
            isLocked: false,
            timestamp: "",
            userId: ""
        }
    },
    commentsPanelReducer: {
        allComments: comments
    },
    toolbarReducer: {
        elemBorderToggle: "true"
    },
    metadataReducer: {
        currentSlateLOData: ""
    },
    learningToolReducer: {
        shouldHitApi: false,
        learningToolTypeValue: '',
        apiResponse: [],
        showErrorMsg: true, //should be false
        showLTBody: false,
        learningTypeSelected: false,
        showDisFilterValues: false,
        selectedResultFormApi: '',
        resultIsSelected: false,
        toggleLT: false,
        linkButtonDisable: true,
        apiResponseForDis: [],
        learningToolDisValue: '',
        numberOfRows: 25
    }
});
describe('Test for element container component', () => {
    // let pageNumber = function(isHovered, isPageNumberEnabled, activeElement) {
    //     return <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />;
    // }

    let isHovered = true;
    let isPageNumberEnabled = true;

    const activeElement = {
        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        elementType: "element-authoredtext",
        elementWipType: "element-authoredtext",
        primaryOption: "primary-heading",
        secondaryOption: "secondary-heading-1",
        index: "1",
        tag: "H1"
    };

    let props = {
        element: wipData.paragraph,
        showBlocker: jest.fn()
    };

    let pageNumber = (isHovered, isPageNumberEnabled, activeElement) => {
        return <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />;
    }

    let seprator = (index, firstOne, parentUrn, asideData, outerAsideIndex) => {
        return []
    }

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
            {/* (isHovered, isPageNumberEnabled, activeElement) => (
                <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
            ) */}
        </ElementContainer></Provider>);
    it('Render element container ', () => {

        props = {
            element: wipData.opener
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.pullquote
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.list
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.figure
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.table
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.mathImage
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.equation
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.codeEditor
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.video
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        // props = {
        //     element: wipData.audio
        // };
        // elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        // </ElementContainer></Provider>);

        props = {
            element: wipData.assessment
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.interactive
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.smartLink
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.showHide
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.popUp
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.assessmentSlate
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.aside
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.workedExample
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.lo
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.ma
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);
    })

    // elementContainer.setState({
    //     popup: true
    // });

    const elementContainerInstance = elementContainer.find('ElementContainer').instance();

    it('delete element', () => {
        elementContainerInstance.deleteElement();
    });

    it('onClick Event', () => {
        elementContainerInstance.handleFocus();
         elementContainerInstance.handleBlurAside();
    })
    it('learningObjectiveOperations ', () => {
       
        config.slateType ="assessment";
        config.PERMISSIONS=['lo_edit_metadata'];
        document.cookie="tet"
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        elementContainerInstance.learningObjectiveOperations("View Learning Objective");
        config.slateType ="section";
        config.PERMISSIONS=['lo_edit_metadata'];
        console.log(document.cookie)
        //let elementContainerInstance = elementContainer.find('ElementContainer').instance();
        elementContainerInstance.learningObjectiveOperations("View Learning Objective");
        //elementContainerInstance.learningObjectiveOperations("Add a New Learning Objective");
        // instance.learningObjectiveOperations("Add From Existing or Edit");
        // instance.learningObjectiveOperations("Add From Existing");
        
        
       // elementContainerInstance.find('span#close-container').simulate('click');
    })
    it('toggleColorPaletteList ', () => {
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        elementContainerInstance.toggleColorPaletteList();
    })
    it('selectColor  ', () => {
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        let event = {
            target: {
                getAttribute: function(dataValue) {
                    return 'primary-heading';
                }
            }
        }
        elementContainerInstance.selectColor(event);
    })
    it('showelementpopup  ', () => {
        let props = {
            element: wipData.paragraph,
            showBlocker: jest.fn()
        };
       let  elementContainer = mount(<Provider store={store}><ElementContainer {...props} elementSepratorProps={seprator} children={pageNumber}>
        </ElementContainer></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
         elementContainerInstance.showDeleteElemPopup("event");
    })
    describe('Testing action function with props', () => {
        // let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false">
        //     (isHovered, isPageNumberEnabled, activeElement) => (
        //         <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
        //     )
        // </ElementContainer></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('renders saveNewComment ', () => {
            elementContainerInstance.saveNewComment();
        });
        it('renders handleCommentChange  ', () => {
            elementContainerInstance.handleCommentChange("test");
            let props={isBlockerActive:true}
        });
        it('handle handleOnMouseOver   ', () => {
            elementContainerInstance.handleOnMouseOver();
        });
        it('handle handleOnMouseOut   ', () => {
            elementContainerInstance.handleOnMouseOut();
        });
        it('handle openGlossaryFootnotePopUp', () => {
            elementContainerInstance.openGlossaryFootnotePopUp("","");
        });
        it('handle openAssetPopoverPopUp ', () => {
            elementContainerInstance.openAssetPopoverPopUp("");
        });

         it('renders handle popup toggle ', () => {
        let props = {
            isBlockerActive: true,
            showBlocker: jest.fn()
        };
        let  elementContainer = mount(<Provider store={store}><ElementContainer {...props} elementSepratorProps={seprator} children={pageNumber}>
            </ElementContainer></Provider>);
            const elementContainerInstance = elementContainer.find('ElementContainer').instance();
            elementContainerInstance.handleCommentPopup(true);
         });

    })
});
