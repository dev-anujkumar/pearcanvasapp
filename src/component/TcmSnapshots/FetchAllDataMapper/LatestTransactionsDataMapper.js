import TCMUtils from '../../../js/tcmUtils';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const LatestTransactionsDataMapper = {
  getLatestTransactions(data, pResult) {
    const result = pResult;
    let {
      latestAcceptedTransaction:
      {
        elemSnapshot: acceptedElementSnapshot,
        elementType: acceptedElementType,
      },
      latestPendingTransaction:
          {
            elemSnapshot: pendingElementSnapshot,
            elementType: pendingElementType,
            changeType: elementChangeType,
            feedback: feedBackData,
            trackChangeApprover: autthorName,
            lastUpdatedTimestamp: timeStamp,
            index,
            changeTime
          },
    } = data;

    // replacing the &nbsp; with space character
    acceptedElementSnapshot = TCMUtils.replaceNBSPWithSpace(acceptedElementSnapshot);

  // replacing the &nbsp; with space character
  pendingElementSnapshot = TCMUtils.replaceNBSPWithSpace(pendingElementSnapshot);
    if (acceptedElementType !== pendingElementType) {
      result.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : acceptedElementType && TCMUtils.getElementType(acceptedElementType);
    } else {
      result.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
    }

    result.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';

    result.theme = elementChangeType === 'create' ? 'new' : elementChangeType === 'delete' ? 'deleted' : '';
      result.lastAcceptedContent = JSON.parse(pendingElementSnapshot).contentSnapshot;
      result.acceptedContentBeforeChange = JSON.parse(acceptedElementSnapshot).contentSnapshot;
      result.contentDifference = TCMUtils.getDiffContent(
        JSON.parse(acceptedElementSnapshot).contentSnapshot,
        JSON.parse(pendingElementSnapshot).contentSnapshot,
      );
      if (result.prevElementType != "OL" && result.prevElementType != "UL") {
        result.contentDifference = TCMUtils.getDiffContent(
          TCMUtils.replaceParentTag(JSON.parse(acceptedElementSnapshot).contentSnapshot, JSON.parse(pendingElementSnapshot).contentSnapshot),
          JSON.parse(pendingElementSnapshot).contentSnapshot,
        );
      }
    result.elementChangeType = elementChangeType;
    result.feedback = feedBackData;
    result.trackChangeApprover = autthorName;
    result.originalLastUpdatedTimestamp = timeStamp;
    result.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(timeStamp, 10));
    result.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));
    result.elemIndex = parseInt(index);
    return result;
  }
};

export default LatestTransactionsDataMapper;
