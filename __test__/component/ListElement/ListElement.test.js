import { shallow } from 'enzyme';
import ListElement from '../../../src/component/ListElement/ListElement';
import React from 'react'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
// IMPORT - Assets //

describe('ListElement', () => {
  let props = {
    element: {
      subType: 'figure',
      elementdata: {
        startNumber: 10
      }
    },
    onListSelect: jest.fn(),
    slateLockInfo: {
      isLocked: false,
      userId: 'c5Test02'
    },
    showBlocker: jest.fn()
  }
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({ });
  const component = mount(<Provider store={store}><ListElement {...props} /></Provider>,{ attachTo: document.body })
  let instance = component.find('ListElement').instance();
  it('renders correctly', () => {
    const wrapper = shallow(<ListElement {...props} />);
    // expect(wrapper).toMatchSnapshot();
    // On the first run of this test, Jest will generate a snapshot file automatically.
  });
  it('ListWarningConfirmation Test',() => {
    let mySpyFunction = jest.spyOn(instance, 'listWarningConfirmation')
    instance.listWarningConfirmation();
    expect(mySpyFunction).toHaveBeenCalledWith();
    expect(instance.state.popup).toBe(false);
    expect(instance.state.listType).toBe(null);
    mySpyFunction.mockClear();
  })
  it('TogglePopup Test',() => {
    let mySpyFunction = jest.spyOn(instance, 'togglePopup')
    instance.togglePopup(true,'decimal');
    expect(mySpyFunction).toHaveBeenCalledWith(true,'decimal');
    expect(instance.state.popup).toBe(true);
    expect(instance.state.listType).toBe('decimal');
    mySpyFunction.mockClear();
  })
});