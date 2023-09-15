import config from "../config/config"

/**
 * Checks whether slate is locked.
 **/ 
export const checkSlateLock = (slateLockInfo) => {
    let lockedUserId = slateLockInfo ? slateLockInfo.userId.replace(/.*\(|\)/gi, ''): ""; // Retrieve only PROOT id
    console.log('CHECKING LOCKED USER ID', lockedUserId, 'CHECKING CONFIG userId VALUE', slateLockInfo.isLocked, 'CONFIG USER ID', config.userId)
    return (slateLockInfo.isLocked && config.userId !== lockedUserId);
}