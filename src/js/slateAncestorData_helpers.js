/**
 * This functions sets the current slate ancestor data
 * @param {*} apiData 
 * @param {*} slateEntityUrn 
 * @returns SlatesList
 */
export const getCurrentSlatesList = async (allSlateData, slateMatterType, currentParentUrn) => {
    const currentMatterData = allSlateData[slateMatterType]
    const slatesList = await fetchCurrentContainerSlateList(currentMatterData, currentParentUrn.toLowerCase())
    console.log('slatesList', slatesList)
}

const fetchCurrentContainerSlateList = (currentMatterData, currentParentUrn, slatesList = []) => {
    switch (currentParentUrn) {
        case 'frontmatter':
        case 'backmatter':
            slatesList = getSlatesinFMandBM(currentMatterData, slatesList)
            break;
        default:
            slatesList = getSlatesinBodymatter(currentMatterData, slatesList)
            break;
    }
    return slatesList
}


const getSlatesinBodymatter = (currentMatterData, currentParentUrn, slatesList) => {
    if (currentMatterData?.length > 0) {
        const isParentatLevel1 = currentMatterData.findIndex(item => item.entityUrn === currentParentUrn)
        if (isParentatLevel1 > -1) { //part IS, chapter
            const currentContainerData = currentMatterData[isParentatLevel1]
            slatesList = getSlatesinFMandBM(currentContainerData, slatesList)
        } else if (currentMatterData.label == 'part' && currentMatterData.contents?.length > 0) {
            const isParentatLevel2 = currentMatterData.contents.findIndex(item2 => item2.entityUrn === currentParentUrn)
            if (isParentatLevel2 > -1) {  //chapter in part 
                const currentContainerData = currentMatterData[isParentatLevel2]
                slatesList = getSlatesinFMandBM(currentContainerData, slatesList)
            }
        } else if (currentMatterData.label == 'volume') {
            if (currentMatterData?.contents?.length > 0) {
                currentMatterData?.forEach(item2 => {
                    const isParentatLevel3 = currentMatterData.contents.findIndex(item3 => item3.entityUrn === currentParentUrn)
                    if (isParentatLevel3 > -1) { //part IS in volume, chapter
                        const currentContainerData = currentMatterData[isParentatLevel3]
                        slatesList = getSlatesinFMandBM(currentContainerData, slatesList)
                    }
                    else if (item2?.label == 'part' && item2?.contents?.length > 0) { //chapter in part in volume
                        const isParentatLevel4 = item2.contents.findIndex(item4 => item4.entityUrn === currentParentUrn)
                        if (isParentatLevel4 > -1) { //part IS in volume, chapter
                            const currentContainerData = currentMatterData[isParentatLevel4]
                            slatesList = getSlatesinFMandBM(currentContainerData, slatesList)
                        }
                    }
                })
            }
        }
    }
    return slatesList
}

const getSlatesinFMandBM = (currentMatterData, slatesList) => {
    if (currentMatterData?.length > 0) {
        currentMatterData?.forEach(container => {
            if (container?.label !== 'module' && container?.label !== 'appendix') {
                slatesList.push(setItemDetails(container))
            }
            else if (container?.contents?.length > 0) {
                slatesList = getSlatesinFMandBM(container.contents, slatesList)
            }
        })
    }
    return slatesList
}
/**
 * @function setItemDetails
 * @description-This function is to prepare details for an item
 * @param {Object} item
 * @returns {Object}  
*/
const setItemDetails = (item) => {
    return {
        contentUrn: item?.entityUrn,
        label: item?.label
    }
}