import TCMUtils from '../../../js/tcmUtils';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const FootnotesDataMapper = {
  getFootnotesData(footnoteDataOld, footnoteDataLatest) {
    if(footnoteDataOld.length && footnoteDataLatest.length ){
      let result =TCMUtils.correctOrderFootnote(footnoteDataOld,footnoteDataLatest);
      footnoteDataOld =result.footnoteDataOld;
      footnoteDataLatest=result.footnoteDataLatest;
    }

    const footnoteProcessedData = [];

    function matchIndexing(a, b) {
      let found = 0;
          for (var i = 0, len = a.length; i < len; i++) { 
              for (var j = 0, len2 = b.length; j < len2; j++) { 
                  if (a[i].footnoteId === b[j].footnoteId) {
                      let temp = b[i];
                      b[i] = b[j];
                      b[j] = temp;
                      found++;
                  }
              }
              if(found == 0) {
              let tempMove = b[i];
              b[i] = {};
              let len = b.length;
              b[len] = tempMove
              }
              found = 0;
          }
          return b;
      
      }
    if (footnoteDataOld.length && footnoteDataLatest.length){
      footnoteDataLatest= matchIndexing(footnoteDataOld, footnoteDataLatest)
    } 

    if (footnoteDataOld.length || footnoteDataLatest.length) {
      let footnoteData = [];
      footnoteData = footnoteDataLatest.length > footnoteDataOld.length
        ? footnoteDataLatest : footnoteDataOld;
      for (let i = 0; i < footnoteData.length; i += 1) {
        let tempFootnoteData = {};
        if (footnoteDataOld[i] && Object.keys(footnoteDataOld[i]).length && footnoteDataLatest[i] && Object.keys(footnoteDataLatest[i]).length) {
          tempFootnoteData = {
            footnoteId: footnoteDataOld[i].footnoteId,
            footnote: TCMUtils.getDiffContent(
              TCMUtils.replaceWhitespaceWithSpace(footnoteDataOld[i].footnote), TCMUtils.replaceWhitespaceWithSpace(footnoteDataLatest[i].footnote),
            ),
            status: TCMUtils.isDefinitionSame(
              TCMUtils.replaceWhitespaceWithSpace(footnoteDataOld[i].footnote), TCMUtils.replaceWhitespaceWithSpace(footnoteDataLatest[i].footnote),
            ),
            footnoteDataOld: footnoteDataOld[i].footnote,
            footnoteDataLatest: footnoteDataLatest[i].footnote,
          };
        } else if (footnoteDataOld[i] && Object.keys(footnoteDataOld[i]).length) {
          tempFootnoteData = {
            footnoteId: footnoteDataOld[i].footnoteId,
            footnote: footnoteDataOld[i].footnote,
            status: false,
          };
        } else if (footnoteDataLatest[i] && Object.keys(footnoteDataLatest[i]).length) {
          tempFootnoteData = this.getPendingFootnoteDifference(footnoteDataLatest[i]);
          // {
          //   footnoteId: footnoteDataLatest[i].footnoteId,
          //   footnote: footnoteDataLatest[i].footnote,
          //   status: false,
          // };
        }
        footnoteProcessedData.push(tempFootnoteData);
      }
    }
    return footnoteProcessedData;
  },

  getPendingFootnoteDifference(pendingFootnoteData) {
    let footnoteProcessedData = [];
    const acceptedValue = '';
    if (!Array.isArray(pendingFootnoteData)) {
      return {
        ...pendingFootnoteData, footnteDataOld: acceptedValue, footnoteDataLatest: pendingFootnoteData.footnote, footnote: TCMUtils.getDiffContent(acceptedValue, pendingFootnoteData.footnote), status: false,
      };
    }
    footnoteProcessedData = pendingFootnoteData.map(data => (
      { 
        ...data, footnteDataOld: acceptedValue, footnoteDataLatest: data.footnote, footnote: TCMUtils.getDiffContent(acceptedValue, data.footnote)
      }
    ));
    return footnoteProcessedData;
  },
 
};

export default FootnotesDataMapper;
