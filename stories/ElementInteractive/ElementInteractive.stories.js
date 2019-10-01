import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import Interactive from './../../src/component/ElementInteractive';
import {mockDataFpo, mockDataflashcards ,showhide,popup,smartlink,webLink,popupWebLink,mcq,videomcq,galleryVideo,galleryImage,fillInBlank,accountingtable,hotspot,timeline,
    survey,simulation,graph,thirdParty,pdf} from './data.js';
    import thunk from 'redux-thunk';
    const middlewares = [thunk];
    import { Provider } from 'react-redux';
    import configureMockStore from 'redux-mock-store';
    const mockStore = configureMockStore(middlewares);
    const elemInteractiveData = mockStore({
        slateLockReducer:{slateLockInfo:false}   
      });
storiesOf('Element Interactive', module)

    .addDecorator(withInfo)
    .add('MMI==> fpo', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemInteractiveData}> <Interactive model={mockDataFpo} index="0" /></Provider></div>)
    .add('MMI==> flashcards', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={mockDataflashcards} index="1" /></Provider></div>)
    .add('showhide', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={showhide} index="2" /></Provider></div>)
    .add('pdf', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={pdf} index="3" /></Provider></div>)
    .add('3party', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={thirdParty} index="4" /></Provider></div>)
    .add('graph', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={graph} index="5" /></Provider></div>)
    .add('simulation', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={simulation} index="6" /></Provider></div>)
    .add('survey', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={survey} index="7" /></Provider></div>)
    .add('timeline', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={timeline} index="8" /></Provider></div>)
    .add('hotspot', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={hotspot} index="9" /></Provider></div>)
    .add('accountingtable', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={accountingtable} index="10" /></Provider></div>)
    .add('fill-in-blank', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={fillInBlank} index="11" /></Provider></div>)
    .add('gallery-image', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={galleryImage} index="12" /></Provider></div>)
    .add('gallery-video', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={galleryVideo} index="13" /></Provider></div>)
    .add('mcq', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={mcq} index="14" /></Provider></div>)
    .add('videomcq', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={videomcq} index="15" /></Provider></div>)
    .add('popup-web-link', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemInteractiveData}><Interactive model={popupWebLink} index="16" /></Provider></div>)
    .add('web-link, popup-web-link', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Provider store={elemInteractiveData}><Interactive model={webLink} index="17" /></Provider></div>)
    .add('smartlink-tab', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={smartlink} index="18" /></Provider></div>)
    .add('popup', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Provider store={elemInteractiveData}><Interactive model={popup} index="19" /></Provider></div>)
    
