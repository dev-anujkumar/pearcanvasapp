/**************************Import Modules**************************/
import * as elementSnapshotUtilityFn from '../../../src/component/TcmSnapshots/ElementSnapshot_Utility.js';
import tcmTestData from '../../../fixtures/tcmSnapshotTestData.js';

/**********************Mock Helper Functions**********************/
jest.mock("../../../src/component/AssetPopover/AssetPopover_Actions.js", () => {
    return { getCurrentlyLinkedImage: jest.fn() }
})
jest.mock("../../../src/component/TcmSnapshots/TcmSnapshot_Actions.js", () => {
    return {
        getLatestVersion: () => {
            return "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a"
        }
    }
})

describe('-----------------------Test ElementSnapshot_Utility Functions-----------------------', () => {
    describe('Test-1-Function--1--setSemanticsSnapshots', () => {
        const { stanza, paragraph, blockquote, figure } = tcmTestData.setSemanticsSnapshotsData
        let actionStatus = {
            action:"create",
            status:"accepted",
            fromWhere:"create"
        }
        it('Test-1.1-Function--1--setSemanticsSnapshots - Default', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots({ type: "element-learningobjectives" },"accepted" );
            expect(spyFunction).toHaveBeenCalledWith( { type: "element-learningobjectives" },"accepted",);
        })
        it('Test-1.2-Function--1--setSemanticsSnapshots - Paragraph', () => {
            
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(paragraph,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(paragraph, actionStatus);
        })
        it('Test-1.3-Function--1--setSemanticsSnapshots - Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(stanza,actionStatus);
            expect(spyFunction).toHaveBeenCalledWith(stanza,actionStatus);

        })
        it('Test-1.4-Function--1--setSemanticsSnapshots - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(blockquote,actionStatus );
            expect(spyFunction).toHaveBeenCalledWith(blockquote,actionStatus);

        })
        it('Test-1.5-Function--1--setSemanticsSnapshots - figure', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'setSemanticsSnapshots');
            elementSnapshotUtilityFn.setSemanticsSnapshots(figure, actionStatus );
            expect(spyFunction).toHaveBeenCalledWith(figure, actionStatus);

        })
    });
    describe('Test-2-Function--2--fetchElementsTag', () => {
        const { paragraph, heading, list, blockquote, aside, workedexample, stanza, figure } = tcmTestData.fetchElementTagData
        it('Test-2.1-Function--2--fetchElementsTag - Paragraph', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(paragraph)
            expect(spyFunction).toHaveReturnedWith('P')
        })
        it('Test-2.2-Function--2--fetchElementsTag - Heading', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(heading)
            expect(spyFunction).toHaveReturnedWith('H3')
        })
        it('Test-2.3-Function--2--fetchElementsTag - List', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(list)
            expect(spyFunction).toHaveReturnedWith('OL+lower-alpha')
        })
        it('Test-2.4-Function--2--fetchElementsTag - Blockquote', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(blockquote)
            expect(spyFunction).toHaveReturnedWith('BQ+blockquote')
        })
        it('Test-2.5-Function--2--fetchElementsTag - Aside', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(aside)
            expect(spyFunction).toHaveReturnedWith('AS')
        })
        it('Test-2.6-Function--2--fetchElementsTag - WorkedExample', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(workedexample)
            expect(spyFunction).toHaveReturnedWith('WE')
        })
        it('Test-2.7-Function--2--fetchElementsTag - Others-Stanza', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(stanza)
            expect(spyFunction).toHaveReturnedWith('ST')
        })
        it('Test-2.8-Function--2--fetchElementsTag - figure', () => {
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'fetchElementsTag');
            elementSnapshotUtilityFn.fetchElementsTag(figure)
            expect(spyFunction).toHaveReturnedWith('Fg')
        })
    });
    describe('Test-3-Function--3--generateWipDataForFigure', () => {
        const { slate1, slate2 } = tcmTestData
        const manifestUrn = "urn:pearson:manifest:90b59454-2e5d-46f2-968f-fd1d636d0edb"
        const manifestUrn2 = "urn:pearson:manifest:2ec00412-840e-40bf-ae11-d399c5067c9a"
        it('Test-3.1--generateWipDataForFigure - figure - slate', () => {
            const { bodymatter } = slate1[manifestUrn].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "3-1")
            expect(spyFunction).toHaveReturnedWith(bodymatter[3])
        })
        it('Test-3.2--generateWipDataForFigure - figure - in aside', () => {
            const { bodymatter } = slate1[manifestUrn].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "2-1")
            expect(spyFunction).toHaveReturnedWith(bodymatter[2].elementdata.bodymatter[1])
        })
        it('Test-3.2--generateWipDataForFigure - figure - in WE', () => {
            const { bodymatter } = slate1[manifestUrn].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "2-2-2")
            expect(spyFunction).toHaveReturnedWith(bodymatter[2].elementdata.bodymatter[2].contents.bodymatter[2])
        })
        it('Test-3.3--generateWipDataForFigure - figure - in slate - footnote updation', () => {
            const { bodymatter } = slate1[manifestUrn].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "3-2-2")
            expect(spyFunction).toHaveReturnedWith(bodymatter[3])
        })
        it('Test-3.4--generateWipDataForFigure - figure - in Multi Column', () => {
            const { bodymatter } = slate2[manifestUrn2].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "3-0-0")
            expect(spyFunction).toHaveReturnedWith(bodymatter[3].groupeddata.bodymatter[0].groupdata.bodymatter[0])
        })
        it('Test-3.5--generateWipDataForFigure - figure - in Multi Column - footnote updation', () => {
            const { bodymatter } = slate2[manifestUrn2].contents
            const spyFunction = jest.spyOn(elementSnapshotUtilityFn, 'generateWipDataForFigure');
            elementSnapshotUtilityFn.generateWipDataForFigure(bodymatter, "3-0-0-1")
            expect(spyFunction).toHaveReturnedWith(bodymatter[3].groupeddata.bodymatter[0].groupdata.bodymatter[0])
        })
    })
});
