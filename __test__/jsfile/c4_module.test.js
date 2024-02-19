import { publishSlate, publishTitle, publishTitleDelay } from '../../src/js/c4_module.js';
import _ from 'lodash';
var axios = require('axios');
window.alert = jest.fn();
jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn() }));

describe('Testing c4_modules', () => {
    jest.useFakeTimers();
    it('Testing publishSlate function', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            message = {
                slatePreviewType: "digital"
            }
        jest.mock('axios');
        const response = {data: {data: {
            previewURL: 'https://www.test.com'
        }}};
        axios.post = jest.fn(() => Promise.resolve(response));
        window.addEventListener = jest.fn(() => event);
        publishSlate(project, section, cite,message);
    })
    it('Testing publishSlate function else case', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            message = {
                slatePreviewType: "digital"
            }
        jest.mock('axios');
        const response = {data: {data: {
            text: 'abc'
        }}};
        axios.post = jest.fn(() => Promise.resolve(response));
        window.addEventListener = jest.fn(() => event);
        publishSlate(project, section, cite, message);
    })
    it('Testing publishSlate function else case', () => {
        let project = 'project',
            section = 'section',
            cite = 'cite',
            message = {
                slatePreviewType: ""
            }
        jest.mock('axios');
        const response = {data: {data: {
            text: 'abc'
        }}};
        axios.post = jest.fn(() => Promise.resolve(response));
        window.addEventListener = jest.fn(() => event);
        publishSlate(project, section, cite, message);
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
        publishTitle(project, section, cite, callBack, isPreview);
        jest.runAllTimers();
    })

    it('Testing publishTitleDelay function : true with callBack = jest.fn()',() => {
    
        let response = {
            data: {
                data: {
                    previewURL: "http://previewURL"
                }
            },
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
                },
                
            },
            headers: {
                etag: 123
            } 
        }
        jest.mock('axios'); 
        axios.post = jest.fn(() => Promise.resolve(response));
           let project = 'project',
            section = 'section', 
            cite = 'cite', 
            callBack = jest.fn(), 
            isPreview = true,
            type = 'projectPreview';
            publishTitleDelay(project, section, cite, callBack, isPreview, type);
    });

    it('Testing publishTitleDelay function : true with callBack = false,',() => {
    
        let response = {
            data: {
                data: {
                    previewURL: "http://previewURL"
                }
            },
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
                },
                
            },
            headers: {
                etag: 123
            } 
        }
        jest.mock('axios'); 
        axios.post = jest.fn(() => Promise.resolve(response));
           let project = 'project',
            section = 'section', 
            cite = 'cite', 
            callBack = false, 
            isPreview = true,
            type = 'projectPreview';
            publishTitleDelay(project, section, cite, callBack, isPreview, type);
        });
    it('Testing publishTitleDelay function : true else case',() => {
        let response = {
            data: {
                data: {
                    text: "http://previewURL"
                }
            },
            responseText: {
                ResponseMetadata: {
                    requestStatusCode: 200
                },
                
            },
            headers: {
                etag: 123
            } 
        }
        jest.mock('axios'); 
        axios.post = jest.fn(() => Promise.resolve(response));
           let project = 'project',
            section = 'section', 
            cite = 'cite', 
            callBack = jest.fn(), 
            isPreview = false,
            type = 'projectPreview';
            publishTitleDelay(project, section, cite, callBack, isPreview, type);
    });

})