import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import ApiResults from '../../../src/component/AssetPopover/ApiResults';



const selectedFigure = jest.fn(() => {
    return {
        type : 'SELECTED_FIGURE',
        payload : {
          selectedFigure : {}
        }
    }
})

const figures = [
    {
        "versionUrn": "urn:pearson:work:655702ea-43c4-49ac-81d4-173ec723ac12",
        "entityUrn": "urn:pearson:entity:600d4b18-d97d-4981-8d20-78d4f3c3cb06",
        "title": "Figure Image- interactive",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/ab9c96cf-36eb-4752-8eac-d968b7d8b2ee/MDM_EPM.jpg",
        "imageId": "urn:pearson:work:6f0a3911-30d4-4735-9355-249560f14a9c",
        "containerContentUrn": "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6"
    },
    {
        "versionUrn": "urn:pearson:work:e5769a1d-8031-4380-a24c-1b8e1d90c43e",
        "entityUrn": "urn:pearson:entity:8046391f-3c51-4f97-8d86-5c89ce031180",
        "title": "smart link popup web link",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/9077191c-15b8-4b48-90d5-f732d66d864d/test0000.jpg",
        "imageId": "urn:pearson:work:f95e0bd1-1b39-444b-aaca-d55a96e27f06",
        "containerContentUrn": "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6"
    },
    {
        "versionUrn": "urn:pearson:work:02dac577-bf05-4aa2-bb98-12d62cce59e9",
        "entityUrn": "urn:pearson:entity:9e02b049-1496-49b8-a90f-a97ec04b50b8",
        "title": "smart link - table - interactive",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/71355742-eb58-48fc-aa0e-bc0b73a8591e/Jellyfish.jpg",
        "imageId": "urn:pearson:work:930e1e41-a238-4591-b35d-5f19100cc196",
        "containerContentUrn": "urn:pearson:entity:cc8d16d5-4b68-4070-9277-930c70fe19d6"
    },
    {
        "versionUrn": "urn:pearson:work:92de5658-ddcc-4534-8d80-ba17031509c9",
        "entityUrn": "urn:pearson:entity:574f53c4-686c-4a4c-a668-8ff104138d03",
        "title": "Image",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/82692a62-1acc-4d97-bbbc-011270746392/Koala.jpg",
        "imageId": "urn:pearson:work:1f9cb3ad-5400-450f-8162-f7fbd727e8b3",
        "containerContentUrn": "urn:pearson:entity:be3e194a-a5df-45cb-900f-b8a0a5543b2b"
    },
    {
        "versionUrn": "urn:pearson:work:dbdece25-9089-423f-bbe7-a9b153348067",
        "entityUrn": "urn:pearson:entity:6bc22209-95a2-4d3c-839a-9f591e8c6803",
        "title": "Image1",
        "subTile": "Image1",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
        "containerContentUrn": "urn:pearson:entity:7d17ec15-bbb9-430d-be29-2ca9a46c471e"
    },
    {
        "versionUrn": "urn:pearson:work:7bf4d8db-ce2b-4687-a395-ba4bab9323b5",
        "entityUrn": "urn:pearson:entity:8f39a927-395b-4c8a-9582-9a819db35589",
        "title": "",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
        "imageId": "",
        "containerContentUrn": "urn:pearson:entity:2edc3bff-2988-4bf9-b233-b21f7fdea70b"
    },
    {
        "versionUrn": "urn:pearson:work:a46bbf9d-86a5-4b4a-8c0e-1e5d7aabf323",
        "entityUrn": "urn:pearson:entity:8f415a94-4640-470e-8c86-e39165e3901c",
        "title": "image",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/7379f469-7891-4ab2-af3c-b9089916a3c0/hyyyyy.jpg",
        "imageId": "urn:pearson:work:f58f2666-2da8-4074-b03e-1de2a7890cb2",
        "containerContentUrn": "urn:pearson:entity:76e9d70f-089b-4ffc-90ee-80e7455457b6"
    },
    {
        "versionUrn": "urn:pearson:work:722539e9-3024-4082-9e39-65f3749d9618",
        "entityUrn": "urn:pearson:entity:2f483e4e-2591-4f31-8d5b-7e235ee30f6c",
        "title": "",
        "subTile": "",
        "path": "https://cite-media-stg.pearson.com/legacy_paths/f7402ebc-ca51-4e5b-8acd-229191e75072/cap.tion.%20E.m.pty.png",
        "imageId": "",
        "containerContentUrn": "urn:pearson:entity:38507e16-2e25-4089-9942-19fa8e6ea9d4"
    }
]

let wrapper;

beforeEach(() => {
    wrapper = mount(<ApiResults  figures = {figures} ValueToBeSearch = 'i' selectedFigure = {selectedFigure}/>)
})

//ApiResults test cases
describe('Test ApiResults', () => {
    it('Have ApiResults function', () => {
        wrapper.setState({
            figureDataLength : 2
        })
    }),
    it('cover else case', () => {
        let tempWrapper = mount(<ApiResults  figures = {figures} ValueToBeSearch = 'ioioioi' selectedFigure = {selectedFigure}/>)
        
    })
});