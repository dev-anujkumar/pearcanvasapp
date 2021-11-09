import OrderElementsDataMapper from '../../../../src/component/TcmSnapshots/FetchAllDataMapper/OrderElementsDataMapper'
import {element, processedResponse, indexOfElements, flattenedIndexOfElements, isNested, elementData} from './orderElementMockData'

describe('OrderElementsDataMapper file test cases', () => {
  test('verifying setIndexForNonContainerElements Function if condition', () => {
    OrderElementsDataMapper.setIndexForNonContainerElements(element, flattenedIndexOfElements, isNested)
  });
 
  test('verifying setIndexForNonContainerElements Function else condition', () => {
    OrderElementsDataMapper.setIndexForNonContainerElements(element, flattenedIndexOfElements, isNested)
  });

  test('verifying setIndexForNonContainerElements Function to test delete condition', () => {
        OrderElementsDataMapper.setIndexForNonContainerElements(elementData, flattenedIndexOfElements, isNested)
  });
  
  test('verifying sortSimpleElements Function', () => {
        OrderElementsDataMapper.sortSimpleElements(processedResponse, indexOfElements)
  });
});
