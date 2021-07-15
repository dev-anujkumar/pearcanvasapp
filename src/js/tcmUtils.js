import moment from 'moment';
import HtmlDiff from './difftool/HtmlDiff';

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

  formatDateTime(timestamp, formatter = 'D.M.YY hh:mm A') {
    const intTime = parseInt(timestamp, 10);
    return moment(intTime).format(formatter);
  },

  formatChangeDateTime(timestamp, formatter = 'D.M.YY HH:mm:ss:SSS') {
    const intTime = parseInt(timestamp, 10);
    return moment(intTime).format(formatter);
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

  /**
   * This method is used to check the element type
   * @param {String} pendingElementType
   */

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

    /**
   * This method is used to remove the mathML from the snapshot
   * @param {String} data
   */
  
  removeMathML(data) {
    data = data.replace(/data-temp-mathml/g, 'data-mathml');
    let mathMLImages = data.match(/<(img)\s[^>]*data-mathml=.*?>/g);
    let tempmathMLImages = JSON.parse(JSON.stringify(mathMLImages));
    if(mathMLImages!==null || mathMLImages!==undefined){
      for(let index = 0; index < mathMLImages.length; index++) {
        mathMLImages[index] = mathMLImages[index].replace(/ height=\\"[0-9]*\\"/, '').replace(/ width=\\"[0-9]*\\"/, '').replace(/ align=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ class=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ role=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ style=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ alt=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ draggable=\\"[a-zA-Z]*\\"/, '').replace(/ data-custom-editor=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ data-mce-style=\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\"/, '').replace(/ height=\\\\\\"[0-9]*\\\\\\"/, '').replace(/ width=\\\\\\"[0-9]*\\\\\\"/, '').replace(/ align=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ class=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ role=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ style=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ alt=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ draggable=\\\\\\"[a-zA-Z]*\\\\\\"/, '').replace(/ data-custom-editor=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/ data-mce-style=\\\\\\"[a-zA-Z0-9-+_!@#$%^&*., ?;:]*\\\\\\"/, '').replace(/(?:\.png)[?][0-9].*?[\\"]/g,'.png\\');
        data = data.replace(tempmathMLImages[index],mathMLImages[index]);
      }
       
    }
    return data;
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
};

export default TCMUtils;
