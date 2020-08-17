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
        'strikethrough' : {inline : 's', exact : true},
        'underline' : {inline : 'u', exact : true},
        custom_code: {title: 'inline code', inline: 'code'},
        removeformat: [
            { selector: 'abbr,dfn,a,strong,em,s,u,sub,sup,code', remove: 'all',split: true, expand: false, deep: true },
            { selector: 'span', remove: 'empty', split: false }
          ]
    },
    toolbar: 'undo redo | mybutton | bold italic underline strikethrough removeformat subscript superscript charmap | crossLinkingIcon Glossary Footnote tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code | customListButton customUoListButton indent outdent | slateTag ',
    contentStyle: CONTENT_STYLE,
    plugins: "lists advlist placeholder charmap paste tiny_mce_wiris"
}

export const GlossaryFootnoteEditorConfig = {
    formats: {
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
        'strikethrough' : {inline : 's', exact : true},
        'underline' : {inline : 'u', exact : true},
        removeformat: [
            { selector: 'abbr,dfn,a,strong,em,s,u,sub,sup,code,span', remove: 'all',split: true, expand: false }
          ]
    },
    toolbar: 'bold italic underline strikethrough removeformat subscript superscript tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code'
}