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
        element: wipData.paragraph
    };

    let pageNumber = (isHovered, isPageNumberEnabled, activeElement) => {
        return <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />;
    }

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
            {/* (isHovered, isPageNumberEnabled, activeElement) => (
                <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
            ) */}
        </ElementContainer></Provider>);
    it('Render element container ', () => {

        elementContainer.setProps({
            element: {
                ...props.element,
                type: 'chapterintro'
            }
        });
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.pullquote
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.figure
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.table
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.mathImage
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.equation
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.codeEditor
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.video
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.audio
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.assessment
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.interactive
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.smartLink
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.showHide
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.popUp
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.aside
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);

        props = {
            element: wipData.workedExample
        };
        elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false" children={pageNumber}>
        </ElementContainer></Provider>);
    })

    elementContainer.setState({
        popup: true
    });

    // it('onClick Event', () => {
    //     elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false">
    //         (isHovered, isPageNumberEnabled, activeElement) => (
    //             <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
    //         )
    //     </ElementContainer></Provider>);
    //     elementContainer.find('span.add-comment').simulate('click');
    //     elementContainer.find('span#close-container').simulate('click');
    // })

    // describe('Testing action function with props', () => {
    //     let elementContainer = mount(<Provider store={store}><ElementContainer {...props} showBlocker="false">
    //         (isHovered, isPageNumberEnabled, activeElement) => (
    //             <PageNumberElement element={props.element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
    //         )
    //     </ElementContainer></Provider>);
    //     const elementContainerInstance = elementContainer.find('ElementContainer').instance();
    //     it('renders saveNewComment ', () => {
    //         elementContainerInstance.saveNewComment();
    //     });
    //     it('renders handleCommentPanel ', () => {
    //         elementContainerInstance.handleCommentPanel();
    //     });

    //     it('renders handle popup toggle ', () => {
    //         elementContainer.setState({
    //             popup: true
    //         });
            
    //     let target = {
    //         target: {
    //             getAttribute: function(dataValue) {
    //                 return true;
    //             }
    //         }
    //     }
    //         elementContainerInstance.handleCommentPopup(target);
    //     });

    // })
});
