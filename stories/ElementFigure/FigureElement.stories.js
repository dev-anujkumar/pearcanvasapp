import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import { FigureElement } from '../../src/component/ElementFigure/FigureElement';

const mockFigure1 = {
  //  id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "image",
    subtype: "image50Text",
    figureAlignment:"half-text"
}

const mockFigure2 = {
  //  id: "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
    type: "figure",
    figuretype: "table",
    subtype: "imageTextWidthTableImage  ",
    figureAlignment:"text-width"
}

const mockFigure3 = {
   // id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "mathImage",
    subtype: "imageWiderThanTextMathImage",
    figureAlignment:"wider"
}

const mockFigure4 = {
   // id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "image",
    subtype: "imageFullscreen",
    figureAlignment:"full"
}
const mockFigure5 = {
 //   id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "authoredtext",
    subtype: "mathml",
  
 
    
}
const mockFigure6 = {
 //   id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "codelisting",
    subtype: "codelisting",

  
}

storiesOf('FigureElement', module)

  .addDecorator(withInfo)
  .add('default Figure-50',   () => <FigureElement element={mockFigure1}/>)
  .add('Figure Image-FS', () => {
    return (
        <>
        <FigureElement element={mockFigure4}  />
       </>
    );
})
.add('Table Image-TW', () => {
    return (
        <>
        <FigureElement element={mockFigure2}  />
       </>
    );
})
.add('Math Image-WT', () => {
    return (
        <>
        <FigureElement element={mockFigure3}  />
       </>
    );
})
.add('MathML/Chem Editor', () => {
    return (
        <>
        <FigureElement element={mockFigure5}  />
       </>
    );
})
.add('Block Code Editor', () => {
    return (
        <>
        <FigureElement element={mockFigure6}   />
       </>
    );
})