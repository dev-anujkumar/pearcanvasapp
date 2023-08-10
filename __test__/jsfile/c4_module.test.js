import { publishSlate, publishTitle, publishTitleDelay } from '../../src/js/c4_module.js';
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
        publishSlate(project, section, cite);
    })

    xit('Testing publishContent function', () => {
        let pubCallBack = jest.fn();
        let pubConObj = {
            distributableVersionUrn: 'version',
            requester: 'requestere',
            timestamp: '31 Oct'
        }
        _.delay = jest.fn(() => {});
        publishContent(pubConObj, pubCallBack);
    })

    it('Testing publishTitle function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            callBack = jest.fn(),
            isPreview = true
        _.delay = jest.fn(jest.fn());
        publishTitle(project, section, cite, callBack, isPreview);
    })

    it('Testing publishTitleDelay function : true',() => {
    
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
    it('Testing publishTitleDelay function : false',() => {
    
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
            isPreview = false

            publishTitleDelay(project, section, cite, callBack, isPreview);
          });

    })
});