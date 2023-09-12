import config from "../config/config"

/**
 * Checks whether slate is locked.
 **/ 
export const checkSlateLock = (slateLockInfo) => {
    let lockedUserId = slateLockInfo ? slateLockInfo.userId.replace(/.*\(|\)/gi, ''): ""; // Retrieve only PROOT id
    console.log('INSIDE UTILITY CHECK LOCK SLATE CONDITION', slateLockInfo.isLocked, 'config userId', config.userId, 'lockedUserId', lockedUserId)
    return (slateLockInfo.isLocked && config.userId !== lockedUserId);
}