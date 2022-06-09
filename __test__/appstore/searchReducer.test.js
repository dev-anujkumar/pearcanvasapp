import { searchReducer } from "../../src/appstore/searchReducer";
const INITIAL_STATE = {
    searchTerm: '',
    parentId: '',
    deeplink: true,
    scroll: false,
    scrollTop: 0
}

const INITIAL_COMMENT_STATE = {
    commentSearchTerm: '',
    parentId: '',
    scroll: false,
    scrollTop: 0
}

const payload1 = {
    type: "SET_SEARCH_URN",
    payload: "urn:pearson:work:4aebbd03-7626-4658-8f35-e78df2d2bd44",
    parent: "urn:pearson:work:4aebbd03-7626-4658-8f35-e78df2d2bd44",
    deeplink: false,
    scroll: true,
    scrollTop: 142
}

const expectedSlate1 = {
    searchTerm: "urn:pearson:work:4aebbd03-7626-4658-8f35-e78df2d2bd44",
    parentId: "urn:pearson:work:4aebbd03-7626-4658-8f35-e78df2d2bd44",
    deeplink: false, 
    scroll: true,
    scrollTop: 142
}

describe("Testcases for searchReducer", () => {
    it("Should return INITIAL_STATE", () => {
        expect(searchReducer(INITIAL_STATE, {})).toBe(INITIAL_STATE);
    });

    it("Test1 - SET_SEARCH_URN", () => {
        const result = searchReducer(INITIAL_STATE, payload1);
        expect(result).toEqual(expectedSlate1);
    });
});