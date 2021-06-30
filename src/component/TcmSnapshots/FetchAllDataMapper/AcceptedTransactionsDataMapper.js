import TCMUtils from '../../../js/tcmUtils';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const AcceptedTransactionsDataMapper = {
  getAcceptedTranscations(data, result) {
    const returnValue = result;
      let {
      latestAcceptedTransaction: {
        elemSnapshot: acceptedElementSnapshot,
        elementType: acceptedElementType,
        changeType: elementChangeType,
        trackChangeApprover: authorName,
        changeStatus,
        lastUpdatedTimestamp,
        feedback: feedBackData,
        index,
        changeTime
      },
    } = data;

    // replacing the &nbsp; with space character
    acceptedElementSnapshot = TCMUtils.replaceNBSPWithSpace(acceptedElementSnapshot);
    elementChangeType = elementChangeType.toLowerCase();
    returnValue.elementChangeType = elementChangeType;
    returnValue.theme = elementChangeType === 'delete' ? 'deleted' : 'changeAccepted';
    returnValue.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? acceptedElementType && TCMUtils.getElementType(acceptedElementType) : '';
    returnValue.prevElementType = elementChangeType === 'delete' ? acceptedElementType && TCMUtils.getElementType(acceptedElementType) : '';
    returnValue.originalLastUpdatedTimestamp = lastUpdatedTimestamp;
    returnValue.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(lastUpdatedTimestamp, 10));
    returnValue.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));

      returnValue.contentDifference = JSON.parse(acceptedElementSnapshot).contentSnapshot;
      returnValue.lastAcceptedContent = JSON.parse(acceptedElementSnapshot).contentSnapshot;
    
    returnValue.trackChangeApprover = authorName;
    returnValue.changeStatus = changeStatus.toLowerCase();
    returnValue.feedback = feedBackData;
    returnValue.elemIndex = parseInt(index);
    return returnValue;
  },
};

export default AcceptedTransactionsDataMapper;
