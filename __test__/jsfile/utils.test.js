var _ = require("lodash");
const uuidV4 = require("uuid/v4");
import {utils} from '../../src/js/utils.js';

describe('Utils file function testing', () => {
    it('Testing getMonthName function', () => {
        utils.getMonthName(2, true)
    })

    it('Testing getMonthName else function', () => {
        utils.getMonthName(2, false)
    })

    it('Testing getCommentFormatTime function', () => {
        utils.getCommentFormatTime(2, 2)
    })

    it('Testing buildCommentDate function', () => {
        utils.buildCommentDate('2015-03-25')
    })

    it('Testing toTitleCase function', () => {
        utils.toTitleCase('2015-03-25')
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'flashcards'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-slideshow-video'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-slideshow-image'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-graph'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-simulation'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-survey'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-timeline'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-fill-in-blank'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-multiple-choice'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-hotspot'
        utils.getTaxonomicType(data)
    })

    it('Testing getTaxonomicType function', () => {
        let data = 'cite-accounting-tables'
        utils.getTaxonomicType(data)
    })
    
    it('Testing getTaxonomicType function', () => {
        let data = 'cite-interactive-video-with-interactive'
        utils.getTaxonomicType(data)
    })
    
    it('Testing getTaxonomicFormat function', () => {
        let data = 'mmi'
        utils.getTaxonomicFormat(data)
    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'cite'
        utils.getTaxonomicFormat(data)
    })

    it('Testing getTaxonomicFormat function', () => {
        let data = 'tdx'
        utils.getTaxonomicFormat(data)
    })
});