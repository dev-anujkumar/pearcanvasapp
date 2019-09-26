import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import Interactive from './../../src/component/ElementInteractive';
import {mockDataFpo, mockDataflashcards ,showhide,popup,smartlink,webLink,popupWebLink,mcq,videomcq,galleryVideo,galleryImage,fillInBlank,accountingtable,hotspot,timeline,
    survey,simulation,graph,thirdParty,pdf} from './data.js';

storiesOf('Element Interactive', module)

    .addDecorator(withInfo)
    .add('MMI==> fpo', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Interactive model={mockDataFpo} index="0" /></div>)
    .add('MMI==> flashcards', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={mockDataflashcards} index="1" /></div>)
    .add('showhide', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={showhide} index="2" /></div>)
    .add('pdf', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={pdf} index="3" /></div>)
    .add('3party', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={thirdParty} index="4" /></div>)
    .add('graph', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={graph} index="5" /></div>)
    .add('simulation', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={simulation} index="6" /></div>)
    .add('survey', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={survey} index="7" /></div>)
    .add('timeline', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={timeline} index="8" /></div>)
    .add('hotspot', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={hotspot} index="9" /></div>)
    .add('accountingtable', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={accountingtable} index="10" /></div>)
    .add('fill-in-blank', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={fillInBlank} index="11" /></div>)
    .add('gallery-image', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={galleryImage} index="12" /></div>)
    .add('gallery-video', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={galleryVideo} index="13" /></div>)
    .add('mcq', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={mcq} index="14" /></div>)
    .add('videomcq', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={videomcq} index="15" /></div>)
    .add('popup-web-link', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Interactive model={popupWebLink} index="16" /></div>)
    .add('web-link, popup-web-link', () => <div style={{ width: "500px", position: "relative", left: "100px" }}> <Interactive model={webLink} index="17" /></div>)
    .add('smartlink-tab', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={smartlink} index="18" /></div>)
    .add('popup', () => <div style={{ width: "500px", position: "relative", left: "100px" }}><Interactive model={popup} index="19" /></div>)
    
