/* eslint-disable import/no-extraneous-dependencies */
/** Used in jest.config.js */

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';
import expect from 'expect';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.PatternBroker = {
    default: {
        create: function () { },
        extract: function () { },
        getOwnChildProperty: function () { },
        getOwnChildPropertyValue: function () { },
        items: { MetaData: {}, ProductLink: {}, AddAnAsset: {}, AddAnAssetLucene: {}, SearchSelect: {} },
        setup: function () { },
    }
}
global.PatternSearchSelect = {
    default: function () { }
}
global.PatternAddAnAsset = {
    default: function () { }
}
global.PatternProductLink = {
    default: function () { }
}