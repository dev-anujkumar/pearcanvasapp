import { c4PublishObj, publishContentDelay, publishTitleDelay } from '../../src/js/c4_module.js';
import _ from 'lodash';
var axios = require('axios');
import * as sinon from 'sinon';
import { doesNotReject } from 'assert';
window.alert = jest.fn();
jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn() }));

describe('Testing c4_modules', () => {

    xit('Testing publishSlate function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite';
        jest.mock('axios');
        _.delay = jest.fn(() => {});
        c4PublishObj.publishSlate(project, section, cite);
    })

    it('Testing publishContent function', () => {
        let pubCallBack = jest.fn();
        let pubConObj = {
            distributableVersionUrn: 'version',
            requester: 'requestere',
            timestamp: '31 Oct'
        }
        _.delay = jest.fn(() => {});
        c4PublishObj.publishContent(pubConObj, pubCallBack);
    })

    it('Testing publishTitle function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            callBack = jest.fn(),
            isPreview = true
        _.delay = jest.fn(jest.fn());
        c4PublishObj.publishTitle(project, section, cite, callBack, isPreview);
    })

    it('Testing publishContentDelay function',() => {
        let response = {
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
                },
                data: {
                    previewURL: "http://previewURL"
                }
            } 
        }
        jest.mock('axios'); 
        const mockedResponse = Promise.resolve(response);
        let callback = (response) => jest.fn(response);
        jest.mock('axios', (response) => ({ post: (response) => jest.fn(response), create: jest.fn() }));
        mockedResponse.then(function(mockedResponse) {
            let content_url = 'http://helloUrl',
            pubConObj = {
                requestid: 'id',
                distributableVersionUrn: 'urn',
                requester: 'cypress',
                timestamp: '25Dec'
            },
            pubApiKey = {};
           
            publishContentDelay(content_url, pubConObj, pubApiKey, callback);
          });

    })

    it('Testing publishTitleDelay function',() => {
    
        let response = {
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
                },
                data: {
                    previewURL: "http://previewURL"
                }
            } 
        }
        jest.mock('axios'); 
        const mockedResponse = Promise.resolve(response);
        let callback = (response) => jest.fn(response);
        jest.mock('axios', (response) => ({ post: (response) => jest.fn(response),create: jest.fn() }));
        mockedResponse.then(function(mockedResponse) {
            let content_url = 'http://helloUrl',
            pubConObj = {
                requestid: 'id',
                distributableVersionUrn: 'urn',
                requester: 'cypress',
                timestamp: '25Dec'
            },
            pubApiKey = 'key';
           let project = 'project',
            section = 'section', 
            cite = 'cite', 
            callBack = jest.fn(), 
            isPreview = true

            publishTitleDelay(project, section, cite, callBack, isPreview);
          });

    })
});