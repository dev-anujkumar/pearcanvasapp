import config from "../config/config"

/**
 * Checks whether slate is locked.
 **/ 
export const checkSlateLock = (slateLockInfo) => {
    // if(slateLockInfo.isLocked && config.userId !== slateLockInfo.userId){
    //     return true
    // }
    // else {
    //     return false
    // }
    return (slateLockInfo.isLocked && config.userId !== slateLockInfo.userId);
}