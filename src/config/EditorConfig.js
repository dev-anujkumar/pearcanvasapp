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
    toolbar: 'undo redo | formatSelector | bold italic underline strikethrough removeformat subscript superscript charmap | crossLinkingIcon Glossary Footnote tinyMcewirisformulaEditor tinyMcewirisformulaEditorChemistry code | customListButton customUoListButton indent outdent | slateTag ',
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

const FormatSelectorType = [
    {
        text: 'Paragraph',
        value: 'P',
    },
    {
        text: 'Heading 1',
        value: "H1",
    },
    {
        text: 'Heading 2',
        value: "H2",
    },
    {
        text: 'Heading 3',
        value: "H3",
    },
    {
        text: 'Heading 4',
        value: "H4",
    },
    {
        text: 'Heading 5',
        value: "H5",
    },
    {
        text: 'Heading 6',
        value: "H6",
    },
    {
        text: 'Blockquote',
        value: "BQ",
    },
    {
        text: 'Pullquote',
        value: "PQ",
    },
    {
        text: 'Learning Objective Item',
        value: "LO",
    }
]

export const FormatSelectors = function(callback){

    return FormatSelectorType.map((obj)=>{
        obj.type = 'menuitem';
        obj.onAction = function(){callback(obj.value)}
        return obj;
    });
}

export const elementTypeOptions = Object.freeze({
    'P' : {
        primaryOption : 'primary-paragraph',
        secondaryOption : 'secondary-paragraph',
        label : 'P',
    },
    'H1' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-1',
        label : 'H1',
    },
    'H2' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-2',
        label : 'H2',
    },
    'H3' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-3',
        label : 'H3',
    },
    'H4' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-4',
        label : 'H4',
    },
    'H5' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-5',
        label : 'H5',
    },
    'H6' : {
        primaryOption : 'primary-heading',
        secondaryOption : 'secondary-heading-6',
        label : 'H6',
    },
    'PQ' : {
        primaryOption : 'primary-blockquote',
        secondaryOption : 'secondary-pullquote',
        label : 'PQ',
    },
    'BQ' : {
        primaryOption : 'primary-blockquote',
        secondaryOption : 'secondary-marginalia-attribution',
        label : 'BQ',
    },
    'LO' : {
        primaryOption : 'primary-learning-objective',
        secondaryOption : 'secondary-learning-objective',
        label : 'LO',
    },
})

