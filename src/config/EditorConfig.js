import { CONTENT_STYLE } from './TinymceDefaultCss';
import 'tinymce/plugins/charmap';
export const EditorConfig = {
    
    formats: {
        // Changes the default format for h1 to have a class of heading
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
        'heading-1': { block: 'h1', classes: 'heading1NummerEins' },
        'heading-2': { block: 'h2', classes: 'heading2NummerEins' },
        'heading-3': { block: 'h3', classes: 'heading3NummerEins' },
        'heading-4': { block: 'h4', classes: 'heading4NummerEins' },
        'heading-5': { block: 'h5', classes: 'heading5NummerEins' },
        'heading-6': { block: 'h6', classes: 'heading6NummerEins' },
        'marginalia': { block: 'blockquote', classes: 'blockquoteMarginalia', wrapper: true},
        'pullquote': { block: 'h3', classes: 'pullQuoteNumeroUno' },
        'marginalia-attribution': { block: 'blockquote', classes: 'blockquoteMarginaliaAttr', wrapper: true },
        'LO': { block: 'h2', classes: 'heading2learningObjectiveItem' },
        removeformat: [
            { selector: 'abbr,dfn,a,strong,em,s,sub,sup,code,span', remove: 'all',split: true, expand: false }
          ]
    },
    toolbar: 'bold italic underline strikethrough removeformat indent outdent Footnote Glossary customListButton customUoListButton tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code superscript subscript charmap undo redo assetPopoverIcon slateTag ',
    contentStyle: CONTENT_STYLE,
    plugins: "lists advlist placeholder charmap paste tiny_mce_wiris"
}

export const GlossaryFootnoteEditorConfig = {
    formats: {
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
    },
    toolbar: 'bold italic underline strikethrough removeformat superscript subscript tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code'
}