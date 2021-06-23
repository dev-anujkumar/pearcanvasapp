import TCMUtils from '../../../js/tcmUtils';

const FigureDataMapper = {
    prepareLatestTransactionFigureData: (acceptedElementSnapshot, pendingElementSnapshot) => {
        let figureContentDifference = {
            title: TCMUtils.getDiffContent(acceptedElementSnapshot.title, pendingElementSnapshot.title),
            subtitle: TCMUtils.getDiffContent(acceptedElementSnapshot.subtitle, pendingElementSnapshot.subtitle),
            captions: TCMUtils.getDiffContent(acceptedElementSnapshot.captions, pendingElementSnapshot.captions),
            credits: TCMUtils.getDiffContent(acceptedElementSnapshot.credits, pendingElementSnapshot.credits)
        }
        let lastAcceptedFigureContent = Object.assign({}, pendingElementSnapshot);
        let acceptedFigureContentBeforeChange = Object.assign({}, acceptedElementSnapshot);
        if (pendingElementSnapshot.itemTitle) {
            figureContentDifference.itemTitle = TCMUtils.getDiffContent(acceptedElementSnapshot.itemTitle, pendingElementSnapshot.itemTitle)
        }
        if (pendingElementSnapshot.itemID) {
            figureContentDifference.itemID = TCMUtils.getDiffContent(acceptedElementSnapshot.itemID, pendingElementSnapshot.itemID)
        }
        if (pendingElementSnapshot.metadata) {
            figureContentDifference.metadata = TCMUtils.getDiffContent(acceptedElementSnapshot.metadata, pendingElementSnapshot.metadata)
        }
        if (pendingElementSnapshot.itemButtonLabel) {
            let oldContent = acceptedElementSnapshot.itemButtonLabel ? acceptedElementSnapshot.itemButtonLabel : "<p></p>";
            figureContentDifference.itemButtonLabel = TCMUtils.getDiffContent(oldContent, pendingElementSnapshot.itemButtonLabel)
        }
        if (pendingElementSnapshot.codeblock) {
            figureContentDifference.codeblock = TCMUtils.getDiffContent(acceptedElementSnapshot.codeblock, pendingElementSnapshot.codeblock)
            lastAcceptedFigureContent.codeblock = pendingElementSnapshot.codeblock
            acceptedFigureContentBeforeChange.codeblock = acceptedElementSnapshot.codeblock
        }
        return {
            figureContentDifference, lastAcceptedFigureContent, acceptedFigureContentBeforeChange
        }
    },
    preparePendingTransactionFigureData: (acceptedValue, pendingElementSnapshot) => {
        let figureContentDifference = {
            title: TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.title),
            subtitle: TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.subtitle),
            captions: TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.captions),
            credits: TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.credits)
        }
        if (pendingElementSnapshot.itemTitle) {
            figureContentDifference.itemTitle = TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.itemTitle);
        }
        if (pendingElementSnapshot.itemID) {
            figureContentDifference.itemID = TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.itemID);
        }
        if (pendingElementSnapshot.metadata) {
            figureContentDifference.metadata = TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.metadata);
        }
        if (pendingElementSnapshot.itemButtonLabel) {
            figureContentDifference.itemButtonLabel = TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.itemButtonLabel);
        }
        let lastAcceptedFigureContent = Object.assign({}, pendingElementSnapshot);
        if (pendingElementSnapshot.codeblock) {
            figureContentDifference.codeblock = TCMUtils.getDiffContent(acceptedValue, pendingElementSnapshot.codeblock);
            lastAcceptedFigureContent.codeblock = pendingElementSnapshot.codeblock;
        }

        return {
            figureContentDifference, lastAcceptedFigureContent
        }
    },
    prepareAcceptedTransactionFigureData: (acceptedElementSnapshot) => {
        let lastAcceptedFigureContent = Object.assign({}, acceptedElementSnapshot);
        return {
            lastAcceptedFigureContent
        }
    }
}

export default FigureDataMapper;