import React from 'react';
import { mount, shallow } from 'enzyme';
import GlossaryFootnoteMenu from '../../../src/component/GlossaryFootnotePopup/GlossaryFootnoteMenu';
import { comments, filters } from '../../../fixtures/commentPanelData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    glossaryFootnoteReducer:{glossaryFootnoteValue:{"type":"","popUpStatus":false}
    }
  
  
});
xdescribe('Testing GlossaryFootnote menu component with props', () => {
    let wrapper = mount(<Provider store={store}>< GlossaryFootnoteMenu  /> </Provider>)
    const instance = wrapper.find('GlossaryFootnoteMenu').instance();

    it('renders closePopup function correctly', () => {
         instance.closePopup ()
      });
      it('renders saveContent function correctly', () => {
        instance.saveContent  ()
     });
})