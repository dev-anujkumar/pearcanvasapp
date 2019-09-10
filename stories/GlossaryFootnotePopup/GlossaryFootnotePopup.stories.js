import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  GlossaryFootnoteMenu  from '../../src/component/GlossaryFootnotePopup';
import { withInfo } from '@storybook/addon-info';

storiesOf('GlossaryFootnotePopup', module)
.addDecorator(withInfo)
.add('Footnote', () => <div style={{width:"240px", position:"relative", left:"100px"}}>
    <GlossaryFootnoteMenu glossaryFootnote="Footnote" closePopup={action('close')} saveContent={action('save')}/></div>)
.add('Glossary', () => <div style={{width:"240px", position:"relative", left:"100px"}}> 
<GlossaryFootnoteMenu glossaryFootnote="Glossary" closePopup={action('close')} saveContent={action('save')}/></div>)