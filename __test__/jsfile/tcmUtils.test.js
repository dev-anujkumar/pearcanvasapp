import TCMUtils from '../../src/js/tcmUtils';

describe('tcmUtils', () => {
    it('tcmUtils getDiffContent ul', () => {
        const result = TCMUtils.getDiffContent('<ul', '<ul')
        expect(result).toBeTruthy()
    })

    it('tcmUtils getDiffContent ol', () => {
        const result = TCMUtils.getDiffContent('<ol', '<ol')
        expect(result).toBeTruthy()
    })

    it('tcmUtils getDiffContent ol', () => {
        const result = TCMUtils.getDiffContent('<ol', '')
        expect(result).toBeTruthy()
    })

    it('tcmUtils getDiffContent <p', () => {
        const result = TCMUtils.getDiffContent('<ol', '<p')
        expect(result).toBeTruthy()
    })

    it('tcmUtils getDiffContent', () => {
        const result = TCMUtils.getDiffContent('', '')
        expect(result)
    })
})