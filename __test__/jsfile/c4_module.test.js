import {c4PublishObj} from '../../src/js/c4_module.js';
import store from '../../src/appstore/store.js';
import _ from 'lodash';
import $ from 'jquery';

global.$ = global.jQuery = $;

describe('Testing c4_modules', () => {
    it('Testing publishSlate function', () => {
        let project = 'project',
        section = 'section',
        cite = 'cite'
        c4PublishObj.publishSlate(project,section,cite);
    })  

    it('Testing publishConten function', () => {
        let pubCallBack = jest.fn();
        let pubConObj = {
            distributableVersionUrn : 'version',
            requester : 'requestere',
            timestamp : '31 Oct'
        }
        _.delay = jest.fn()
        c4PublishObj.publishContent(pubConObj, pubCallBack);
    })
    
    it('Testing publishEPUB function', () => {
        let project = 'project',
        section = 'section',
        cite = 'cite'
        c4PublishObj.publishEPUB(project,section,cite);
    })

    it('Testing publishTitle function', () => {
        let project = 'project',
        section = 'section',
        cite = 'cite',
        callBack = jest.fn(),
        isPreview= true
        c4PublishObj.publishTitle(project, section, cite, callBack, isPreview);
    })

    // it('Testing publishTitleS3 function', () => {
    //     let project = 'project',
    //     section = 'section',
    //     cite = 'cite'
    //     c4PublishObj.publishTitleS3(project,section,cite);
    // })

    // it('Testing PODdisciplineId function', () => {
    //     let project = 'project',
    //     cite = 'cite'

    //     let samplediv = document.createElement('div');
    //     samplediv.setAttribute('id', 'xyz' );
    //     samplediv.innerHTML = "test";
    //     document.body.appendChild(samplediv);

    //     c4PublishObj.PODdisciplineId(project,cite);
    // })

    // it('Testing PODregisterPOD function', () => {
    //     let project = 'project',
    //     disciplineID = 'section',
    //     citeId = 'cite'

    //     c4PublishObj.PODregisterPOD(project, citeId, disciplineID);
    // })

    it('Testing createNewVersion function', () => {
        let project = 'project',
        disciplineID = jest.fn(),
        citeId = 'cite'

        c4PublishObj.createNewVersion(project, citeId, disciplineID);
    })

    // it('Testing PODModal rendering', () => {
    //     let wrapper = mount(<ErrorComp {...ErrorCompProps}/>)

    // })

    it('Testing createNewVersion function', () => {
        
    })
    
});