import TCMUtils from '../../../js/tcmUtils';
import GlossaryDataMapper from './GlossaryDataMapper';
import FootnotesDataMapper from './FootnotesDataMapper';
import FigureDataMapper from './FigureDataMapper';
import { setPopupKeys } from './PopupHelperFunction';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const LatestTransactionsDataMapper = {
  getGlossaryData(glossaryDataCurrent, glossaryDataPrevious) {
    return GlossaryDataMapper.getGlossaryData(glossaryDataCurrent, glossaryDataPrevious);
  },

  getFootnotesData(footnoteDataCurrent, footnoteDataPrevious) {
    return FootnotesDataMapper.getFootnotesData(footnoteDataCurrent, footnoteDataPrevious);
  },

  getLatestTransactions(data, pResult) {
    const result = pResult;
    let acceptedElementTypeSplitArray = [];
    let pendingElementTypeSplitArray = [];
    let pendingSecondLevel = '';
    let acceptedSecondLevel ='';
    let parentElement = '';
    let popupDataKeysAccepted ='' ;
    let popupDataKeysPending='';
    let bodyTypeList=[];
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
    acceptedElementTypeSplitArray = acceptedElementType.split(':');
    pendingElementTypeSplitArray = pendingElementType.split(':');
    elementChangeType = elementChangeType.toLowerCase();
    if (acceptedElementTypeSplitArray.length> 3) {
      popupDataKeysAccepted = setPopupKeys(acceptedElementTypeSplitArray)
      acceptedSecondLevel = popupDataKeysAccepted.pendingSecondLevel
      parentElement = popupDataKeysAccepted.parentElement
      acceptedElementType = popupDataKeysAccepted.finalChildElement
    }
    if (pendingElementTypeSplitArray.length> 3) {
      popupDataKeysPending = setPopupKeys(pendingElementTypeSplitArray)
      pendingSecondLevel = popupDataKeysPending.pendingSecondLevel
      parentElement = popupDataKeysPending.parentElement
      pendingElementType = popupDataKeysPending.finalChildElement
    }
    if (pendingElementTypeSplitArray.length === 3) {
      [parentElement, , acceptedElementType] = acceptedElementTypeSplitArray;
    }
    if (pendingElementTypeSplitArray.length === 3) {
      [parentElement, pendingSecondLevel, pendingElementType] = pendingElementTypeSplitArray;
      bodyTypeList=[pendingSecondLevel]
    }
    if (acceptedElementTypeSplitArray.length === 2) {
      [parentElement, acceptedElementType] = acceptedElementTypeSplitArray;
    }
    if (pendingElementTypeSplitArray.length === 2) {
      [parentElement, pendingElementType] = pendingElementTypeSplitArray;
    }
    if (acceptedElementType !== pendingElementType) {
      result.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : acceptedElementType && TCMUtils.getElementType(acceptedElementType);
    } else {
      result.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
    }

    result.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';

    result.theme = elementChangeType === 'create' ? 'new' : elementChangeType === 'delete' ? 'deleted' : '';
    if (JSON.parse(pendingElementSnapshot).captions) {
      const figureData = FigureDataMapper.prepareLatestTransactionFigureData(JSON.parse(acceptedElementSnapshot),JSON.parse(pendingElementSnapshot))

      result.lastAcceptedFigureContent = figureData.lastAcceptedFigureContent;
      result.acceptedFigureContentBeforeChange = figureData.acceptedFigureContentBeforeChange;
      result.figureContentDifference = figureData.figureContentDifference
    } else {
      result.lastAcceptedContent = JSON.parse(pendingElementSnapshot).contentSnapshot;
      result.acceptedContentBeforeChange = JSON.parse(acceptedElementSnapshot).contentSnapshot;
      result.contentDifference = TCMUtils.getDiffContent(
        JSON.parse(acceptedElementSnapshot).contentSnapshot,
        JSON.parse(pendingElementSnapshot).contentSnapshot,
      );
      const showHideListCondition = ["Show", "Hide"].includes(result.nextElementType) && 
        result.lastAcceptedContent.includes(`<p class="paragraphNumeroUno">`) && 
        (result.acceptedContentBeforeChange.includes("<ul") || result.acceptedContentBeforeChange.includes("<ol")) && 
        result.acceptedContentBeforeChange.includes("treelevel")

      if (result.prevElementType != "OL" && result.prevElementType != "UL" && !showHideListCondition) {
        result.contentDifference = TCMUtils.getDiffContent(
          TCMUtils.replaceParentTag(JSON.parse(acceptedElementSnapshot).contentSnapshot, JSON.parse(pendingElementSnapshot).contentSnapshot),
          JSON.parse(pendingElementSnapshot).contentSnapshot,
        );
      }
    }
    
    
    result.elementChangeType = elementChangeType;
    result.feedback = feedBackData;
    result.trackChangeApprover = autthorName;
    result.originalLastUpdatedTimestamp = timeStamp;
    result.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(timeStamp, 10));
    result.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));
    result.pendingSecondLevel = pendingSecondLevel !== undefined ? pendingSecondLevel : '';
    result.parentElement = parentElement;

    if ((pendingElementTypeSplitArray.length > 3 || acceptedElementTypeSplitArray.length > 3) && popupDataKeysPending) {
      result.firstParentElement = popupDataKeysPending.firstParentElement !== undefined ? popupDataKeysPending.firstParentElement : '';
      result.firstParentLevel = popupDataKeysPending.firstParentLevel !== undefined ? popupDataKeysPending.firstParentLevel : '';
      result.popupElement = popupDataKeysPending.popupElement !== undefined ? popupDataKeysPending.popupElement : '';
      result.popupBody = popupDataKeysPending.popupBody !== undefined ? popupDataKeysPending.popupBody : '';
      result.secondParentElement = popupDataKeysPending.secondParentElement !== undefined ? popupDataKeysPending.secondParentElement : '';
      result.secondParentLevel = popupDataKeysPending.secondParentLevel !== undefined ? popupDataKeysPending.secondParentLevel : '';
      result.finalChildElement = popupDataKeysPending.finalChildElement !== undefined ? TCMUtils.getElementType(popupDataKeysPending.finalChildElement) : '';
      bodyTypeList = popupDataKeysPending.bodyTypeList && popupDataKeysPending.bodyTypeList.length > 0 ? popupDataKeysPending.bodyTypeList : [];
    }
    result.bodyTypeList = bodyTypeList && bodyTypeList.length > 0 ? bodyTypeList : [];
    const objAcceptedElementSnapshot = JSON.parse(acceptedElementSnapshot);
    const objPendingElementSnapshot = JSON.parse(pendingElementSnapshot);

    result.glossorySnapshot = this.getGlossaryData(JSON.parse(objAcceptedElementSnapshot.glossorySnapshot), JSON.parse(objPendingElementSnapshot.glossorySnapshot));

    result.footnoteSnapshot = this.getFootnotesData(JSON.parse(objAcceptedElementSnapshot.footnoteSnapshot), JSON.parse(objPendingElementSnapshot.footnoteSnapshot));
    result.elemIndex = parseInt(index);
    result.elementTag = pendingElementTypeSplitArray
    return result;
  }
};

export default LatestTransactionsDataMapper;
