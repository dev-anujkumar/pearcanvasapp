var _ = require("lodash");
const uuidV4 = require("uuid/v4");
import { utils, checkforToolbarClick } from '../../src/js/utils.js';

describe('Utils file function testing', () => {
    it('Testing getMonthName function', () => {
        let result = utils.getMonthName(2, true)
        expect(result).toBe('Mar')

    })

    it('Testing getMonthName else function', () => {
        let result = utils.getMonthName(2, false);
        expect(result).toBe('March')

    })

    it('Testing getCommentFormatTime function', () => {
        let result = utils.getCommentFormatTime(2, 2);
        expect(result).toBe('02:02 AM')

    })

    xit('Testing buildCommentDate function', () => {
        let result = utils.buildCommentDate('2015-03-25')
        expect(result).toBe('Mar. 25, 2015 @05:30 AM')
    })

    it('Testing toTitleCase function', () => {
        let result = utils.toTitleCase('2015-03-25')
        expect(result).toBe('2015-03-25')

    })

    it('Testing getTaxonomicType function', () => {
        let data = 'flashcards'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe(data)
    })

    it('Testing cite-interactive-slideshow-video param in taxonomic function',()=>{
        let data = 'cite-interactive-video-with-interactive'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe("video-mcq")
    })

    it('Testing checkforToolbarClick function', () => {
        let classList = ["tox-tbtn","tox-tbtn--select","tox-split-button"];
        let format = checkforToolbarClick(classList);
        expect(format).toEqual(true)

    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-slideshow-image'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('gallery-image')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-graph'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('graph')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-simulation'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-survey'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('survey')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-timeline'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('timeline')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-fill-in-blank'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('fill-in-blank')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-multiple-choice'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('mcq')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-hotspot'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('hotspot')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-accounting-tables'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('accountingtable')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-video-with-interactive'
        let format = utils.getTaxonomicType(data)
        expect(format).toBe('video-mcq')
    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'mmi'
        let type = utils.getTaxonomicFormat(data)
        expect(type).toBe(data)

    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'cite'
        let type = utils.getTaxonomicFormat(data);
        expect(type).toBe(data)

    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'tdx'
        let type = utils.getTaxonomicFormat(data);
        expect(type).toBe(data)
    })
});