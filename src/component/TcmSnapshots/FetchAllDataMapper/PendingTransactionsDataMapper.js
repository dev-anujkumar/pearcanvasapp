import TCMUtils from '../../../js/tcmUtils.js';

/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const PendingTransactionsDataMapper = {
  getPendingTranscations(data, result) {
    const returnValue = result;
    const acceptedValue = '';
    let {
      latestPendingTransaction: {
        elemSnapshot: pendingElementSnapshot,
        elementType: pendingElementType,
        changeType: elementChangeType,
        lastUpdatedTimestamp,
        feedback: feedBackData,
        trackChangeApprover: authorName,
        index, changeStatus, changeTime,
      },
    } = data;
    pendingElementSnapshot = TCMUtils.replaceNBSPWithSpace(pendingElementSnapshot);
    elementChangeType = elementChangeType.toLowerCase();
    returnValue.elementChangeType = elementChangeType;
    returnValue.theme = elementChangeType === 'create' ? 'new' : elementChangeType === 'delete' ? 'deleted' : '';
    returnValue.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
    returnValue.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
      returnValue.contentDifference = TCMUtils.getDiffContent(
        acceptedValue,
        JSON.parse(pendingElementSnapshot).contentSnapshot,
      );
      returnValue.lastAcceptedContent = JSON.parse(pendingElementSnapshot).contentSnapshot;
    returnValue.originalLastUpdatedTimestamp = lastUpdatedTimestamp;
    returnValue.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(lastUpdatedTimestamp, 10));
    returnValue.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));
    returnValue.feedback = feedBackData;
    returnValue.trackChangeApprover = authorName;
    returnValue.changeStatus = changeStatus;
    returnValue.elemIndex=parseInt(index);
    returnValue.onlyPendingTransaction = true;
    return returnValue;
  },

  
};

export default PendingTransactionsDataMapper;
