import * as utils from '../../../src/component/AssetPopover/AssetPopover_Helpers';

describe("Testing functions of AssetPopover_Helpers", () => {
    it("Testing formatString()", () => {
        const sypFormatString = jest.spyOn(utils, 'formatString');
        const result = utils.formatString("Rain Water");
        expect(sypFormatString).toBeCalled();
        expect(result).toBe("Rain Water");
    })
    
    describe("Testing checkIfIncludes()", () => {
        it("Testing checkIfIncludes() for value to be search is present in searchItem", () => {
            const sypCheckIfIncludes = jest.spyOn(utils, 'checkIfIncludes');
            const searchItem = "Marvel Universe";
            const ValueToBeSearch = "verse";
            const result = utils.checkIfIncludes(searchItem, ValueToBeSearch);
            expect(sypCheckIfIncludes).toBeCalled();
            expect(result).toBe(true);
        })
        it("Testing checkIfIncludes() for value to be search is not present in searchItem", () => {
            const sypCheckIfIncludes = jest.spyOn(utils, 'checkIfIncludes');
            const searchItem = "Iron Man";
            const ValueToBeSearch = "arc";
            const result = utils.checkIfIncludes(searchItem, ValueToBeSearch);
            expect(sypCheckIfIncludes).toBeCalled();
            expect(result).toBe(false);
        })
    })

    describe("Testing getTitle()", () => {
        it("Testing when title is present in title", () => {
            const sypGetTitle = jest.spyOn(utils, 'getTitle');
            const item = {
                title: "Image of Burj Khalifa"
            }
            const result = utils.getTitle(item);
            expect(sypGetTitle).toBeCalled();
            expect(result).toBe("Image of Burj Khalifa");
        })
        it("Testing when title is not present in title", () => {
            const sypGetTitle = jest.spyOn(utils, 'getTitle');
            const item = {
                title: null
            }
            const result = utils.getTitle(item);
            expect(sypGetTitle).toBeCalled();
            expect(result).toBe("");
        })
        it("Testing when title is present in unformattedTitle.en", () => {
            const sypGetTitle = jest.spyOn(utils, 'getTitle');
            const item = {
                unformattedTitle: {
                    en: "Aside 1.1"
                }
            }
            const result = utils.getTitle(item);
            expect(sypGetTitle).toBeCalled();
            expect(result).toBe("Aside 1.1");
        })
        it("Testing when title is not present in unformattedTitle.en", () => {
            const sypGetTitle = jest.spyOn(utils, 'getTitle');
            const item = {
                unformattedTitle: {
                    en: null
                }
            }
            const result = utils.getTitle(item);
            expect(sypGetTitle).toBeCalled();
            expect(result).toBe("");
        })
    })

    describe("Testing getCaption()", () => {
        it("Testing when caption is present in captions.text", () => {
            const sypGetCaption = jest.spyOn(utils, 'getCaption');
            const item = {
                captions: {
                    text: "This is Image of Rainbow"
                }
            }
            const result = utils.getCaption(item);
            expect(sypGetCaption).toBeCalled();
            expect(result).toBe("This is Image of Rainbow");
        })
        it("Testing when caption is not present in captions.text", () => {
            const sypGetCaption = jest.spyOn(utils, 'getCaption');
            const item = {
                captions: {
                    text: null
                }
            }
            const result = utils.getCaption(item);
            expect(sypGetCaption).toBeCalled();
            expect(result).toBe("");
        })
    })
})