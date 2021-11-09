/**
 * Index Mapper is responsible for sorting all canvas elements as per cypress ordering.
 * returns  data
 */
 const OrderElementsDataMapper = {
    processIndexOfElements(indexArray, flattenedIndexOfElements) {
        indexArray.forEach(a => {
            if (a.child) {
                flattenedIndexOfElements.push({ index: a.index, urn: a.urn })
                this.processIndexOfElements(a.child, flattenedIndexOfElements)
            }
            else {
                flattenedIndexOfElements.push(a)
            }
        })
    },
    sortSimpleElements(processedResponse, indexOfElements) {
        const flattenedIndexOfElements = [];
        this.processIndexOfElements(indexOfElements, flattenedIndexOfElements);
        processedResponse.map((element) => {
            this.setIndexForNonContainerElements(element, flattenedIndexOfElements)
        });
        return processedResponse;
    },
    setIndexForNonContainerElements(element, flattenedIndexOfElements, isNested) {
        const isDeleteElement = element.elementChangeType && element.elementChangeType.toLowerCase() === 'delete' ? true : false;
        if (isDeleteElement) { /** Remove deleted elements' indexes */
            delete element.elemIndex;
        }
        flattenedIndexOfElements.forEach((value) => {
            if (isNested && element.elementChangeType && !isDeleteElement) {
                const dataAtIndex = flattenedIndexOfElements.find(item => item.urn == element.elementURN && element.elementURN[element.elementURN?.length - 1]);
                const indexValue = dataAtIndex ? dataAtIndex.index : NaN;
                element.elemIndex = indexValue;
            } else if (element.elementID === value.urn && !isDeleteElement) {
                element.elemIndex = value.index;
            }
        });
    }
};

export default OrderElementsDataMapper;