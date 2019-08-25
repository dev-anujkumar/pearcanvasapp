import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  GlossaryFootnoteMenu  from '../../src/component/GlossaryFootnotePopup';
import { withInfo } from '@storybook/addon-info';

storiesOf('GlossaryFootnotePopup', module)
.addDecorator(withInfo)
.add('Footnote', () => <GlossaryFootnoteMenu glossaryFootnote="Footnote" closePopup={action('close')} saveContent={action('save')}/>)
.add('Glossary', () => <GlossaryFootnoteMenu glossaryFootnote="Glossary" closePopup={action('close')} saveContent={action('save')}/>)