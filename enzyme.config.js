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
global.alfrescoMetaData = {}
global.PatternBroker = {
    default: {
        create: function () {
            return {
                corsId : "corsId",
                setup: function() { },
                run: function() { },
                on: function() { }
            }
         },
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
    default: function () { },
}
global.MutationObserver = function () {
    return {
        observe: function () { }
    }
}
global.window.getSelection=()=>{
    return {
        removeAllRanges: ()=>{},
        toString: ()=>{
            return "hello TEST"
        },
        anchorNode:{
            parentNode:{
                nodeName: "P",
                innerHTML: "",
                outerHTML:""
            }
        }
    }
}
global.window.crypto={
    getRandomValues: ()=>{
        return [12,23,34]
    }
}
global.window.origin= "https://localhost:"
global.window.parent.postMessage = jest.fn();
global.window.parent.origin= "https://localhost:"
global.window.matchMedia = () => {
    return {
        matches: []
    }
}