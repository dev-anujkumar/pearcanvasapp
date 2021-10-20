import { fetchLiClassName } from '../../../src/component/BlockListComponent/BlockListHelperFunctions';

describe('Testing BlockList Helper', () => {
    it('Testing BlockList Helper function for decimal', () => {
        fetchLiClassName('decimal');
    })
    it('Testing BlockList Helper function for lower-alpha', () => {
        fetchLiClassName('lower-alpha');
    })
    it('Testing BlockList Helper function for lower-roman', () => {
        fetchLiClassName('lower-roman');
    })
    it('Testing BlockList Helper function for upper-alpha', () => {
        fetchLiClassName('upper-alpha');
    })
    it('Testing BlockList Helper function for upper-roman', () => {
        fetchLiClassName('upper-roman');
    })
    it('Testing BlockList Helper function for unordered', () => {
        fetchLiClassName('unordered');
    })
    it('Testing BlockList Helper function for default case', () => {
        fetchLiClassName('');
    })
});