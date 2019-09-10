import { CONTENT_STYLE } from './TinymceDefaultCss'
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
        'BQ': { block: 'blockquote', classes: 'blockquoteMarginalia', wrapper: true},
        'PQ': { block: 'h3', classes: 'pullQuoteNumeroUno' },
        'MA': { block: 'blockquote', classes: 'blockquoteMarginaliaAttr', wrapper: true },
        'LO': { block: 'h2', classes: 'heading2learningObjectiveItem' }
    },
    toolbar: 'undo redo| bold italic underline strikethrough removeformat| alignleft aligncenter alignright alignjustify outdent indent numlist bullist | superscript subscript jsplus_special_symbols ',
    contentStyle: CONTENT_STYLE,
    plugins: "lists advlist placeholder"
}

export const GlossaryFootnoteEditorConfig = {
    formats: {
        'paragraph': { block: 'p', classes: 'paragraphNumeroUno' },
    },
    toolbar: 'bold | italic | underline | strikethrough | removeformat| superscript | subscript ',
    //contentStyle: CONTENT_STYLE,
    plugins: "placeholder"
}