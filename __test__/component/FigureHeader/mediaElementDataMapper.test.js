/**************************Import Modules**************************/
import * as mediaMapperFunctions from '../../../src/component/FigureHeader/mediaElementDataMapper';
/*************************Import Constants*************************/
import { mockFiguresAPIResponse, mockAudioAPIResponse, mockVideoAPIResponse } from './AutoNumberApiTestData';

describe('-----------------Testing mediaElementDataMapper-----------------', () => {
    it('Test-1---getImagesInsideSlates--- frontMatter,backMatter  of project', () => {
        const projectContent = {
            "frontMatter": mockFiguresAPIResponse.contents.frontMatter,
            "backMatter": mockFiguresAPIResponse.contents.backMatter,
            "bodyMatter": []
        }
        let params = {
            elementType: 'IMAGE',
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList: [],
                videosList: [],
            },
            atContainerLevel: undefined
        }
        let numberedElements = {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList: [],
            videosList: [],
        }
        const spyFunction = jest.spyOn(mediaMapperFunctions, 'mediaElementAPI_Handler');
        const result = mediaMapperFunctions.mediaElementAPI_Handler(params, projectContent, numberedElements);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2---getImagesInsideSlates---bodyMatter of project', () => {
        const projectContent = {
            "frontMatter": [],
            "backMatter": [],
            "bodyMatter": mockFiguresAPIResponse.contents.bodyMatter
        }
        let params = {
            elementType: 'IMAGE',
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList: [],
                videosList: [],
            },
            atContainerLevel: undefined
        }
        let numberedElements = {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList: [],
            videosList: [],
        }
        const spyFunction = jest.spyOn(mediaMapperFunctions, 'mediaElementAPI_Handler');
        const result = mediaMapperFunctions.mediaElementAPI_Handler(params, projectContent, numberedElements);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-3---getImagesInsideSlates--- Audio', () => {
        const projectContent = mockAudioAPIResponse.contents
        let params = {
            elementType: 'AUDIO',
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList: [],
                videosList: [],
            },
            atContainerLevel: undefined
        }
        let numberedElements = {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList: [],
            videosList: [],
        }
        const spyFunction = jest.spyOn(mediaMapperFunctions, 'mediaElementAPI_Handler');
        const result = mediaMapperFunctions.mediaElementAPI_Handler(params, projectContent, numberedElements);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4---getImagesInsideSlates--- Video', () => {
        const projectContent = mockVideoAPIResponse.contents
        let params = {
            elementType: 'VIDEO',
            autoNumberedElements: {
                imagesList: [],
                tablesList: [],
                equationsList: [],
                audiosList: [],
                videosList: [],
            },
            atContainerLevel: undefined
        }
        let numberedElements = {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList: [],
            videosList: [],
        }
        const spyFunction = jest.spyOn(mediaMapperFunctions, 'mediaElementAPI_Handler');
        const result = mediaMapperFunctions.mediaElementAPI_Handler(params, projectContent, numberedElements);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})