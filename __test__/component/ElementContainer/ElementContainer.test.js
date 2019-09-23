import React from 'react';
import { mount } from 'enzyme';
import ElementContainer from './../../../src/component/ElementContainer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { comments } from '../../../fixtures/commentPanelData.js'
import thunk from 'redux-thunk';
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    commentsPanelReducer: {
        allComments: comments,
    }
});
describe('Test for element container component', () => {
    let props = {
        element: {
            id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            type: "element-authoredtext",
            subtype: "",
            schema: "http://schemas.pearson.com/wip-authoring/element/1",
            elementdata: {
                schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                text: ""
            },
            html: {
                text: "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            comments: false,
            tcm: true,
            versionUrn: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            contentUrn: "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        }
    };

    let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
    it('Render element container ', () => {
        expect(elementContainer).toMatchSnapshot();

        elementContainer.setProps({
            element: {
                ...props.element,
                type: 'opener'
            }
        });

        expect(elementContainer).toMatchSnapshot();

        elementContainer.setProps({
            element: {
                ...props.element,
                type: 'figure'
            }
        });

        expect(elementContainer).toMatchSnapshot();
        elementContainer.setProps({
            element: {
                ...props.element,
                type: 'element-blockfeature',
                html: {
                    text: `<blockquote class="blockquoteMarginalia"><p class="paragraphNummerEins">This is BQ with Marginalia.</p></blockquote>`
                }
            }
        });

        elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>)
        expect(elementContainer).toMatchSnapshot();
    })

    elementContainer.setState({
        popup: true
    });


  

    it('onClick Event', () => {
        elementContainer = mount(<Provider store={store}><ElementContainer /></Provider>)
        elementContainer.find('span.add-comment').simulate('click');
        elementContainer.find('span#close-container').simulate('click');
    })

    describe('Testing action function with props', () => {
        let elementContainer = mount(<Provider store={store}><ElementContainer {...props} /></Provider>);
        const elementContainerInstance = elementContainer.find('ElementContainer').instance();
        it('renders saveNewComment ', () => {
            elementContainerInstance.saveNewComment();
        });
        it('renders handleCommentPanel ', () => {
            elementContainerInstance.handleCommentPanel();
        });

        it('renders handle popup toggle ', () => {
            elementContainer.setState({
                popup: true
            });
            
        let target = {
            target: {
                getAttribute: function(dataValue) {
                    return true;
                }
            }
        }
            elementContainerInstance.handleCommentPopup(target);
        });

    })
});
