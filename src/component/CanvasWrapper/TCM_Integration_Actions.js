// // IMPORT - Plugins //
import React from 'react';
import config from '../../config/config';
import store from '../../appstore/store'
import { checkSlateLock } from '../../js/slateLockUtility'

export const loadTrackChanges = (elementId) => {
    var interval;
    let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
    if (!checkSlateLock(slateLockInfo)) {
        let slateData = store.getState().appStore.slateLevelData;
        let slateId = slateData[config.slateManifestURN] && slateData[config.slateManifestURN].type == 'popup' ? config.tcmslatemanifest ? config.tcmslatemanifest: config.tempSlateManifestURN
        : config.slateManifestURN;
        let popupSlateData = config.tempSlateManifestURN ? slateData[config.slateManifestURN] : {}
        var childObj = [];
        var createManifestObject = (element, type) => {
          if(element && element[type] && element[type].bodymatter){
            element[type].bodymatter.map((data)=>{
              if(data.id.includes("work")){
                let obj = {}
                obj.urn = data.id;
                obj.index = childObj.length
                childObj =[...childObj, obj]
              }
              if(data.id.includes("manifest") && data.type !='popup'){
               return createManifestObject(data,'contents')
              }else if(data.id.includes("manifest") && data.type =='popup'){
                return creatPopupObject(data)
              }
            })
          }
          return childObj;
        } 
      let columnChildObj = [];
      let createMultiColumnObject = (groupedContent) => {
        groupedContent && groupedContent.map((column,columnIndex) => {
          let columnBodymatter = column.groupdata.bodymatter;
          columnBodymatter && columnBodymatter.map((data,index) => {
            let obj = {}
            obj.urn = data.id;
            obj.index = index;
            obj.column=columnIndex==0?"C1":"C2"
            columnChildObj = [...columnChildObj, obj]
          })
        })
        return columnChildObj;
      }
      let popupChildren = []
      let creatPopupObject = async (element) => {
        let popupChildList = popupBody(element);
        popupChildList.length > 0 && popupChildList.map(async (data)=>{
          let obj = {}
          obj.urn = data.id;
          obj.index = childObj.length
          if(data && data.id && data.id.includes("work")){
            // let obj = {}
            // obj.urn = data.id;
            // obj.index = childObj.length
            popupChildren =[...popupChildren, obj]
          }
          if(data && data.id && data.id.includes("manifest")){
           if(data.type==="groupedcontent" &&  data.id && data.id.includes('manifest')){
                let groupedContent=data.groupeddata.bodymatter;
                let childData = await createMultiColumnObject(groupedContent)
                obj.child = childData;
              }
              else if(data.type==="popup" &&  data.id && data.id.includes('manifest')){
                let childData = await creatPopupObject(data)
                obj.child = childData;
              }
              else if(data.type!="groupedcontent" && data.type!="popup" &&  data.id && data.id.includes('manifest')){
                let newType = (data.type == 'citations' || data.type == 'poetry') ? 'contents' : 'elementdata'; 
                let childData = await createManifestObject(data,newType)
                obj.child = childData;
              }
          }
        })
        return await popupChildren
      }
      let popupBody = (element) => {
        let popupData = []
        let popupTitle = element.popupdata && element.popupdata['formatted-title'] ? element.popupdata['formatted-title'] : {}
        let popupCTA = element && element.popupdata && element.popupdata.postertextobject && element.popupdata.postertextobject[0]
        // popupData = popupData.push(popupTitle)
        popupData = popupTitle ?  [popupTitle,popupCTA] : [popupCTA]
        let popupSlate = {};
        if (popupSlateData && 'contents' in popupSlateData && 'bodymatter' in popupSlateData.contents && popupSlateData.contents.bodymatter.length > 0) {
          popupSlate = popupSlateData.contents.bodymatter
        } else if (element.popupdata && element.popupdata.bodymatter && element.popupdata.bodymatter.length > 0) {
          popupSlate = element.popupdata.bodymatter
        }
        popupData = popupData.concat(popupSlate)
        return popupData
      }
        if (slateData && slateData[slateId] && slateData[slateId].contents && slateData[slateId].contents.bodymatter) {
          var list = [];
          let elements = slateData[slateId].contents.bodymatter;
          if (elements && elements.length > 0) {
            elements.map(async(element, index) => {
              let obj = {};
              obj.index = index;
              obj.urn = element.id;
              if(element.type==="groupedcontent" && element.id && element.id.includes('manifest')){
                let groupedContent=element.groupeddata.bodymatter;
                let childData = await createMultiColumnObject(groupedContent)
                obj.child = childData;
              }
              // else if(element.type==="popup" && element.id && element.id.includes('manifest')){
              //   let childData = await creatPopupObject(element)
              //   obj.child = childData;       // Commenting this beacause it is forming endless recursive cycle
              // }
              else if(element.type!="groupedcontent" && element.type!="popup" && element.id && element.id.includes('manifest')){
                let newType = (element.type == 'citations' || element.type == 'poetry') ? 'contents' : 'elementdata'; 
                let childData = await createManifestObject(element,newType)
                obj.child = childData;
              }
              return list.push(obj);
            })
          }
        }

        let title = store.getState().appStore && store.getState().appStore.slateTitleUpdated ? store.getState().appStore.slateTitleUpdated :  "";

        let currentElementId = elementId ? elementId : "";
        let currentSlateTitle = title;
        let currentProjectUrn = config.projectUrn;
        let currentSlateUrn = config.tempSlateManifestURN ?  config.tempSlateManifestURN : config.slateManifestURN;
        let currentProjectEntityUrn = config.projectEntityUrn;
        let TCMurl = config.TCM_DASHBOARD_UI_URL;
        var trackChange = function(event) {
            var postmsg = function(win) {
                win.postMessage({ "slateTitle": currentSlateTitle, "eURN": currentElementId, "dURN": currentProjectUrn, "sURN": currentSlateUrn, "indexOfElements": list, "entityURN": currentProjectEntityUrn }, TCMurl);
            };            
            let url = TCMurl;
            let pathArray = url.split('/');
            let protocol = pathArray[0];
            let host = pathArray[2];
            let originURL = protocol + '//' + host;
            // check the origin
            if (event.origin == originURL)
                switch (event.data) {
                    case 'ready':
                        // e.source = the sending window object
                        interval = setTimeout(postmsg, 100, event.source);
                        break;

                    case 'close':
                        clearInterval(interval);
                        window.removeEventListener('message', trackChange, false);
                        break;
                }
        }
        window.addEventListener('message', trackChange, false);
        window.open(config.TCM_DASHBOARD_UI_URL, 'tcmwin');
    }
}
