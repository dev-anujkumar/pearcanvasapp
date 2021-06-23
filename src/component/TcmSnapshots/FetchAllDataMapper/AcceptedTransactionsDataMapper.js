import TCMUtils from '../../../js/tcmUtils';
import {setPopupKeys} from './PopupHelperFunction.js';
import FigureDataMapper from './FigureDataMapper';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const AcceptedTransactionsDataMapper = {
  getAcceptedTranscations(data, result) {
    const returnValue = result;
    let splitElementType = [];
    let acceptedSecondLevel = '';
    let parentElement = '';
    let popupDataKeys = {};
    let bodyTypeList=[];
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
    splitElementType = acceptedElementType.split(':');
    if (splitElementType.length > 3) {
      popupDataKeys = setPopupKeys(splitElementType)
      acceptedSecondLevel = popupDataKeys.pendingSecondLevel !== undefined ? popupDataKeys.pendingSecondLevel : "";
      parentElement = popupDataKeys.parentElement;
      acceptedElementType = popupDataKeys.finalChildElement
    }
    if (splitElementType.length === 3) {
      [parentElement, acceptedSecondLevel, acceptedElementType] = splitElementType;
      bodyTypeList=[acceptedSecondLevel];
    }
    if (splitElementType.length === 2) {
      [parentElement, acceptedElementType] = splitElementType;
    }
    elementChangeType = elementChangeType.toLowerCase();
    returnValue.elementChangeType = elementChangeType;
    returnValue.theme = elementChangeType === 'delete' ? 'deleted' : 'changeAccepted';
    returnValue.nextElementType = elementChangeType === 'create' || elementChangeType === 'update' ? acceptedElementType && TCMUtils.getElementType(acceptedElementType) : '';
    returnValue.prevElementType = elementChangeType === 'delete' ? acceptedElementType && TCMUtils.getElementType(acceptedElementType) : '';
    returnValue.acceptedSecondLevel = acceptedSecondLevel !== undefined ? acceptedSecondLevel : '';
    returnValue.parentElement = parentElement;
    returnValue.originalLastUpdatedTimestamp = lastUpdatedTimestamp;
    returnValue.lastUpdatedTimestamp = TCMUtils.formatDateTime(parseInt(lastUpdatedTimestamp, 10));
    returnValue.changeTime = TCMUtils.formatChangeDateTime(parseInt(changeTime, 10));
    if (JSON.parse(acceptedElementSnapshot).captions) {
      const figureData = FigureDataMapper.prepareAcceptedTransactionFigureData(JSON.parse(acceptedElementSnapshot))
      returnValue.figureContentDifference = figureData.lastAcceptedFigureContent;
      returnValue.lastAcceptedFigureContent = figureData.lastAcceptedFigureContent;
    }
    else {
      returnValue.contentDifference = JSON.parse(acceptedElementSnapshot).contentSnapshot;
      returnValue.lastAcceptedContent = JSON.parse(acceptedElementSnapshot).contentSnapshot;
    }
    
    returnValue.trackChangeApprover = authorName;
    returnValue.changeStatus = changeStatus.toLowerCase();
    let glossaryModifiedData = JSON.parse(JSON.parse(acceptedElementSnapshot).glossorySnapshot);
    let finalGlossary = [];
    glossaryModifiedData.forEach(data => {
      let temp = {
        glossaryId: data.glossaryId,
        glossaryTerm: data.glossaryTerm,
        glossaryNarrative: data.glossaryNarrative,
        glossaryDefinition: data.glossaryDefinition,
        status: true
      };
      finalGlossary.push(temp);
    });
    returnValue.glossorySnapshot = finalGlossary
    let footnoteModifiedData = JSON.parse(JSON.parse(acceptedElementSnapshot).footnoteSnapshot);
    let finalFootnote = [];
    if (footnoteModifiedData.length > 0) {
      footnoteModifiedData.forEach(data => {
        let temp = {
          footnoteId: data.footnoteId,
          footnote: data.footnote,
          status: true
        };
        finalFootnote.push(temp);
      });
    }
    returnValue.footnoteSnapshot = finalFootnote;
    returnValue.feedback = feedBackData;
    returnValue.elemIndex = parseInt(index);
    if (splitElementType.length > 3 && popupDataKeys) {
      returnValue.firstParentElement= popupDataKeys.firstParentElement !== undefined ? popupDataKeys.firstParentElement : '';
      returnValue.firstParentLevel= popupDataKeys.firstParentLevel !== undefined ? popupDataKeys.firstParentLevel : '';
      returnValue.popupElement= popupDataKeys.popupElement !== undefined ? popupDataKeys.popupElement : '';
      returnValue.popupBody= popupDataKeys.popupBody !== undefined ? popupDataKeys.popupBody : '';
      returnValue.secondParentElement= popupDataKeys.secondParentElement !== undefined ? popupDataKeys.secondParentElement : '';
      returnValue.secondParentLevel= popupDataKeys.secondParentLevel !== undefined ? popupDataKeys.secondParentLevel : '';
      returnValue.finalChildElement= popupDataKeys.finalChildElement !== undefined ? TCMUtils.getElementType(popupDataKeys.finalChildElement) : '';
      bodyTypeList = popupDataKeys.bodyTypeList && popupDataKeys.bodyTypeList.length > 0 ? popupDataKeys.bodyTypeList : [];
    }
    returnValue.bodyTypeList = bodyTypeList && bodyTypeList.length > 0 ? bodyTypeList : [];
    returnValue.elementTag = splitElementType
    return returnValue;
  },
};

export default AcceptedTransactionsDataMapper;
