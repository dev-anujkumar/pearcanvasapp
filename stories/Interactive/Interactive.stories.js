import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import Interactive from './../../src/component/Interactive';
import {mockDataFpo, mockDataflashcards ,showhide,popup,smartlink,webLink,popupWebLink,mcq,videomcq,galleryVideo,galleryImage,fillInBlank,accountingtable,hotspot,timeline,
    survey,simulation,graph,thirdParty,pdf} from './data.js';

storiesOf('Interactive', module)

    .addDecorator(withInfo)
    .add('MMI==> fpo', () => <Interactive model={mockDataFpo} />)
    .add('MMI==> flashcards', () => <Interactive model={mockDataflashcards} />)
    .add('showhide', () => <Interactive model={showhide} />)
    .add('pdf', () => <Interactive model={pdf} />)
    .add('3party', () => <Interactive model={thirdParty} />)
    .add('graph', () => <Interactive model={graph} />)
    .add('simulation', () => <Interactive model={simulation} />)
    .add('survey', () => <Interactive model={survey} />)
    .add('timeline', () => <Interactive model={timeline} />)
    .add('hotspot', () => <Interactive model={hotspot} />)
    .add('accountingtable', () => <Interactive model={accountingtable} />)
    .add('fill-in-blank', () => <Interactive model={fillInBlank} />)
    .add('gallery-image', () => <Interactive model={galleryImage} />)
    .add('gallery-video', () => <Interactive model={galleryVideo} />)
    .add('mcq', () => <Interactive model={mcq} />)
    .add('videomcq', () => <Interactive model={videomcq} />)
    .add('popup-web-link', () => <Interactive model={popupWebLink} />)
    .add('web-link, popup-web-link', () => <Interactive model={webLink} />)
    .add('smartlink-tab', () => <Interactive model={smartlink} />)
    .add('popup', () => <Interactive model={popup} />)
    
