import config from '../../src/config/config.js';
import {checkSlateLock} from '../../src/js/slateLockUtility.js';

describe('checkSlateLock Testing', () => {
    it('checkSlateLock if', () => {
        let slateLockInfo = {
            userId : 'test',
            isLocked : true
        }
        config.userId = 'test1';
        checkSlateLock(slateLockInfo)
    })

    it('checkSlateLock else', () => {
        let slateLockInfo = {
            userId : 'test',
            isLocked : true
        }
        config.userId = 'test';
        checkSlateLock(slateLockInfo)
    })
});