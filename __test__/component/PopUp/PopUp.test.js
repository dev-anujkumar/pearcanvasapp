import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
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
        let wrapper = mount(<PopUp {...props}/>);
        expect(wrapper.find('.save-button').exists()).toBe(true);
        expect(wrapper.find('.lockInputBox').exists()).toBe(true);

    })
    it('onClick Event', () => {
        let togglePopup = jest.fn();
        const component = mount(<PopUp togglePopup={togglePopup} />);
        component.find('span.close').simulate('click');
        component.find('span#close-container').simulate('click');
        expect(component.instance().props.togglePopup).toHaveBeenCalled();
    })
    it('isLockReleasePopup', () => {
        const props = {
            isLockReleasePopup: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isLockReleasePopup).toEqual(true);
    })
    it('tocdelete if saveButtonText == "Okay"',() => {
        const props = {
            tocDelete: true,
            saveButtonText: 'Okay' 
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.saveButtonText).toEqual('Okay');
        expect(component.instance().props.tocDelete).toEqual(true);
    })
    it('assessmentAndInteractive', () => {
        const props = {
            assessmentAndInteractive: true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.assessmentAndInteractive).toEqual(true);
    })
    it('showDeleteElemPopup', () => {
        const props = {
            showDeleteElemPopup: true
        }
        const props1 = {
            showDeleteElemPopup: true,
            sectionBreak:true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        ReactDOM.render(<PopUp {...props1} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.showDeleteElemPopup).toEqual(true);
    })
    it('isSplitSlatePopup',() => {
        const props = {
            isSplitSlatePopup:true,
            togglePopup:jest.fn()
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('.cancel-button').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isSplitSlatePopup).toEqual(true);
    })
    it('removeConfirmation',() => {
        const props = {
            removeConfirmation:true
        }
        const div = document.createElement('div');
        ReactDOM.render(<PopUp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.removeConfirmation).toEqual(true);

    })
    it('simulating click for isLockPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            isLockPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('#close-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.isLockPopup).toEqual(true);
    })
    it('simulating click for showDeleteElemPopup',() => {
        let props = {
            togglePopup:jest.fn(),
            showDeleteElemPopup:true
        }
        let wrapper = mount(<PopUp {...props}/>);
        wrapper.find('#close-container').simulate('click');
        const component = mount(<PopUp {...props}/>);
        expect(component.instance().props.showDeleteElemPopup).toEqual(true);
    })
})