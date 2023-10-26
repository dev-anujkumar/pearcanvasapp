import config from "../config/config"

/**
 * Checks whether slate is locked.
 **/ 
export const checkSlateLock = (slateLockInfo) => {
    let lockedUserId = slateLockInfo ? slateLockInfo.userId.replace(/.*\(|\)/gi, ''): ""; // Retrieve only PROOT id
    return (slateLockInfo.isLocked && config.userId !== lockedUserId);
}
