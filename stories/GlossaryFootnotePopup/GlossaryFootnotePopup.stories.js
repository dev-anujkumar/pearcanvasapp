import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  GlossaryFootnotePopup  from '../../src/component/GlossaryFootnotePopup';
import { withInfo } from '@storybook/addon-info';

storiesOf('GlossaryFootnotePopup', module)
.addDecorator(withInfo)
.add('Footnote', () => <GlossaryFootnotePopup glossaryFootnote="Footnote" onClick={action('Click')}/>)
.add('Glossary', () => <GlossaryFootnotePopup glossaryFootnote="Glossary" onClick={action('Add comment')}/>)