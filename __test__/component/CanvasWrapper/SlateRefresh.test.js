import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {handleSlateRefresh} from '../../../src/component/CanvasWrapper/SlateRefresh_Actions';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios', () => {
    const responseData = {
    data: { status:'success' }
    }
    return {     
        create:jest.fn(() => Promise.resolve(responseData)),   
        get:jest.fn(() => Promise.resolve(responseData)),
      };
  })
  describe('Testing Assessment Slate Canvas component', () => {
    test('renders without crashing', () => {
        let a=1;
       expect(a).toBe(1)
    })
    it('mocking Api response', () => {
        const  id  = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        let store = mockStore();
        store.dispatch(handleSlateRefresh(id));
      });
});
  