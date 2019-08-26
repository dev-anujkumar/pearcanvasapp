import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import { ElementFigure } from '../../src/component/ElementFigure/ElementFigure';

const mockFigure1 = {
    id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "figureImage",
    subtype: "image50Text",
    figureClass:"figureImage50Text",
    divClass:"divImage50Text",
    header:{
        labelClass:"heading4Image50TextNumberLabel",
        titleClass:"heading4Image50TextTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionImage50Text",
        creditClass:"paragraphImage50TextCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}

const mockFigure2 = {
    id: "urn:pearson:work:591e0376-8bde-42cf-bea1-70dc846fca1c",
    type: "figure",
    figuretype: "tableImage",
    subtype: "figureImageTextWidthTableImage  ",
    figureClass:"figureImageTextWidthTableImage",
    divClass:"divImageTextWidthTableImage",
    header:{
        labelClass:"heading4ImageTextWidthTableImageNumberLabel",
        titleClass:"heading4ImageTextWidthTableImageTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionImageTextWidthTableImage",
        creditClass:"paragraphImageTextWidthTableImageCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}

const mockFigure3 = {
    id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "mathImage",
    subtype: "imageWiderThanTextMathImage",
    figureClass:"figureImageWiderThanTextMathImage",
    divClass:"divImageWiderThanTextMathImage",
    header:{
        labelClass:"heading4ImageWiderThanTextMathImageNumberLabel",
        titleClass:"heading4ImageWiderThanTextMathImageTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionImageWiderThanTextMathImage",
        creditClass:"paragraphImageWiderThanTextMathImageCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}

const mockFigure4 = {
    id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "figureImage",
    subtype: "imageFullscreen",
    figureClass:"figureImageFullscreen",
    divClass:"divImageFullscreen",
    header:{
        labelClass:"heading4ImageFullscreenNumberLabel",
        titleClass:"heading4ImageFullscreenTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionImageFullscreen",
        creditClass:"paragraphImageFullscreenCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}
const mockFigure5 = {
    id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "mathml",
    // subtype: "imageFullscreen",
    figureClass:"figureText",
    divClass:"divTextFigure",
    header:{
        labelClass:"heading4TextNumberLabel",
        titleClass:"heading4ImageFuheading4TextTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionText",
        creditClass:"paragraphTextCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}
const mockFigure6 = {
    id: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
    type: "figure",
    figuretype: "blockcode",
    //subtype: "imageFullscreen",
    figureClass:"figureCodeSnippet",
    divClass:"divCodeSnippetFigure",
    header:{
        labelClass:"heading4CodeSnippetNumberLabel",
        titleClass:"heading4CodeSnippetTitle",
        labelPlaceHolderText:"Enter Label...",
        titlePlaceHolderText:"Enter Title...",
    },
    footer:{
        captionClass:"figcaptionCodeSnippet",
        creditClass:"paragraphCodeSnippetCredit",
        captionPlaceHolderText:"Enter Caption...",
        creditPlaceHolderText:"Enter Credit...",
    }
}

storiesOf('ElementFigure', module)

  .addDecorator(withInfo)
  .add('default Figure-50',   () => <ElementFigure element={mockFigure1}/>)
  .add('Figure Image-FS', () => {
    return (
        <>
        <ElementFigure element={mockFigure4}  />
       </>
    );
})
.add('Table Image-TW', () => {
    return (
        <>
        <ElementFigure element={mockFigure2}  />
       </>
    );
})
.add('Math Image-WT', () => {
    return (
        <>
        <ElementFigure element={mockFigure3}  />
       </>
    );
})
.add('MathML/Chem Editor', () => {
    return (
        <>
        <ElementFigure element={mockFigure5}  />
       </>
    );
})
.add('Block Code Editor', () => {
    return (
        <>
        <ElementFigure element={mockFigure6}   />
       </>
    );
})