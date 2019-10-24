import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import { spy, stub } from 'sinon';

import * as actions from '../../../src/component/Sidebar/Sidebar_Action';

const callback = new stub();

describe('Test Update Element Action', () => {
    let store = mockStore();

    it('Test Convert Element', () => {

    });
});