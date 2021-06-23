import TCMUtils from '../../../js/tcmUtils.js';
import GlossaryDataMapper from './GlossaryDataMapper';
import FootnotesDataMapper from './FootnotesDataMapper';
import FigureDataMapper from './FigureDataMapper';
import {setPopupKeys} from './PopupHelperFunction';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const PendingTransactionsDataMapper = {
  getPendingTranscations(data, result) {
    const returnValue = result;
    const acceptedValue = '';
    let splitElementType = [];
    let pendingSecondLevel = '';
    let parentElement = '';
    let popupDataKeys = {};
    let bodyTypeList=[];
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
    splitElementType = pendingElementType.split(':');
    if (splitElementType.length > 1) {
      popupDataKeys = setPopupKeys(splitElementType)
      pendingSecondLevel = popupDataKeys.pendingSecondLevel !== undefined ? popupDataKeys.pendingSecondLevel : "";
      parentElement = popupDataKeys.parentElement
      pendingElementType=popupDataKeys.pendingElementType
    }
    // if (splitElementType.length === 3) {
    //   [parentElement, pendingSecondLevel, pendingElementType] = splitElementType;
    //   bodyTypeList=[pendingSecondLevel]
    // }
    // if (splitElementType.length === 2) {
    //   [parentElement, pendingElementType] = splitElementType;
    // }
    elementChangeType = elementChangeType.toLowerCase();
    returnValue.elementChangeType = elementChangeType;
    returnValue.theme = elementChangeType === 'create' ? 'new' : elementChangeType === 'delete' ? 'deleted' : '';
    returnValue.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
    returnValue.prevElementType = elementChangeType === 'delete' ? pendingElementType && TCMUtils.getElementType(pendingElementType) : '';
    if(JSON.parse(pendingElementSnapshot).captions){
      const figureData = FigureDataMapper.preparePendingTransactionFigureData(acceptedValue, JSON.parse(pendingElementSnapshot));
      returnValue.figureContentDifference = figureData.figureContentDifference
      returnValue.lastAcceptedFigureContent = figureData.lastAcceptedFigureContent;
    }else{
      returnValue.contentDifference = TCMUtils.getDiffContent(
        acceptedValue,
        JSON.parse(pendingElementSnapshot).contentSnapshot,
      );
      returnValue.lastAcceptedContent = JSON.parse(pendingElementSnapshot).contentSnapshot;
    }
   
    returnValue.pendingSecondLevel = pendingSecondLevel !== undefined ? pendingSecondLevel : '';
    returnValue.parentElement = parentElement;
    returnValue.originalLastUpdatedTimestamp = lastUpdatedTimestamp;
    returnValue.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(lastUpdatedTimestamp, 10));
    returnValue.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));
    returnValue.glossorySnapshot =GlossaryDataMapper.getPendingGlossaryTransactionDifference(JSON.parse(JSON.parse(pendingElementSnapshot).glossorySnapshot));
    returnValue.footnoteSnapshot = FootnotesDataMapper.getPendingFootnoteDifference(JSON.parse(JSON.parse(pendingElementSnapshot).footnoteSnapshot));
    returnValue.feedback = feedBackData;
    returnValue.trackChangeApprover = authorName;
    returnValue.changeStatus = changeStatus;
    returnValue.elemIndex=parseInt(index);
    returnValue.onlyPendingTransaction = true;
    if (splitElementType.length > 1 && popupDataKeys) {
      returnValue.firstParentElement = popupDataKeys.firstParentElement !== undefined ? popupDataKeys.firstParentElement : '';
      returnValue.firstParentLevel = popupDataKeys.firstParentLevel !== undefined ? popupDataKeys.firstParentLevel : '';
      returnValue.popupElement = popupDataKeys.popupElement !== undefined ? popupDataKeys.popupElement : '';
      returnValue.popupBody = popupDataKeys.popupBody !== undefined ? popupDataKeys.popupBody : '';
      returnValue.secondParentElement = popupDataKeys.secondParentElement !== undefined ? popupDataKeys.secondParentElement : '';
      returnValue.secondParentLevel = popupDataKeys.secondParentLevel !== undefined ? popupDataKeys.secondParentLevel : '';
      returnValue.finalChildElement = popupDataKeys.finalChildElement !== undefined ? TCMUtils.getElementType(popupDataKeys.finalChildElement) : '';
      bodyTypeList = popupDataKeys.bodyTypeList && popupDataKeys.bodyTypeList.length > 0 ? popupDataKeys.bodyTypeList : [];
      returnValue.pendingElementType = popupDataKeys.pendingElementType !== undefined ? popupDataKeys.pendingElementType : '';
    }
    returnValue.bodyTypeList = bodyTypeList && bodyTypeList.length > 0 ? bodyTypeList : [];
    returnValue.elementTag = splitElementType
    return returnValue;
  },

  
};

export default PendingTransactionsDataMapper;
