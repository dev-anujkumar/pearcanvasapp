const fetchLiClassName = (subtype) => {
    switch (subtype) {
        case 'decimal':
            return 'listItemNumeroUnoNumber'
        case 'lower-alpha':
            return 'listItemNumeroUnoLowerAlpha'
        case 'lower-roman':
            return 'listItemNumeroUnoLowerRoman'
        case 'unordered':
            return 'reset listItemNumeroUnoBullet listItemNumeroUnoDisc'
        default:
            return 'listItemNumeroUnoNumber'
    }
}


export { fetchLiClassName };