import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import CitationGroup from '../../../src/component/CitationGroup/CitationGroup';
import CitationGroupContext from '../../../src/component/ElementContainer/ElementCitationContext'
import { citationGroupElement } from '../../../fixtures/ElementCitationData';
import { swapElement} from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { Provider } from 'react-redux';
jest.mock('../../../src/component/ElementSaprator/ElementSaprator.jsx', () => {
    return function () {
        return (<div>null</div>)
    }
});
const mockStore = configureMockStore(middlewares)
let initialState = {}

let store = mockStore(initialState);

describe('Testing CitationGroup component with props', () => {
    let props = {
        swapElement : jest.fn(),
        createPopupUnit : jest.fn()
    }  
    let contextValue = {
        activeElement: this.props.activeElement,
        showBlocker: jest.fn(),
        permissions: [],
        index: 2,
        element: citationGroupElement,
        slateLockInfo: { isLocked : false, userId : 'c5test01'},
        handleCommentspanel : jest.fn(),
        isBlockerActive : false,
        onClickCapture : jest.fn(),
        elementSeparatorProps : jest.fn(),
        setActiveElement : jest.fn(),
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        onClick: jest.fn()
    }
    const wrapper = mount(
    <CitationGroupContext.Provider value={contextValue} >
        <Provider store={store}>
            <CitationGroup {...props} />
        </Provider>
    </CitationGroupContext.Provider>);
    const CitationGroupInstance = wrapper.find('CitationGroup').instance();

    
})
