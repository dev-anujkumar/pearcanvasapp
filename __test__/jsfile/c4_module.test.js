import { c4PublishObj } from '../../src/js/c4_module.js';
import _ from 'lodash';
import $ from 'jquery';
import * as sinon from 'sinon';

global.$ = global.jQuery = $;

var ajax = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    send: jest.fn()
}

describe('Testing c4_modules', () => {
    let clock;
    beforeEach(() => { clock = sinon.useFakeTimers(); });
    afterEach(() => { clock.restore(); });

    it('Testing ajax calls', () => {
        let url = 'http',
            callback = jest.fn(),
            contentType = 'asdf',
            sync = 'abcd',
            pubApiKey = 'apikey',
            data = 'data',
            method = 'post'

        ajax.get(url, callback, contentType, sync);
        ajax.post(url, data, callback, contentType, sync, pubApiKey);
        ajax.put(url, data, callback, contentType, sync);
        ajax.send(url, callback, method, data, contentType, sync, pubApiKey)
    })

    it('Testing publishSlate function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite'
        c4PublishObj.publishSlate(project, section, cite);
    })

    it('Testing publishContent function', () => {
        let pubCallBack = jest.fn();
        let pubConObj = {
            distributableVersionUrn: 'version',
            requester: 'requestere',
            timestamp: '31 Oct'
        }
        _.delay = jest.fn()
        c4PublishObj.publishContent(pubConObj, pubCallBack);
    })

    it('Testing publishTitle function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            callBack = jest.fn(),
            isPreview = true
        c4PublishObj.publishTitle(project, section, cite, callBack, isPreview);
    })
});