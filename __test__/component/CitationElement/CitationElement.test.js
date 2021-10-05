import React from 'react'
import { shallow } from 'enzyme';
import CitationElement from '../../../src/component/CitationElement/CitationElement';


let props = {
    index: "0-1",
    element: {
        contentUrn: "urn:pearson:entity:4ed7024d-1274-454a-ae5a-dfa9cea1a3e2",
        id: "urn:pearson:manifest:31177d3b-4e90-45af-b6c0-cf470d649567",
        schema: "http://schemas.pearson.com/wip-authoring/citations/1",
        type: "citations",
        versionUrn: "urn:pearson:manifest:31177d3b-4e90-45af-b6c0-cf470d649567"
    },
    className: "test",
    model: { text: "<p class='paragraphNumeroUnoCitation'><br></p>" },
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
    slateLockInfo: {
        firstName: "Metcalfe, David",
        isLocked: true,
        lastName: "David",
        timestamp: "1632405207431",
        userFirstName: "",
        userId: "metcalfe, david (vmetcda)",
        userLastName: ""
    },
    permissions: ["login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm"],
    currentElement: {
        ontentUrn: "urn:pearson:entity:4c6299df-0ce4-45aa-b057-0282b93662fe",
        elementdata: { schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "" },
        html: { text: "<p class='paragraphNumeroUnoCitation'><br></p>" },
        id: "urn:pearson:work:aacdb614-0001-49aa-981d-98b2258db084",
        schema: "http://schemas.pearson.com/wip-authoring/element/1",
        status: "wip",
        type: "element-citation",
        versionUrn: "urn:pearson:work:aacdb614-0001-49aa-981d-98b2258db084",
    }
}
describe('Citation Element testing', () => {
    it('renders correctly', () => {
        shallow(<CitationElement {...props} />);
    })
});