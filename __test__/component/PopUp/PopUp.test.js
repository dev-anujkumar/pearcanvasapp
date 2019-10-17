import React from 'react';
import ReactDOM from 'react-dom';
import { mount , shallow } from 'enzyme';
import sinon from 'sinon'
import PopUp from '../../../src/component/PopUp';


describe('Testing PopUp component', () => {
    it('render PopUp component ', () => {
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            isLockPopup: true,
            withInputBox: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    it('onClick Event', () => {
        let togglePopup = sinon.stub()
        const component = mount(<PopUp togglePopup={togglePopup} />);
        component.find('span.close').simulate('click');
        component.find('span#close-container').simulate('click');
    })
    it('isLockReleasePopup', () => {
        const props = {
            isLockReleasePopup: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    it('tocDelete', () => {
        const props = {
            tocDelete: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    it('assessmentAndInteractive', () => {
        const props = {
            assessmentAndInteractive: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    it('showDeleteElemPopup', () => {
        const props = {
            showDeleteElemPopup: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})