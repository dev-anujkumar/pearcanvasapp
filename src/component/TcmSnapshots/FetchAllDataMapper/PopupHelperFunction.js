export const setPopupKeys = (splitElementType) => {
    let pendingSecondLevel = '';
    let parentElement = '';
    let firstParentLevel = '';
    let secondParentLevel = '';
    let firstParentElement = '';
    let secondParentElement = '';
    let popupElement = '';
    let popupBody = '';
    let pendingElementType = '';
    let finalChildElement = '';
    let bodyTypeList = [];
    // let nextElementType='';
    switch (splitElementType.length) {
        case 7:/** WE: BODY: POP : BODY: WE : BODY : P */
            {
                [firstParentElement, firstParentLevel, popupElement, popupBody, secondParentElement, secondParentLevel, finalChildElement] = splitElementType;
                parentElement = firstParentElement
                pendingSecondLevel = firstParentLevel
                pendingElementType = finalChildElement
            }
            break;
        case 6:
            {
                if (splitElementType[0] == 'WE') {/** WE: BODY: POP : BODY: AS: P */
                    [firstParentElement, firstParentLevel, popupElement, popupBody, secondParentElement, finalChildElement] = splitElementType;
                } else if (splitElementType[0] == 'AS') {   /** AS: POP : BODY: WE : BODY : P */
                    [firstParentElement, popupElement, popupBody, secondParentElement, secondParentLevel, finalChildElement] = splitElementType;
                }
                parentElement = firstParentElement
                pendingSecondLevel = firstParentLevel
                pendingElementType = finalChildElement
            }
            break;
        case 5:
            {
                switch (splitElementType[0]) {
                    case 'AS':/** AS: POP : BODY:  AS: P */
                        [firstParentElement, popupElement, popupBody, secondParentElement, finalChildElement] = splitElementType;
                        parentElement = firstParentElement
                        break;
                    case 'WE':/** WE: BODY: POP : HEAD: CTA */
                        [firstParentElement, firstParentLevel, popupElement, popupBody, finalChildElement] = splitElementType;
                        parentElement = firstParentElement
                        pendingSecondLevel = firstParentLevel
                        break;
                    case 'POP':/** POP : BODY: WE : BODY : P */ /** POP : BODY: 2C : C1 : P */
                        [popupElement, popupBody, secondParentElement, secondParentLevel, finalChildElement] = splitElementType;
                        parentElement = popupElement
                        pendingSecondLevel = popupBody
                        break;
                }
                pendingElementType = finalChildElement
            }
            break;
        case 4:
            {
                if (splitElementType[0] == 'AS') {/** AS: POP : HEAD: CTA */
                    [firstParentElement, popupElement, popupBody, finalChildElement] = splitElementType;
                    parentElement = firstParentElement
                } else if (splitElementType[0] == 'POP') { /** POP : BODY:  AS: P */
                    [popupElement, popupBody, secondParentElement, finalChildElement] = splitElementType;
                    parentElement = popupElement
                    pendingSecondLevel = popupBody
                } else if (splitElementType[0] == 'WE' && splitElementType[2] == 'SH') {
                    finalChildElement = splitElementType[3]
                }
                pendingElementType = finalChildElement
            }
            break;
        case 3:
            if(splitElementType[1] == 'SH'){/** AS: SH : Show */
                [firstParentElement, secondParentElement, pendingElementType] = splitElementType;
            }else{
                [parentElement, pendingSecondLevel, pendingElementType] = splitElementType;
            }            
            break;
        case 2:
        default:
            [parentElement, pendingElementType] = splitElementType;
            break;
        /**   TO BE CATERED LATER
        case 1:
        default:
            pendingElementType = splitElementType
            break;
            */
    }
    bodyTypeList.push(firstParentLevel, popupBody, secondParentLevel)
    if (splitElementType.length > 2) {
        return {
            pendingSecondLevel: pendingSecondLevel,
            parentElement: parentElement,
            firstParentLevel: firstParentLevel,
            secondParentLevel: secondParentLevel,
            firstParentElement: firstParentElement,
            secondParentElement: secondParentElement,
            popupElement: popupElement,
            popupBody: popupBody,
            finalChildElement: finalChildElement,
            bodyTypeList: bodyTypeList,
            pendingElementType:pendingElementType
        }
    }
     else{
        return {
            parentElement: parentElement,
            pendingElementType:pendingElementType
        }
    }
}

export const removeExtraKeys = (elementTag) => {
    let urnToRemove = [];
    const removeUrns = ['BODY','C1','C2'];
    switch (elementTag.length) {
        case 8:/** WE: BODY: POP : BODY: WE : BODY : SH : Show *//**we:body:pop:we:body:sh:show */
        case 7:/** WE: BODY: POP : BODY: WE : BODY : P *//** AS:POP:BODY:WE:BODY:SH:Show */
            if (elementTag[0] !== 'AS' || elementTag.length == 8) {
                if (elementTag[1] == 'BODY') {
                    urnToRemove = ['1']
                }
                if ((removeUrns.indexOf(elementTag[5]) > -1 ) && elementTag[1] == 'BODY') {
                    urnToRemove.push('4')
                } else if ((removeUrns.indexOf(elementTag[5]) > -1 ) && elementTag[1] == 'HEAD') {
                    urnToRemove.push('3')
                }
            } else {
                if (elementTag[4] == 'BODY') {
                    urnToRemove = ['3']
                }
            }
            break;
        case 6: 
            if (elementTag[0] == 'WE' && elementTag[1] == 'BODY') {/** WE: BODY: POP : BODY: AS: P */
                urnToRemove = ['1']
            } else if (elementTag[0] == 'AS' && (elementTag[4] != 'HEAD' && elementTag[4] != 'SH')) {   /** AS: POP : BODY: WE : BODY : P */
                urnToRemove = ['3']                                                                     /** AS: POP : BODY: AS : SH : Show */
            }
            else if (elementTag[0] == 'POP' && (elementTag[3] == 'BODY')) {   /** AS: POP : BODY: WE : BODY : P */
                urnToRemove = ['3']
            }
            break;
        case 5:
            if (elementTag[0] == 'WE' && elementTag[1] == 'BODY') {/** WE: BODY: POP : BODY: P */
                urnToRemove = ['1']
            } else if (elementTag[0] == 'POP' && (removeUrns.indexOf(elementTag[3]) > -1 )) {/** POP : BODY: WE : BODY : P */ /** POP : BODY: 2C : C1 : P */
                urnToRemove = ['2']
            }
            break;
        case 4:/** AS: POP : HEAD: CTA | POP : BODY:  AS: P */
            if (elementTag[0] == 'WE' && elementTag[1] == 'BODY') {/**WE: BODY: SH: Show */
                urnToRemove = ['1'];
            }
            break;
        case 3:
            if ((elementTag[0] == 'WE' && elementTag[1] == 'BODY') || elementTag[0] == '2C') {/** WE: BODY: P */
                urnToRemove = ['1']
            }
            break;
        case 2:/** AS: P */
        case 1:
        default:
            urnToRemove = []
            break;
    }
    return urnToRemove
}