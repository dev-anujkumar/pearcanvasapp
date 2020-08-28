import React from 'react';
import SlateHeader from '../../../src/component/CanvasSlateHeader';


describe('Test-handleNavClick', () => {
    let props={
        slateType:'container-introduction' , 
        slateTitle: {
            text:'C1'}, 
        slateLockInfo:{
            isLocked: true,
            timestamp: "",
            userId: "c5Test01"
        },
        disabled : 'next'
    }
        const CanvasSlateHeader = mount(<SlateHeader {...props} />)
        let CanvasSlateHeaderInstance = CanvasSlateHeader.find('SlateHeader').instance();
        const spygetLabel = jest.spyOn(CanvasSlateHeaderInstance, 'getLabel')
        const spysetDynamicStyle = jest.spyOn(CanvasSlateHeaderInstance, 'setDynamicStyle')
        it('render SlateHeader component ', () => {
            expect(CanvasSlateHeader).toHaveLength(1);
            let CanvasSlateHeaderInstance = CanvasSlateHeader.instance(); 
            expect(CanvasSlateHeaderInstance).toBeDefined();
        })
        it('Test-getLabel() -default case ', () => {        
            CanvasSlateHeaderInstance.getLabel("into");
            expect(CanvasSlateHeaderInstance.getLabel).toHaveBeenCalled()
            spygetLabel.mockClear()
        })
        it('Test-getLabel() -default case ', () => {
            CanvasSlateHeaderInstance.getLabel("assessment");
            expect(CanvasSlateHeaderInstance.getLabel).toHaveBeenCalled()
            spygetLabel.mockClear()
        })
        it('Test-setDynamicStyle', () => {
            CanvasSlateHeaderInstance.setDynamicStyle("assessment",'input-text');
            expect(CanvasSlateHeaderInstance.setDynamicStyle).toHaveBeenCalled()
            spysetDynamicStyle.mockClear()
        })
       
    })
describe('onClick Event', () => {
    const onLoadMock = jest.fn();

    it('navigate Event ', () => {
        const onLoadMock = jest.fn();
        const component = mount(<SlateHeader onNavigate={onLoadMock} disabled='next' />);
        expect(component.props().onNavigate).toEqual(onLoadMock);
    })
})
