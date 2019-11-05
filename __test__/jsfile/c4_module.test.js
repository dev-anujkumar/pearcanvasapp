import { c4PublishObj, publishContentDelay, publishTitleDelay } from '../../src/js/c4_module.js';
import _ from 'lodash';
var axios = require('axios');
import * as sinon from 'sinon';
import { doesNotReject } from 'assert';
jest.mock('axios', () => ({ post: () => jest.fn(),create: jest.fn() }));
describe('Testing c4_modules', () => {

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

    it('Testing publishContentDelay function',() => {
    
        let response = {
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
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
           
            publishContentDelay(content_url, pubConObj, pubApiKey,callback);
          });

    })

    it('Testing publishTitleDelay function',() => {
    
        let response = {
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
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