/**
 * Module - AssessmentActionHandlers
 * Description - This component consists of helper functions for assessmentActions
 */
import moment from 'moment';
import store from '../../../appstore/store.js';
import {
    GET_USAGE_TYPE,
    UPDATE_ELM_ITEM_ID,
    SET_ASSESSMENT_METADATA,
    SET_USAGE_TYPE,
    SET_INTERACTIVE_METADATA
} from "../../../constants/Action_Constants";
import { specialCharacterDecode } from '../assessmentCiteTdx/Actions/CiteTdxActions.js';
import { fetchAssessmentMetadata, fetchAssessmentVersions, setItemUpdateEvent } from './assessmentActions.js';
import { hideBlocker} from '../../../js/toggleLoader';
const AssessmentAPIHandlers = {
    /** @description This function prepares list of Assessment UsageTypes from api-response */
    prepareUsageTypeData: (res) => {
        let usageTypeList = [];
        if (res && res.data && res.data.length) {
            res.data.filter(usageType => {
                usageTypeList.push(usageType.label.en)
            })
        }
        return usageTypeList
    },
    /** @description This function dispatches list of Assessment UsageTypes to store */
    dispatchUsageTypeList: (entityType, res, apiStatus, dispatch) => {
        let usageTypeData = [];
        if (res?.data?.length) {
            res.data.forEach(usageType => {
                usageTypeData.push({ usagetype: usageType.usagetype, label: usageType.label.en })
            })
        }
        dispatch({
            type: SET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: usageTypeData,
                apiStatus: apiStatus,
            }
        })
    },
    /** @description This function dispatches list of Assessment UsageTypes to store */
    dispatchUsageTypeData: (entityType, usageTypeList, apiStatus, dispatch) => {
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: usageTypeList,
                apiStatus: apiStatus,
            }
        })
    },
    /** @description This function returns status of the assessment - wip|final */
    setAssessmentStatus: (responseStatus) => {
        let statusString = responseStatus.split("/");
        const assessmentStatus = statusString[statusString.length - 1];
        return assessmentStatus;
    },
    /** @description This function returns latest WorkURN from the list of All versions based on "createdDate" key */
    getLatestIndex: (allVersions, dateKey) => {
        let latestIndex = 0;
        for (let index = 1; index < allVersions.length; index++) {
            let isAfter = moment(allVersions[index][dateKey]).isAfter(allVersions[latestIndex][dateKey]);
            if (isAfter) {
                latestIndex = index;
            }
        }
        return latestIndex
    },
    /** @description This function returns second-last WorkURN from the list of All versions based on "createdDate" key */
    getSecondLatestIndex: (allVersions, latest) => {
        let latestIndex = 0;
        let latestArray = allVersions;
        latestArray.splice(latest, 1);
        latestIndex = AssessmentAPIHandlers.getLatestIndex(latestArray, 'createdDate');
        return latestIndex
    },
    /** @description This function is to set "showUpdateStatus" to handle update button status */
    checkAssessmentNextVersion: (nextData, previousWorkUrn) => {
        let createDate = new Date(nextData.dateCreated);
        const checkVersionIsClean = AssessmentAPIHandlers.checkElmVersionIsClean(nextData);
        // || (nextData.isVersionOf && nextData.isVersionOf[0] !== previousWorkUrn)
        if ((nextData.status.includes('final')) || (checkVersionIsClean == false) || (new Date(nextData.dateModified) > createDate.setSeconds(createDate.getSeconds() + 10))) {
            return true /*Update*/
        }
        return false    /*Approved*/
    },
    /** @description This function is to check if given Elm Version Is Clean to handle update button status */
    checkElmVersionIsClean: (responseData) => {
        const versionStatus = responseData.additionalMetadata.find(item => item.hasOwnProperty('elmVersionIsClean'));
        const isVersionClean = versionStatus && versionStatus.elmVersionIsClean == true ? true : false;
        return isVersionClean;
    },
    /** @description This function returns assessment-metadata to show update button */
    prepareDataBeforeUpdate: (assessmentData, currentWorkUrn, latestWorkURN, secondLatestWorkUrn = "") => {
        return {
            ...assessmentData,
            currentWorkUrn: currentWorkUrn,
            latestVersion: {
                id: latestWorkURN
            },
            secondLatestVersion: {
                id: secondLatestWorkUrn
            },
            showUpdateStatus: true
        }
    },
    /** @description This function returns assessment-metadata after click on update button */
    prepareDataOnUpdate: (assessmentData, currentWorkUrn, latestVersion, secondLatestVersion) => {
        return {
            ...assessmentData,
            currentWorkUrn: currentWorkUrn,
            latestVersion: latestVersion,
            secondLatestVersion: secondLatestVersion,
            targetId: latestVersion.id
        }
    },
    /** @description This function returns assessment-metadata for unapproved assessment */
    prepareUnapprovedData: (responseData, assessmentTitle, assessmentStatus, assessmentData) => {
        return {
            activeWorkUrn: responseData.versionUrn,
            assessmentTitle: assessmentTitle,
            showUpdateStatus: false,
            assessmentStatus: assessmentStatus,
            assessmentEntityUrn: responseData.entityUrn,
            targetId: assessmentData.targetId,
            createdDate: responseData.dateCreated
        }
    },
    /** @description This function returns assessment-metadata for assessment with status-final */
    prepareApprovedData: (assessmentData, responseData, assessmentTitle) => {
        return {
            ...assessmentData,
            showUpdateStatus: AssessmentAPIHandlers.checkAssessmentNextVersion(responseData, assessmentData.targetId),
            latestVersion: {
                id: responseData.versionUrn,
                title: assessmentTitle
            }
        }
    },
    /** @description This function handles assessment-metadata API response for Assessment */
    assessmentMetadataHandler: async (responseData, calledFrom, assessmentData, assessmentItemData, dispatch) => {
        const assessmentStatus = AssessmentAPIHandlers.setAssessmentStatus(responseData.status);
        const assessmentTitle = responseData.name ? specialCharacterDecode(responseData.name) : responseData.defaultTitle ? specialCharacterDecode(responseData.defaultTitle) : 'Elm assessment';
        let dataForUpdate = AssessmentAPIHandlers.prepareUnapprovedData(responseData, assessmentTitle, assessmentStatus, assessmentData);
        if (calledFrom == 'fromNextVersion') {  /* APPROVED | UPDATE */
            dataForUpdate = AssessmentAPIHandlers.prepareApprovedData(assessmentData, responseData, assessmentTitle);
            AssessmentAPIHandlers.dispatchAssessmentMetadata(assessmentData.activeWorkUrn, dataForUpdate, dispatch);
        }
        else if (calledFrom == 'fromUpdate') {  /** Save on Update */
            AssessmentAPIHandlers.assessmentMetadataUpdateHandler(responseData, assessmentData, assessmentItemData, dispatch)
        }
        else if (assessmentStatus == 'wip') {   /* UNAPPROVED */
            AssessmentAPIHandlers.dispatchAssessmentMetadata(responseData.versionUrn, dataForUpdate, dispatch);
        }
        else if (assessmentStatus == 'final') { /* APPROVED | UPDATE */
            await dispatch(fetchAssessmentVersions(responseData.entityUrn, 'assessment', responseData.dateCreated, dataForUpdate, {}))
        }
        if (assessmentItemData && assessmentItemData.targetItemid) { //dispatch item metadata api
            await dispatch(fetchAssessmentMetadata('assessmentItem', 'fromGetItem', dataForUpdate, assessmentItemData))
        }
    },
     /** @description This function handles interactive-metadata API response for Assessment */
    interactiveMetadataHandler: async (responseData, calledFrom, assessmentData, dispatch) => {
        const assessmentStatus = AssessmentAPIHandlers.setAssessmentStatus(responseData.status);
        const assessmentTitle = responseData.name ? specialCharacterDecode(responseData.name) : "";
        let dataForUpdate = AssessmentAPIHandlers.prepareUnapprovedData(responseData, assessmentTitle, assessmentStatus, assessmentData);
        if (calledFrom == 'fromNextVersion') {  /** Save on Update */
            dataForUpdate = AssessmentAPIHandlers.prepareApprovedData(assessmentData, responseData, assessmentTitle);
            AssessmentAPIHandlers.dispatchInteractiveMetadata(assessmentData.activeWorkUrn, dataForUpdate, dispatch);
        }
        else if (calledFrom == 'fromUpdate') {  /** Save on Update */
            AssessmentAPIHandlers.interactiveMetadataUpdateHandler(responseData, assessmentData, dispatch)
        }
        else if (assessmentStatus == 'wip') {   /* UNAPPROVED */
            AssessmentAPIHandlers.dispatchInteractiveMetadata(responseData.versionUrn, dataForUpdate, dispatch);
        }
        else if (assessmentStatus == 'final') { /* APPROVED | UPDATE */
            await dispatch(fetchAssessmentVersions(responseData.entityUrn, 'interactive', responseData.dateCreated, dataForUpdate, {}))
        }
    },
    /** @description This function handles interactive-versions API response for interactive */
    interactiveVersionHandler: (responseData, args, dispatch) => {
        const {
            newVersions, assessmentData
        } = args;
        const latestIndex = AssessmentAPIHandlers.getLatestIndex(responseData, 'createdDate');
        const latestWorkURN = responseData[latestIndex].versionUrn; /* Latest WorkURN */
        switch (newVersions.length) {
            case 0:  /* Show APPROVED Status */
                AssessmentAPIHandlers.dispatchInteractiveMetadata(assessmentData.activeWorkUrn, assessmentData, dispatch);
                break;
            case 1:  /* APPROVED | UPDATE */
                const updatedAssessmentData = { ...assessmentData, targetId: newVersions[0].versionUrn }
                dispatch(fetchAssessmentMetadata('interactive', 'fromNextVersion', updatedAssessmentData, {}))
                break;
            default: /* Show UPDATE Button */
                const prevLatestWorkUrn = responseData[AssessmentAPIHandlers.getSecondLatestIndex(responseData, latestIndex)].versionUrn;
                const updatedData = AssessmentAPIHandlers.prepareDataBeforeUpdate(assessmentData, assessmentData.activeWorkUrn, latestWorkURN, prevLatestWorkUrn);
                AssessmentAPIHandlers.dispatchInteractiveMetadata(assessmentData.activeWorkUrn, updatedData, dispatch);
                break;
        }
    },
    /** @description This function handles assessment-versions API response for Assessment */
    assessmentVersionHandler: (responseData, args, dispatch) => {
        const {
            newVersions, assessmentData, assessmentItemData
        } = args;
        const latestIndex = AssessmentAPIHandlers.getLatestIndex(responseData, 'createdDate');
        const latestWorkURN = responseData[latestIndex].versionUrn; /* Latest WorkURN */
        switch (newVersions.length) {
            case 0:  /* Show APPROVED Status */
                AssessmentAPIHandlers.dispatchAssessmentMetadata(assessmentData.activeWorkUrn, assessmentData, dispatch);
                break;
            case 1:  /* APPROVED | UPDATE */
                const updatedAssessmentData = { ...assessmentData, targetId: newVersions[0].versionUrn }
                dispatch(fetchAssessmentMetadata('assessment', 'fromNextVersion', updatedAssessmentData, assessmentItemData))
                break;
            default: /* Show UPDATE Button */
                const prevLatestWorkUrn = responseData[AssessmentAPIHandlers.getSecondLatestIndex(responseData, latestIndex)].versionUrn;
                const updatedData = AssessmentAPIHandlers.prepareDataBeforeUpdate(assessmentData, assessmentData.activeWorkUrn, latestWorkURN, prevLatestWorkUrn);
                AssessmentAPIHandlers.dispatchAssessmentMetadata(assessmentData.activeWorkUrn, updatedData, dispatch);
                break;
        }
    },
    /** @description This function handles assessment-versions API response for Assessment-Item */
    assessmentItemVersionHandler: (responseData, args, dispatch) => {
        const {
            assessmentData, assessmentItemData
        } = args;
        const latestIndex = AssessmentAPIHandlers.getLatestIndex(responseData, 'createdDate');
        const latestWorkURN = responseData[latestIndex].versionUrn; /* Latest WorkURN */
        const dataToSend = {
            currentWorkUrn: assessmentItemData.parentId,
            updatedItem: {
                oldItemId: assessmentItemData.itemId,
                latestItemId: latestWorkURN,
                latestItemTitle: assessmentItemData.updatedItem.latestItemTitle
            },
            targetItemid: latestWorkURN
        }
        const { itemUpdateEvent, latestItemAssessment } = store.getState().assessmentReducer
        if (itemUpdateEvent) {
            dispatch(setItemUpdateEvent(false));
            const updatedItem = {
                ...latestItemAssessment.updatedItem
            }
            AssessmentAPIHandlers.dispatchUpdatedItemId(dataToSend.currentWorkUrn, updatedItem, dispatch)
        } else if (latestWorkURN == assessmentItemData.itemId) {
            AssessmentAPIHandlers.dispatchUpdatedItemId(dataToSend.currentWorkUrn, dataToSend.updatedItem, dispatch)
        }
        else {
            dispatch(fetchAssessmentMetadata('assessmentItem', 'fromItemUpdate', assessmentData, dataToSend));
        }
    },
    /** @description This function handles assessment-metadata API response for Assessment-Item */
    assessmentItemMetadataHandler: (responseData, calledFrom, assessmentData, assessmentItemData, dispatch) => {
        const itemTitle = responseData.name ? specialCharacterDecode(responseData.name) : responseData.defaultTitle ? specialCharacterDecode(responseData.defaultTitle) : "";
        if (calledFrom == 'fromItemUpdate') {
            const updatedItem = {
                ...assessmentItemData.updatedItem,
                latestItemTitle: itemTitle
            }
            AssessmentAPIHandlers.dispatchUpdatedItemId(assessmentItemData.currentWorkUrn, updatedItem, dispatch)
        } else {
            const itemData = {
                oldItemId: assessmentItemData.itemId,
                latestItemTitle: itemTitle
            }
            dispatch(fetchAssessmentVersions(responseData.entityUrn, 'assessmentItem', responseData.dateCreated, assessmentData, { ...assessmentItemData, updatedItem: itemData }));
        }
    },
    /** @description This function handles assessment-verions API response for Assessment after Update Button Click */
    assessmentVersionUpdateHandler: async (responseData, args, dispatch) => {
        const {
            newVersions, assessmentData, assessmentItemData
        } = args;
        const latestIndex = AssessmentAPIHandlers.getLatestIndex(responseData, 'createdDate');
        const latestVersion = {
            id: responseData[latestIndex].versionUrn /* Latest WorkURN */
        }
        let secondLatestVersion = {
            id: ""
        }
        if (newVersions.length > 1) {
            const prevLatestWorkUrn = responseData[AssessmentAPIHandlers.getSecondLatestIndex(responseData, latestIndex)].versionUrn;
            secondLatestVersion = {
                id: prevLatestWorkUrn
            }
        }
        const updatedData = AssessmentAPIHandlers.prepareDataOnUpdate(assessmentData, assessmentData.activeWorkUrn, latestVersion, secondLatestVersion);
        await dispatch(fetchAssessmentMetadata('assessment', 'fromUpdate', updatedData, assessmentItemData));

    },
    /** @description This function handles assessment-verions API response for Assessment after Update Button Click */
    interactiveVersionUpdateHandler: async (responseData, args, dispatch) => {
        const {
            newVersions, assessmentData
        } = args;
        const latestIndex = AssessmentAPIHandlers.getLatestIndex(responseData, 'createdDate');
        const latestVersion = {
            id: responseData[latestIndex].versionUrn /* Latest WorkURN */
        }
        let secondLatestVersion = {
            id: ""
        }
        if (newVersions.length > 1) {
            const prevLatestWorkUrn = responseData[AssessmentAPIHandlers.getSecondLatestIndex(responseData, latestIndex)].versionUrn;
            secondLatestVersion = {
                id: prevLatestWorkUrn
            }
        }
        const updatedData = AssessmentAPIHandlers.prepareDataOnUpdate(assessmentData, assessmentData.activeWorkUrn, latestVersion, secondLatestVersion);
        await dispatch(fetchAssessmentMetadata('interactive', 'fromUpdate', updatedData));
    },
    /** @description This function handles interactive-metadata API response for Assessment after Update Button Click */
    interactiveMetadataUpdateHandler: (responseData, assessmentData, dispatch) => {
        const latestVersion = {
            id: responseData.versionUrn,
            title: responseData.name ? specialCharacterDecode(responseData.name) : responseData.defaultTitle ? specialCharacterDecode(responseData.defaultTitle) : 'Elm assessment',
            latestCleanVersion: AssessmentAPIHandlers.checkElmVersionIsClean(responseData),
            status: AssessmentAPIHandlers.setAssessmentStatus(responseData.status)
        }
        const dataToDispatch = {
            ...assessmentData,
            latestVersion: latestVersion
        }
        AssessmentAPIHandlers.dispatchInteractiveMetadata(assessmentData.activeWorkUrn, dataToDispatch, dispatch);
    },
    /** @description This function handles assessment-metadata API response for Assessment after Update Button Click */
    assessmentMetadataUpdateHandler: (responseData, assessmentData, assessmentItemData, dispatch) => {
        const latestVersion = {
            id: responseData.versionUrn,
            title: responseData.name ? specialCharacterDecode(responseData.name) : responseData.defaultTitle ? specialCharacterDecode(responseData.defaultTitle) : 'Elm assessment',
            latestCleanVersion: AssessmentAPIHandlers.checkElmVersionIsClean(responseData),
            status: AssessmentAPIHandlers.setAssessmentStatus(responseData.status)
        }
        const dataToDispatch = {
            ...assessmentData,
            latestVersion: latestVersion
        }
        AssessmentAPIHandlers.dispatchAssessmentMetadata(assessmentData.activeWorkUrn, dataToDispatch, dispatch);
    },
    /** @description This function handles assessment-entity-urn for Auto-update */
    assessmentEntityUrnHandler: (responseData) => {
        if (responseData && responseData.status) {
            return responseData.entityUrn;
        }
    },
    /** @description This function dispatches latest metadata for Assessment to store */
    dispatchAssessmentMetadata: (currentWorkUrn, dataForUpdate, dispatch) => {
        hideBlocker();
        dispatch({
            type: SET_ASSESSMENT_METADATA,
            payload: {
                currentWorkUrn: currentWorkUrn,
                dataForUpdate: dataForUpdate
            }
        })
    },
    /** @description This function dispatches latest metadata for interactive to store */
    dispatchInteractiveMetadata: (currentWorkUrn, dataForUpdate, dispatch) => {
        hideBlocker();
        dispatch({
            type: SET_INTERACTIVE_METADATA,
            payload: {
                currentWorkUrn: currentWorkUrn,
                dataToUpdate: dataForUpdate
            }
        })
    },
    /** @description This function dispatches latest metadata for Assessment-Item to store */
    dispatchUpdatedItemId: (currentWorkUrn, dataForUpdate, dispatch) => {
        hideBlocker();
        dispatch({
            type: UPDATE_ELM_ITEM_ID,
            payload: {
                currentWorkUrn: currentWorkUrn,
                updatedItem: dataForUpdate
            }
        })
    },
    /** @description This function for Assessment Error Message Handling */
    assessmentErrorHandler: (errorMessage) => {
        hideBlocker();
        console.error('Error in Assessment handling>>>>', errorMessage)
    }
}

export default AssessmentAPIHandlers;