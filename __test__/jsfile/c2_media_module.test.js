const configOBJ = require('../../src/config/config.js');
import $ from 'jquery';
global.$ = global.jQuery = $;


import { c2MediaModule } from '../../src/js/c2_media_module.js';

describe('testing function', () => {
    it('Test productLinkOnsaveCallBack  function', () => {
        let data = {
            nodeRef: '123124123',
            repoInstance: 'img',
            repoName: 'image',
        }
        let callback = jest.fn();
        c2MediaModule.productLinkOnsaveCallBack(data, callback)
    })

    it('Test validateProperties  function', () => {
        let elements = {
            repo: 'abc',
            repoName: 'abcccc'
        }

        let proporty1 = 'p1';
        let preporty2 = 'p2';

        c2MediaModule.validateProperties(elements, proporty1, preporty2)
    })

    it('Test validateRegistries  function', () => {
        let cmisRepo = [{repo : 'abc', repoName : 'abcccc'}]

        c2MediaModule.validateRegistries(cmisRepo)
    })

    it('Test AddanAssetCallBack else function', () => {
        let data = {
            nodeRef: '123124123',
            'assetType' : 'image',
            mimetype: 'img',
            EpsUrl : 'http://localhost',
            desc: '{ "name":"John", "age":30, "city":"New York"}'
        }
        let cb = jest.fn();
        c2MediaModule.AddanAssetCallBack(data, cb)
    })

    it('Test AddanAssetCallBack if image function', () => {
        let data = {
            nodeRef: '123124123',
            mimetype: 'image',
            EpsUrl : 'http://localhost',
            desc: '{ "name":"John", "age":30, "city":"New York"}'
        }
        let cb = jest.fn();
        c2MediaModule.AddanAssetCallBack(data, cb)
    })

    it('Test AddanAssetCallBack if video function', () => {
        let data = {
            nodeRef: '123124123',
            mimetype: 'video',
            EpsUrl : 'http://localhost',
            desc: '{ "name":"John", "age":30, "city":"New York"}'
        }
        let cb = jest.fn();
        c2MediaModule.AddanAssetCallBack(data, cb)
    })

    it('Test AddanAssetCallBack if smartLinkType function', () => {
        let data = {
            nodeRef: '123124123',
            mimetype: 'viasdasddeo',
            EpsUrl : 'http://localhost',
            desc: '{ "smartLinkType":"John", "age":30, "city":"New York"}'
        }
        let cb = jest.fn();
        c2MediaModule.AddanAssetCallBack(data, cb)
    })

    it('Test AddanAssetCallBack if streamingMediaPackageType function', () => {
        let data = {
            nodeRef: '123124123',
            mimetype: 'viasdasddeo',
            EpsUrl : 'http://localhost',
            desc: '{ "streamingMediaPackageType":"John", "age":30, "city":"New York"}'
        }
        let cb = jest.fn();
        c2MediaModule.AddanAssetCallBack(data, cb)
    })

    it('Test onLaunchAddAnAsset  function', () => {
        let callback = jest.fn()
        c2MediaModule.onLaunchAddAnAsset(callback)
    })
});