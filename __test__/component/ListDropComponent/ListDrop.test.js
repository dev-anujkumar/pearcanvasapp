import React from 'react';
import ReactDOM from 'react-dom';
import ListButtonDrop from '../../../src/component/ListButtonDrop/ListButtonDrop.jsx';
import ListButtonPortal from '../../../src/component/ListButtonDrop/ListButtonDropPortal.jsx';

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
            <ListButtonPortal>
                <ListButtonDrop {...props} />
            </ListButtonPortal>,
            div);
        ReactDOM.unmountComponentAtNode(div);
    })
})