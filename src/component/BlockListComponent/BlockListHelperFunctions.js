const fetchLiClassName = (subtype) => {
    switch (subtype) {
        case 'decimal':
            return 'listItemNumeroUnoNumber'
        case 'lower-alpha':
            return 'listItemNumeroUnoLowerAlpha'
        case 'lower-roman':
            return 'listItemNumeroUnoLowerRoman'
        case 'upper-alpha':
            return 'listItemNumeroUnoUpperAlpha'
        case 'upper-roman':
            return 'listItemNumeroUnoUpperRoman'
        case 'unordered':
            return 'listItemNumeroUnoBullet'
        default:
            return 'listItemNumeroUnoNumber'
    }
}


export { fetchLiClassName };
