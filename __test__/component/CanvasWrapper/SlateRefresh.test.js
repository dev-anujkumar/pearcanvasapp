import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import {
  handleSlateRefresh
} from '../../../src/component/CanvasWrapper/SlateRefresh_Actions';
import { exportAllDeclaration } from '@babel/types';
const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

jest.mock('../../../src/constants/utility.js', () => ({
  sendDataToIframe: jest.fn(),
}))

jest.mock('axios');
jest.mock('../../../src/component/CanvasWrapper/CanvasWrapper_Actions',() =>({
  fetchSlateData: jest.fn()
}))
describe('Testing slate refresh', () => {
  it('mocking Api response resolves apui', async() => {
      const  id  = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
      let store = mockStore();
      let result = await handleSlateRefresh(id,()=>jest.fn());
      let statusObj = '';
      let statusFunc = '';
      axios.get.mockImplementation(() => Promise.resolve());
      let dispatch = jest.fn();
      result(dispatch);
      setTimeout(() =>{
        expect(dispatch).toHaveBeenCalled();
      },1000)
    });
    it('mocking Api response reject api', async() => {
      const  id  = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
      axios.get.mockImplementation(() => Promise.reject());
      let result = await handleSlateRefresh(id,()=>jest.fn());
      result();
      setTimeout(() =>{
        expect(sendDataToIframe).toHaveBeenCalled();
      },1000)
    });
});
  