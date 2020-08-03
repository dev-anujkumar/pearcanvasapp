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
        let slateId = config.slateManifestURN;
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
              if(data.id.includes("manifest")){
               return createManifestObject(data,'contents')
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
        
        if (slateData && slateData[slateId] && slateData[slateId].contents && slateData[slateId].contents.bodymatter) {
          var list = [];
          let elements = slateData[slateId].contents.bodymatter;
          if (elements && elements.length > 0) {
            elements.map(async(element, index) => {
              let obj = {};
              obj.index = index;
              obj.urn = element.id;
              if(element.type==="groupedcontent" && obj.urn.includes('manifest')){
                let groupedContent=element.groupeddata.bodymatter;
                let childData = await createMultiColumnObject(groupedContent)
                obj.child = childData;
              }
              else if(element.type!="groupedcontent" && obj.urn.includes('manifest')){
                let newType = (element.type == 'citations' || element.type == 'poetry') ? 'contents' : 'elementdata'; 
                let childData = await createManifestObject(element,newType)
                obj.child = childData;
              }
              return list.push(obj);
            })
          }
        }

        let currentElementId = elementId ? elementId : "";
        let currentSlateTitle = document.querySelector('div.input-text .txt-input')? document.querySelector('div.input-text .txt-input').value: "";
        let currentProjectUrn = config.projectUrn;
        let currentSlateUrn = config.slateManifestURN;
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
