import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import Interactive from './../../src/component/ElementInteractive';
import {mockDataFpo, mockDataflashcards ,showhide,popup,smartlink,webLink,popupWebLink,mcq,videomcq,galleryVideo,galleryImage,fillInBlank,accountingtable,hotspot,timeline,
    survey,simulation,graph,thirdParty,pdf} from './data.js';

storiesOf('Element Interactive', module)

    .addDecorator(withInfo)
    .add('MMI==> fpo', () => <Interactive model={mockDataFpo} index="0"/>)
    .add('MMI==> flashcards', () => <Interactive model={mockDataflashcards} index="1"/>)
    .add('showhide', () => <Interactive model={showhide} index="2"/>)
    .add('pdf', () => <Interactive model={pdf} index="3"/>)
    .add('3party', () => <Interactive model={thirdParty} index="4"/>)
    .add('graph', () => <Interactive model={graph} index="5"/>)
    .add('simulation', () => <Interactive model={simulation} index="6"/>)
    .add('survey', () => <Interactive model={survey} index="7"/>)
    .add('timeline', () => <Interactive model={timeline} index="8"/>)
    .add('hotspot', () => <Interactive model={hotspot} index="9"/>)
    .add('accountingtable', () => <Interactive model={accountingtable} index="10"/>)
    .add('fill-in-blank', () => <Interactive model={fillInBlank} index="11"/>)
    .add('gallery-image', () => <Interactive model={galleryImage} index="12"/>)
    .add('gallery-video', () => <Interactive model={galleryVideo} index="13"/>)
    .add('mcq', () => <Interactive model={mcq} index="14"/>)
    .add('videomcq', () => <Interactive model={videomcq} index="15"/>)
    .add('popup-web-link', () => <Interactive model={popupWebLink} index="16"/>)
    .add('web-link, popup-web-link', () => <Interactive model={webLink} index="17"/>)
    .add('smartlink-tab', () => <Interactive model={smartlink} index="18"/>)
    .add('popup', () => <Interactive model={popup} index="19" />)
    
