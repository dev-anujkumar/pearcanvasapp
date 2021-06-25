import PendingTransactionsDataMapper from './PendingTransactionsDataMapper';
import LatestTransactionsDataMapper from './LatestTransactionsDataMapper';
import AcceptedTransactionsDataMapper from './AcceptedTransactionsDataMapper';
import { removeExtraKeys } from './PopupHelperFunction.js';
import { orderBy } from 'lodash';
import OrderElementsData from './OrderElementsDataMapper';
import TCMUtils from '../../../js/tcmUtils';

/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const ComplexContainerDataMapper = {

  complexContainerElements(complexElementsArray, eURN,indexOfElements) {

    complexElementsArray.forEach((data) => {
      data.elemURN = data.elemURN.split('+');
    });
    let processedComplexArray = [], initialArray = [], complexArrayLevel1 = [];
    complexElementsArray.map(this.processChildElements.bind(this, eURN)).forEach((entryData) => {
      entryData.elementURN = entryData.elementID.split('+');
      let removeBodyManifest = removeExtraKeys(entryData.elementTag);
      let dataToRemove = entryData.elementURN.filter((urn, index) => {
        if (removeBodyManifest.indexOf(index.toString()) > -1) {
          return urn
        }
      })
      entryData.elementURN = entryData.elementURN.filter(urn => dataToRemove.indexOf(urn) == -1);

      initialArray.push(entryData);
    })
    let flattenedIndexOfElements =[];
    /**Flatten nested indexOfElements Array */
    OrderElementsData.processIndexOfElements(indexOfElements, flattenedIndexOfElements);
    if (initialArray.length > 0) {
      complexArrayLevel1 = this.createNestedContainerElements(initialArray, 0, flattenedIndexOfElements);
      complexArrayLevel1.forEach((level1Data, index1) => {
        if (Array.isArray(level1Data)) {
          processedComplexArray[index1] = this.createNestedContainerElements(level1Data, 1, flattenedIndexOfElements);
          processedComplexArray[index1].forEach((level2Data, index2) => {
            if (Array.isArray(level2Data)) {
              processedComplexArray[index1][index2] = this.createNestedContainerElements(level2Data, 2, flattenedIndexOfElements);
              Array.isArray(processedComplexArray[index1][index2]) && processedComplexArray[index1][index2].forEach((level3Data, index3) => {
                if (Array.isArray(level3Data)) {
                  processedComplexArray[index1][index2][index3] = this.createNestedContainerElements(level3Data, 3, flattenedIndexOfElements);
                  Array.isArray(processedComplexArray[index1][index2][index3]) && processedComplexArray[index1][index2][index3].forEach((level4Data, index4) => {
                    if (Array.isArray(level4Data)) {
                      processedComplexArray[index1][index2][index3][index4] = this.createNestedContainerElements(level4Data, 4, flattenedIndexOfElements);
                      const level4Index = this.fetchComplexElementIndex(4, level4Data, flattenedIndexOfElements)                      
                      processedComplexArray[index1][index2][index3][index4] = orderBy(processedComplexArray[index1][index2][index3][index4], ['elemIndex'], ['asc']);
                      processedComplexArray[index1][index2][index3][index4].elemIndex = level4Index;
                    }
                  })
                  processedComplexArray[index1][index2][index3] = orderBy(processedComplexArray[index1][index2][index3], ['elemIndex'], ['asc']);
                  const level3Index = this.fetchComplexElementIndex(3, level3Data, flattenedIndexOfElements)
                  processedComplexArray[index1][index2][index3].elemIndex = level3Index;            
                }
              })
              processedComplexArray[index1][index2] = orderBy(processedComplexArray[index1][index2], ['elemIndex'], ['asc']);
              const level2Index = this.fetchComplexElementIndex(2, level2Data, flattenedIndexOfElements)
              processedComplexArray[index1][index2].elemIndex = level2Index;
            }
          })
          processedComplexArray[index1] = orderBy(processedComplexArray[index1], ['elemIndex'], ['asc']);
          const level1Index = this.fetchComplexElementIndex(1, level1Data, flattenedIndexOfElements)
          processedComplexArray[index1].elemIndex = level1Index;
        }
      })
    }
    return processedComplexArray;
  },

  processNestedContainerElements(data,level) { /** To sort data into Head/Body */
    const headChildArray = [];
    const bodyChildArray = [];
    data.map((childElem, index) => {
      let section = '';
      if(Array.isArray(childElem)){
        const flattenedChild = childElem.flat(level) ;
        section = flattenedChild && flattenedChild[0].bodyTypeList[level] ? flattenedChild[0].bodyTypeList[level] : "";
      }else{
        section = childElem.bodyTypeList ? childElem.bodyTypeList[level] ? childElem.bodyTypeList[level] : '' :"";
      }
      if (section === 'BODY') {
        bodyChildArray.push(childElem);
      } else {
        headChildArray.push(childElem);
      }
    });
    return [...headChildArray, ...bodyChildArray];
  },
  createNestedContainerElements(data, level, indexOfElements) {
    let parentArray = [];
    let childArray = [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i += 1) {
        const elemURN = data[i].elementURN[level];
        const elemTag = data[i].elementTag;
        const isContainerElement = TCMUtils.checkContainerTag(elemTag, level);
        for (let j = i + 1; j < data.length; j += 1) {
          if (elemURN === data[j].elementURN[level] && isContainerElement) {/** elemUrn is of container element */
            childArray.push(data[j]);
            data.splice(j, 1);
            j -= 1;
          }
        }
        if (elemURN && elemURN.includes('work')  && !isContainerElement) {
          OrderElementsData.setIndexForNonContainerElements(data[i], indexOfElements, true)
          childArray = data[i];
        } else {
          childArray.push(data[i]);
        }
        parentArray.push(childArray);
        childArray = [];
      }
        parentArray = this.processNestedContainerElements(parentArray, level);
      return parentArray;
    }
  },

  fetchComplexElementIndex(level, data, elements) {
    const activeArray = data.flat(4);
    const elemUrn = activeArray[0].elementURN[level - 1];
    const dataAtIndex = elements.find(item => item.urn === elemUrn)
    const indexValue = dataAtIndex ? dataAtIndex.index : NaN;
    return indexValue;
  },

  processChildElements(eURN, complexElement) {
    let result = {};
    result.elementID = complexElement.elemURN.join('+');
    result.eURN = eURN;
    if (!Object.prototype.hasOwnProperty.call(complexElement, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(complexElement, 'latestPendingTransaction')) {
      result = PendingTransactionsDataMapper.getPendingTranscations(complexElement, result);
      result.assetPopOverSnapshot = JSON.parse(complexElement.latestPendingTransaction.elemSnapshot).assetPopOverSnapshot || [];
      return result;
    }
    if (Object.prototype.hasOwnProperty.call(complexElement, 'latestAcceptedTransaction')
      && !Object.prototype.hasOwnProperty.call(complexElement, 'latestPendingTransaction')) {
      result = AcceptedTransactionsDataMapper.getAcceptedTranscations(complexElement, result);
      result.assetPopOverSnapshot = this.processAcceptedAssetPopoverStatus(JSON.parse(complexElement.latestAcceptedTransaction.elemSnapshot).assetPopOverSnapshot || []);
      return result;
    }
    if (Object.prototype.hasOwnProperty.call(complexElement, 'latestAcceptedTransaction')
      && Object.prototype.hasOwnProperty.call(complexElement, 'latestPendingTransaction')) {
      result = LatestTransactionsDataMapper.getLatestTransactions(complexElement, result);
      result.assetPopOverSnapshot = this.processAssetpopoverSnapshot(JSON.parse(complexElement.latestAcceptedTransaction.elemSnapshot).assetPopOverSnapshot, JSON.parse(complexElement.latestPendingTransaction.elemSnapshot).assetPopOverSnapshot)
      return result;
    }
    return result;
  },
  processAcceptedAssetPopoverStatus(latestpendingData = []) {
    if (latestpendingData.length) {
      latestpendingData = JSON.parse(latestpendingData);
    }
    else{
      latestpendingData = [];
    }
    latestpendingData.map((data,pos) => {
      return latestpendingData[pos].isAccepted = true;
    });
    return JSON.stringify(latestpendingData);
  },
  processAssetpopoverSnapshot(latestAcceptedData = [], latestpendingData = []) {
    let latestAccepted = [];
    let latestpending = [];
    if (latestAcceptedData.length) {
      latestAcceptedData = JSON.parse(latestAcceptedData);
      latestAccepted = [...latestAcceptedData];
    }
    if (latestpendingData.length) {
      latestpendingData = JSON.parse(latestpendingData);
      latestpending = [...latestpendingData];
    }
    let dataToReturn = [];
    latestAccepted.forEach((dataAccepted) => {
      latestpending.forEach((datapending) => {
        const newObj = {};
        if (dataAccepted.assetid === datapending.assetid) {
          newObj.assetid = datapending.assetid;
          newObj.label = datapending.label;
          newObj.linkID = datapending.linkID;
          newObj.oldLabel = dataAccepted.label;
          newObj.type = datapending.type;
          if(JSON.stringify(dataAccepted)===JSON.stringify(datapending)){
            newObj.isAccepted=true;
          }
          dataToReturn.push(newObj);
          latestAcceptedData.splice(latestAcceptedData.indexOf(dataAccepted), 1);
          latestpendingData.splice(latestpendingData.indexOf(datapending), 1)
        }
      });
    });
    // latestAcceptedData = JSON.parse(this.processAcceptedAssetPopoverStatus(JSON.stringify(latestAcceptedData)));
    dataToReturn = [...dataToReturn, ...latestAcceptedData, ...latestpendingData];
    return JSON.stringify(dataToReturn);
  },
};

export default ComplexContainerDataMapper;