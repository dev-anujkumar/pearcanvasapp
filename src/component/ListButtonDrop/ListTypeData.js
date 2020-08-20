export const LIST_DATA = Object.freeze({
    decimal : [
        {value : '1'},
        {value : '2'},
        {value : '3'}
    ],
    upperAlpha : [
        {value : 'A'},
        {value : 'B'},
        {value : 'C'}
    ],
    lowerAlpha : [
        {value : 'a'},
        {value : 'b'},
        {value : 'c'}
    ],
    upperRoman : [
        {value : 'I', class : 'list-roman-text'},
        {value : 'II', class : 'list-roman-text'},
        {value : 'III'}
    ],
    lowerRoman : [
        {value : 'i', class : 'list-roman-text'},
        {value : 'ii', class : 'list-roman-text'},
        {value : 'iii'}
    ]
})

export const LIST_TYPE = Object.freeze({
    DECIMAL : 'decimal',
    UPPER_ALPHA : 'upperAlpha',
    LOWER_ALPHA : 'lowerAlpha',
    UPPER_ROMAN : 'upperRoman',
    LOWER_ROMAN : 'lowerRoman',
})