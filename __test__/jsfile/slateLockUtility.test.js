import config from '../../src/config/config.js';
import {checkSlateLock} from '../../src/js/slateLockUtility.js';

describe('checkSlateLock Testing', () => {
    it('checkSlateLock if', () => {
        let slateLockInfo = {
            userId : 'test',
            isLocked : true
        }
        config.userId = 'test1';
        let result = checkSlateLock(slateLockInfo)
        expect(result).toBe(true)

    })

    it('checkSlateLock else', () => {
        let slateLockInfo = {
            userId : 'test',
            isLocked : true
        }
        config.userId = 'test';
        let result = checkSlateLock(slateLockInfo);
        expect(result).toBe(false)

    })
});