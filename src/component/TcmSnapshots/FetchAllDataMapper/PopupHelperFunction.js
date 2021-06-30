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