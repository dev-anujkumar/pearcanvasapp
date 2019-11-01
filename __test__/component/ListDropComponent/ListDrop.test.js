import React from 'react';
import ReactDOM from 'react-dom';
import ListButtonDrop from '../../../src/component/ListButtonDrop/ListButtonDrop.jsx';
import ListButtonPortal from '../../../src/component/ListButtonDrop/ListButtonDropPortal.jsx';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import { listMockData } from '../../../fixtures/slateTestingData.js';

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    appStore: {
        activeElement: {
            elementId: "urn:pearson:work:726de1de-e703-4daf-8907-a125ffa3a04b",
            elementType: "element-authoredtext",
            elementWipType: "element-list",
            primaryOption: "primary-list",
            secondaryOption: "secondary-list-3",
            tag: "OL",
            toolbar: ['bold']
        }
    }
});

describe('Testing <ListButtonDrop> Component', () => {

    let nodeRef = null;
    let spy = sinon.spy();
    let props = {
        selectedOption: `lower-alpha`,
        startValue: 4,
        setListDropRef: function (node) { nodeRef = node },
        onListSelect: spy
    }
    const wrapper = mount(<ListButtonDrop {...props} />, { attachTo: document.body });
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListButtonDrop {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    test('simulating clicks', () => {
        wrapper.find('DecimalListIconBox').simulate('click');
        wrapper.find('UpperAlphaListIconBox').simulate('click');
        wrapper.find('LowerAlphaListIconBox').simulate('click');
        wrapper.find('UpperRomanListIconBox').simulate('click');
        wrapper.find('LowerRomanListIconBox').simulate('click');
        wrapper.find('NoStyleListIconBox').simulate('click');
        expect(spy.callCount).toBe(6);
    })
    test('simulating keydown and keypress', () => {
        wrapper.find('#listINputBox').simulate('keyDown', {
            which: 86,
            ctrlKey: true
        })
        wrapper.find('#listINputBox').simulate('keyPress', {
            which: 48
        })
    })
    test('portal element renders without crashing', () => {
        const div = document.createElement('div');
        div.id = 'editor-toolbar';
        ReactDOM.render(
            <Provider store={store}>
                <ListButtonPortal slateData={listMockData}>
                    {
                        (selectedType, startValue) => (
                            <ListButtonDrop
                                selectedOption={selectedType}
                                startValue={startValue}
                                setListDropRef={function (node) { nodeRef = node }}
                                onListSelect={spy}
                            />
                        )
                    }
                </ListButtonPortal>
            </Provider>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })
})