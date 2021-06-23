import moment from 'moment';
import HtmlDiff from './difftool/Diff';

const TCMUtils = {
  getDiffContent(latestAcepted, latestPending) {
    let acceptedTag = latestAcepted.includes('<ul') ? 'ul' : latestAcepted.includes('<ol') ? 'ol' : null;
    let pendingTag =  latestPending.includes('<ul') ? 'ul' : latestPending.includes('<ol') ? 'ol' : latestPending.includes('<p') ? 'p' : null;
    if(pendingTag && acceptedTag && (pendingTag !== acceptedTag)) {
      if (pendingTag == 'p'){
        let arrayData = latestAcepted.match(/<(.*?)>|[0-9a-zA-Z.*^$)('";:.{}`!@#$%^&()-+=\B,]+[^/>/<]/g);
        let newStr = '';
        arrayData.map((value, index) => {
          if (value.search('li') > 0) {
            if (newStr.substr(-1) !== " ") {
              newStr += ' ';
            }
          }
          if (((value.search('ol') < 1) && (value.search('li') < 1) && (value.search('ul') < 1)) || (value.search('<') !== 0 )) {
            if (value.search('data-footnoteelementid') > 0) {
              value += '*'
              newStr += value;
            }
            else { newStr += value }
          }
        })
        latestAcepted = ' '+newStr+' ';
        // latestAcepted = latestAcepted.replace(/(<([^>]+)>)/g, "");
      } else {
        try{
          latestAcepted = latestAcepted.replaceAll(acceptedTag, pendingTag)
        } catch(e){
            return HtmlDiff.execute(latestAcepted, latestPending);
        } 
      }
    }
    return HtmlDiff.execute(latestAcepted, latestPending);
  },

  formatDateTime(timestamp, formatter = 'D.M.YY hh:mm A') {
    const intTime = parseInt(timestamp, 10);
    return moment(intTime).format(formatter);
  },

  formatChangeDateTime(timestamp, formatter = 'D.M.YY HH:mm:ss:SSS') {
    const intTime = parseInt(timestamp, 10);
    return moment(intTime).format(formatter);
  },

  getComplexElementParentTag(tagName) {
    return tagName.split(':')[0];
  },

  getComplexElementSection(tagName) {
    return tagName.split(':')[1];
  },

  getSimpleElementTag(tagName) {
    const tagArray = tagName.split(':');
    let tag = '';
    if (tagArray.length === 1) {
      tag = tagArray[0].split('+')[0];
    } else {
      tag = tagArray[tagArray.length - 1].split('+')[0];
    }
    return tag;
  },

  replacePlaceholder(replacements, str) {
    if (!str) return str;
    return str.replace(/%\w+%/g, all => replacements[all] || all);
  },

  setGlossaryData(glossorySnapshot) {
    let glossaryData = {};
    glossorySnapshot.forEach((data) => {
      glossaryData = {
        ...glossaryData,
        [data.glossaryId]: {
          glossaryTerm: data.glossaryTerm,
          glossaryNarrative: data.glossaryNarrative,
          glossaryDefinition: data.glossaryDefinition,
          glossaryDataOld: data.glossaryDataOld === undefined ? false : data.glossaryDataOld,
          glossaryDataLatest: data.glossaryDataLatest === undefined ? false : data.glossaryDataLatest,
          glossaryTermOld: data.glossaryTermOld === undefined ? false : data.glossaryTermOld,
          glossaryTermLatest: data.glossaryTermLatest === undefined ? false : data.glossaryTermLatest,
          status: data.status === undefined ? false : data.status,
        },
      };
    });

    return glossaryData;
  },

  setFootnoteData(footnoteSnapshot) {
    let footnoteData = {};
    footnoteSnapshot.forEach((data) => {
      footnoteData = {
        ...footnoteData,
        [data.footnoteId]: {
          footnote: data.footnote,
          footnoteDataOld: data.footnoteDataOld === undefined ? false : data.footnoteDataOld,
          footnoteDataLatest: data.footnoteDataLatest === undefined ? false : data.footnoteDataLatest,
          status: data.status === undefined ? false : data.status,
        },
      };
    });

    return footnoteData;
  },
  setAssetpopoverData(assetpopoverSnapshot) {
    let assetpopoverData = {};
    assetpopoverSnapshot.forEach((data) => {
      assetpopoverData = {
          ...assetpopoverData,
          [data.assetid]: {
          label: data.label,
          oldLabel: data.oldLabel,
          linkid : data.linkID,
          isAccepted : data.isAccepted ? true : false,
          type : data.type ? data.type : null
          // assetpopoverDataOld: data.assetpopoverDataOld === undefined ? false : data.assetpopoverDataOld,
          // assetpopoverDataLatest: data.assetpopoverDataLatest === undefined ? false : data.assetpopoverDataLatest,
          // status: data.status === undefined ? false : data.status,
        },
      };
    });

    return assetpopoverData;
  },
  getCookie(name) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
  },

  /**
   * This methos is used to fetch the list of unaccepted elements to
   * the store to make decision on acceptall button disable/enable
   */
  getPendingElementsList(elements) {
    const isElementInSlateHasFeedback = elements.some((data) => {
      if (Array.isArray(data)) {
        return this.checkFeedbackNestedElements(data);
      }
      return typeof data.feedback !== 'undefined';
    });
    if (isElementInSlateHasFeedback) {
      return [];
    }
    let returnValue = [];
    const isAllElementAccepted = this.checkAcceptNestedElements(elements, returnValue)

    return isAllElementAccepted;
  },

  checkFeedbackNestedElements(element) {
    return element && element.length > 0 && element.some(
      (subElement) => {
        if (subElement && Array.isArray(subElement) && subElement.length > 0) {
          return this.checkFeedbackNestedElements(subElement)
        }
        else if (!Array.isArray(subElement)) {
          return typeof subElement.feedback !== 'undefined';
        }
      },
    );
  },

  checkAcceptContainerElements(element, ) {
    let returnValue;
    element && element.length > 0 && element.filter((data) => {

      if (Array.isArray(data)) {
        returnValue = data.filter(
          eObj => eObj.changeStatus !== 'accepted'
            && eObj.changeStatus !== 'rejected'
            && eObj.elementChangeType !== 'create'
            && eObj,
        );
        returnValue = returnValue.length > 0 && returnValue;
      } else if (!Array.isArray(data)) {
        returnValue = data.changeStatus !== 'accepted'
          && data.changeStatus !== 'rejected'
          && data.elementChangeType !== 'create'
          && data;
      }
    });
    return returnValue;
  },

  checkAcceptNestedElements(element, returnValue) {
    if (element && element.length > 0) {
      returnValue = element.filter((subElement) => {
        if (subElement && Array.isArray(subElement) && subElement.length > 0) {
          let returnValue1 = subElement.filter(subElement2 => {
            if (subElement2 && Array.isArray(subElement2) && subElement2.length > 0) {
              let returnValue2 = subElement2.filter(subElement3 => {
                if (subElement3 && Array.isArray(subElement3) && subElement3.length > 0) {
                  return this.checkAcceptContainerElements(subElement3)
                } else if (!Array.isArray(subElement3)) {
                  return subElement3.changeStatus !== 'accepted' && subElement3.changeStatus !== 'rejected' && subElement3.elementChangeType !== 'create' && subElement3;
                }
              })
              returnValue2 = returnValue2.length > 0 && returnValue2;
              return returnValue2
            } else if (!Array.isArray(subElement2)) {
              return subElement2.changeStatus !== 'accepted' && subElement2.changeStatus !== 'rejected' && subElement2.elementChangeType !== 'create' && subElement2;
            }
          })
          returnValue1 = returnValue1.length > 0 && returnValue1;
          return returnValue1
        }
        else if (!Array.isArray(subElement)) {
          return subElement.changeStatus !== 'accepted' && subElement.changeStatus !== 'rejected' && subElement.elementChangeType !== 'create' && subElement;
        }
      });
      returnValue = returnValue.length > 0 && returnValue;
      return returnValue
    }
  },

  isDefinitionSame(curentDefinition, previousDefinition) {
    let isSame = true;
    if (curentDefinition.trim() !== previousDefinition.trim()) {
      isSame = false;
    }

    return isSame;
  },

  /**
   * This method is used to replace &nbsp; with space character
   * @param {String} contentStr
   */
  replaceNBSPWithSpace(contentStr) {
    let replacingStr = contentStr;
    if (!replacingStr) return replacingStr;
    replacingStr = replacingStr.replace(/&nbsp;/g, ' ');
    return replacingStr;
  },

  replaceWhitespaceWithSpace(contentStr) {
    let replacingStr = contentStr;
    if (!replacingStr) return replacingStr;
    replacingStr = replacingStr.replace(/\s+/g, ' ');
    return replacingStr;
  },

  getElementType(pendingElementType) {
    const charSeparator = '+';
    if (pendingElementType.indexOf(charSeparator) > -1) {
      return pendingElementType.split(charSeparator)[0];
    }
    return pendingElementType;
  },

  replaceAll(value, search, replacement) {
    return value.replace(new RegExp(search, 'g'), replacement);
  },
  
  removeMathML(data) {
    //console.log("data bfefroe>>>",data)
    data = data.replace(/data-temp-mathml/g, 'data-mathml');
    let mathMLImages = data.match(/<(img)\s[^>]*data-mathml=.*?>/g);
    let tempmathMLImages = JSON.parse(JSON.stringify(mathMLImages));
    if(mathMLImages!=null || mathMLImages!=undefined){
      for(let index = 0; index < mathMLImages.length; index++) {
        mathMLImages[index] = mathMLImages[index].replace(/ height=\\"[0-9]*\\"/, '').replace(/ width=\\"[0-9]*\\"/, '').replace(/ align=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ class=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ role=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ style=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ alt=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ draggable=\\"[a-zA-Z]*\\"/, '').replace(/ data-custom-editor=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ data-mce-style=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ height=\\\\\\"[0-9]*\\\\\\"/, '').replace(/ width=\\\\\\"[0-9]*\\\\\\"/, '').replace(/ align=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ class=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ role=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ style=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ alt=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ draggable=\\\\\\"[a-zA-Z]*\\\\\\"/, '').replace(/ data-custom-editor=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ data-mce-style=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/(?:\.png)[?][0-9].*?[\\"]/g,'.png\\');
        data = data.replace(tempmathMLImages[index],mathMLImages[index]);
        //console.log("data after>>>",data)
      }
       
    }
    return data;
    //return data.replace(/<(img)\s[^>]*data-mathml=.*?>/g, '').replace(/<(img)\s[^>]*data-temp-mathml=.*?>/g, '');
  },
  apiCleanUp(response) {
    response.forEach((data) => {
      if (data.elemSnapshot) {
        data.elemSnapshot = this.removeMathML(data.elemSnapshot);
      }

      if (data.latestPendingTransaction) {
        data.latestPendingTransaction.elemSnapshot = this.removeMathML(
          data.latestPendingTransaction.elemSnapshot
        );
      }

      if (data.latestAcceptedTransaction) {
        data.latestAcceptedTransaction.elemSnapshot = this.removeMathML(
          data.latestAcceptedTransaction.elemSnapshot
        );
      }
    });

    return response;
  },
  correctOrder(glossaryDataOld, glossaryDataLatest) {
    try {
      const tempOldGlossary = glossaryDataOld;
      const tempLatestGlossary = glossaryDataLatest;
      const deletedLatest = [];
      for (let i = 0; i < tempLatestGlossary.length; i++) {
        for (let j = 0; j < tempOldGlossary.length; j++) {
          if ((!!tempLatestGlossary[i] && !!tempOldGlossary[j]) && tempLatestGlossary[i].glossaryId === tempOldGlossary[j].glossaryId) {
            deletedLatest.push(tempLatestGlossary[i]);
            tempLatestGlossary.splice(i, 1);
          }
        }
      }
      glossaryDataLatest.unshift(...deletedLatest);
    } catch (err) {
      console.log(err);
    }
    return {
      glossaryDataOld,
      glossaryDataLatest,
    };
  },

  correctOrderFootnote(footnoteDataOld, footnoteDataLatest) {
    try {
      const tempOldFootnote = footnoteDataOld;
      const tempLatestFootnote = footnoteDataLatest;
      const deletedLatest = [];
      for (let i = 0; i < tempLatestFootnote.length; i++) {
        for (let j = 0; j < tempOldFootnote.length; j++) {
          if ((!!tempLatestFootnote[i] && !!tempOldFootnote[j]) && tempLatestFootnote[i].footnoteId === tempOldFootnote[j].footnoteId) {
            deletedLatest.push(tempLatestFootnote[i]);
            tempLatestFootnote.splice(i, 1);
          }
        }
      }
      footnoteDataLatest.unshift(...deletedLatest);
    } catch (err) {
      console.log(err);
    }
    return {
      footnoteDataOld,
      footnoteDataLatest,
    };
  },

  processGlossaryData(data, type) {
    const glossary = JSON.parse(data);
    let glossaryProcessedData = {};
    if (type === 'accepted' || type === 'current') {
      Object.keys(glossary).forEach((key) => {
        glossaryProcessedData = {
          ...glossaryProcessedData,
          [key]: {
            glossaryDefinition: glossary[key].glossaryDataLatest === false ? glossary[key].glossaryDefinition : glossary[key].glossaryDataLatest,
            glossaryTerm: glossary[key].glossaryTermLatest === false ? glossary[key].glossaryTerm : glossary[key].glossaryTermLatest,
            elementType: 'accepted',
            status: glossary[key].status,
          },
        };
      });
      return JSON.stringify(glossaryProcessedData);
    }
    if (type === 'rejected') {
      Object.keys(glossary).forEach((key1) => {
        glossaryProcessedData = {
          ...glossaryProcessedData,
          [key1]: {
            glossaryDefinition: glossary[key1].glossaryDataOld === false
              ? glossary[key1].glossaryDefinition : TCMUtils.getDiffContent(glossary[key1].glossaryDataLatest, glossary[key1].glossaryDataOld),
            glossaryTerm: glossary[key1].glossaryTermOld === false
              ? glossary[key1].glossaryTerm : TCMUtils.getDiffContent(glossary[key1].glossaryTermLatest, glossary[key1].glossaryTermOld),
            elementType: 'rejected',
            status: glossary[key1].status,
          },
        };
      });
      return JSON.stringify(glossaryProcessedData);
    }
    return data;
  },

  processFootnoteData(data, type) {
    const footnoteData = JSON.parse(data);
    let footnoteProcessedData = {};
    if (type === 'accepted' || type === 'current') {
      Object.keys(footnoteData).forEach((key) => {
        footnoteProcessedData = {
          ...footnoteProcessedData,
          [key]: {
            footnote: footnoteData[key].footnoteDataLatest === false ? footnoteData[key].footnote : footnoteData[key].footnoteDataLatest,
            elementType: 'accepted',
          },
        };
      });

      return JSON.stringify(footnoteProcessedData);
    }
    if (type === 'rejected') {
      Object.keys(footnoteData).forEach((key) => {
        footnoteProcessedData = {
          ...footnoteProcessedData,
          [key]: {
            footnote: footnoteData[key].footnoteDataOld === false ? footnoteData[key].footnote : TCMUtils.getDiffContent(footnoteData[key].footnoteDataLatest, footnoteData[key].footnoteDataOld),
            elementType: 'rejected',
          },
        };
      });
      return JSON.stringify(footnoteProcessedData);
    }
    return data;
  },

  // eslint-disable-next-line complexity
  updateGlossaryAndFootnoteStyle(data) {
    const footnote = JSON.parse(data.footnoteSnapshot);
    const glossary = JSON.parse(data.glossorySnapshot);
    const assetpopover = JSON.parse(data.assetPopOverSnapshot);

    for (const key of Object.keys(footnote)) {
      const footnoteStateData = footnote[key];
      let footnotesData,footnoteDataDiff; 
      let figureType = ['subtitle', 'captions', 'credits']
      if(data.content && data.content.captions){
        footnotesData = {
          subtitle :  data.content.subtitle.split(/(<a)/),
          captions :  data.content.captions.split(/(<a)/),
          credits :  data.content.credits.split(/(<a)/),
        }
        footnoteDataDiff = {
          subtitle :  data.diffElement.htmlContent.subtitle.split(/(<a)/),
          captions :  data.diffElement.htmlContent.captions.split(/(<a)/),
          credits :  data.diffElement.htmlContent.credits.split(/(<a)/),
        }
        if (!data.elementType.includes("Elm") && !data.elementType.includes("Quad")) {
          footnotesData["metadata"] = data.content.metadata.split(/(<a)/)
          footnoteDataDiff["metadata"] = data.diffElement.htmlContent.metadata.split(/(<a)/)
          figureType.push('metadata')
        }
      } else {
        footnotesData = data.content.split(/(<a)/);
        footnoteDataDiff = data.diffElement.htmlContent.split(/(<a)/);
      }
      
     
      if (footnotesData.captions) {
        figureType.forEach((item) => {
          for (let i = 0; i < footnotesData[item].length; i++) {
            if (footnotesData[item][i].includes('paragraphNumeroUnoFootnote') && footnotesData[item][i].includes(key) && footnoteStateData.status) {
              footnotesData[item][i] = footnotesData[item][i].replace('paragraphNumeroUnoFootnote', 'deactiveFootnote');
            }
          }
        })
        figureType.forEach((item) => {
          for (let i = 0; i < footnoteDataDiff[item].length; i++) {
            if (footnoteDataDiff[item][i].includes('paragraphNumeroUnoFootnote') && footnoteDataDiff[item][i].includes(key) && footnoteStateData.status) {
              footnoteDataDiff[item][i] = footnoteDataDiff[item][i].replace('paragraphNumeroUnoFootnote', 'deactiveFootnote');
            }
          }
        })
        figureType.forEach((item) => {
          data.content[item] = footnotesData[item].join('');
          data.diffElement.htmlContent[item] = footnoteDataDiff[item].join('')
        })
      }
      else {
        for (let i = 0; i < footnotesData.length; i++) {
          if (footnotesData[i].includes('paragraphNumeroUnoFootnote') && footnotesData[i].includes(key) && footnoteStateData.status) {
            footnotesData[i] = footnotesData[i].replace('paragraphNumeroUnoFootnote', 'deactiveFootnote');
          }
        }
        for (let i = 0; i < footnoteDataDiff.length; i++) {
          if (footnoteDataDiff[i].includes('paragraphNumeroUnoFootnote') && footnoteDataDiff[i].includes(key) && footnoteStateData.status) {
            footnoteDataDiff[i] = footnoteDataDiff[i].replace('paragraphNumeroUnoFootnote', 'deactiveFootnote');
          }
        }
        data.content = footnotesData.join('');
        data.diffElement.htmlContent = footnoteDataDiff.join('');
      }
     
    }

    for (const key1 of Object.keys(glossary)) {
      const glossaryStateData = glossary[key1];
      const glossaryData = data.content.split(/(<dfn)/);
      const glossaryDataDiff = data.diffElement.htmlContent.split(/(<dfn)/);
      for (let j = 0; j < glossaryData.length; j++) {
        if (glossaryData[j].includes('GlossaryTerm') && glossaryData[j].includes(key1) && glossaryStateData.status) {
          glossaryData[j] = glossaryData[j].replace('GlossaryTerm', 'DeactivateTerm');
        }
      }

      for (let j = 0; j < glossaryDataDiff.length; j++) {
        if (glossaryDataDiff[j].includes('GlossaryTerm') && glossaryDataDiff[j].includes(key1) && glossaryStateData.status) {
          glossaryDataDiff[j] = glossaryDataDiff[j].replace('GlossaryTerm', 'DeactivateTerm');
        }
      }
      data.content = glossaryData.join('');
      data.diffElement.htmlContent = glossaryDataDiff.join('');
    }

    for (const key2 of Object.keys(assetpopover)) {
      const assetpopoverStateData = assetpopover[key2];
      const assetpopoverData = data.content.split(/(<abbr)/);
      const assetpopoverDataDiff = data.diffElement.htmlContent.split(/(<abbr)/);
      for (let j = 0; j < assetpopoverData.length; j++) {
        if (assetpopoverData[j].includes('AssetPopoverTerm') && assetpopoverData[j].includes(key2) && assetpopoverStateData.isAccepted == true) {
          assetpopoverData[j] = assetpopoverData[j].replace('AssetPopoverTerm', 'DeactivateAsset');
        }
      }

      for (let j = 0; j < assetpopoverDataDiff.length; j++) {
        if (assetpopoverDataDiff[j].includes('AssetPopoverTerm') && assetpopoverDataDiff[j].includes(key2) && assetpopoverStateData.isAccepted == true) {
          assetpopoverDataDiff[j] = assetpopoverDataDiff[j].replace('AssetPopoverTerm', 'DeactivateAsset');
        }
      }
      data.content = assetpopoverData.join('');
      data.diffElement.htmlContent = assetpopoverDataDiff.join('');
    }
    return data;
  },

  replaceParentTag(originalHTML, replaceWithHTML) {

    let acceptedTx = originalHTML;
    const pendingTx = replaceWithHTML;

    // Replace start tag
    let acceptedTxSplit = acceptedTx.split('>');
    const startTagInPendingTx = pendingTx.split('>')[0];
    acceptedTxSplit[0] = startTagInPendingTx;
    acceptedTx = acceptedTxSplit.join('>');

    // Replace close tag
    acceptedTxSplit = acceptedTx.split('</');
    const endTagInPendingTx = pendingTx.split('</');
    acceptedTxSplit[acceptedTxSplit.length - 1] = endTagInPendingTx[endTagInPendingTx.length - 1];
    acceptedTx = acceptedTxSplit.join('</');

    return acceptedTx;
  },
  /**
   * This method is used to set tags in container element
   */
  setContainerElementTag(elementTag) {
    const filterTags = (tag)=>{
      let removeTags = ['HEAD','BODY','C1','C2'];
      return (removeTags.indexOf(tag) == -1)
    }
    const finalTag = elementTag.filter(tag => filterTags(tag));
    return finalTag;
  },

  checkContainerTag(elementTag, level) {
    const filterTags = ['AS', 'WE', 'SH', 'POP', 'PE', 'CG', '2C'];
    const elemTag = TCMUtils.setContainerElementTag(elementTag);
    if (elemTag && elemTag[level] && (filterTags.indexOf(elemTag[level].toUpperCase()) > -1)) {
      return true;
    }
    return false;
  }
};

export default TCMUtils;
