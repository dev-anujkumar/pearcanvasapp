import TCMUtils from '../../../js/tcmUtils';
/**
 * Service Mapper is responsible for converting the API structure to Application structure
 * returns  data
 */
const GlossaryDataMapper = {
  getGlossaryData(glossaryDataOld, glossaryDataLatest) {
    if(glossaryDataOld.length && glossaryDataLatest.length) {
      const result =TCMUtils.correctOrder(glossaryDataOld,glossaryDataLatest);
      glossaryDataOld =result.glossaryDataOld;
      glossaryDataLatest=result.glossaryDataLatest;
    }


    const glossaryProcessedData = [];
    if (glossaryDataOld.length || glossaryDataLatest.length) {
      let glossaryData = [];
      glossaryData = glossaryDataLatest.length > glossaryDataOld.length ? glossaryDataLatest : glossaryDataOld;

      function matchIndexing(a, b) {
        let found = 0;
            for (var i = 0, len = a.length; i < len; i++) { 
                for (var j = 0, len2 = b.length; j < len2; j++) { 
                    if (a[i].glossaryId === b[j].glossaryId) {
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
      if (glossaryDataOld.length && glossaryDataLatest.length){
         glossaryDataLatest= matchIndexing(glossaryDataOld, glossaryDataLatest)
      }  

      for (let i = 0; i < glossaryData.length; i += 1) {
        let tempGlossaryData = {};
        if ( (glossaryDataOld[i] && (Object.keys(glossaryDataOld[i]).length ))  && (glossaryDataLatest[i] && (Object.keys(glossaryDataLatest[i]).length ))) {
          tempGlossaryData = {
            glossaryId: glossaryDataOld[i].glossaryId,
            glossaryTerm: TCMUtils.getDiffContent(glossaryDataOld[i].glossaryTerm, glossaryDataLatest[i].glossaryTerm),
            glossaryNarrative: glossaryDataOld[i].glossaryNarrative,
            glossaryDefinition: TCMUtils.getDiffContent(glossaryDataOld[i].glossaryDefinition, glossaryDataLatest[i].glossaryDefinition),
            status: (this.getGlossaryFootNoteChangeStatus(glossaryDataOld[i], glossaryDataLatest[i], 'glossaryDefinition') && this.getGlossaryFootNoteChangeStatus(glossaryDataOld[i], glossaryDataLatest[i], 'glossaryTerm')) === true ? true : false,
            glossaryDataOld: glossaryDataOld[i].glossaryDefinition,
            glossaryDataLatest: glossaryDataLatest[i].glossaryDefinition,
            glossaryTermOld: glossaryDataOld[i].glossaryTerm,
            glossaryTermLatest: glossaryDataLatest[i].glossaryTerm,
          };
        } else if (glossaryDataOld[i] && Object.keys(glossaryDataOld[i]).length ) {
          tempGlossaryData = {
            glossaryId: glossaryDataOld[i].glossaryId,
            glossaryTerm: glossaryDataOld[i].glossaryTerm,
            glossaryNarrative: glossaryDataOld[i].glossaryNarrative,
            glossaryDefinition: glossaryDataOld[i].glossaryDefinition,
            status: false,
          };
        } else if (glossaryDataLatest[i] && Object.keys(glossaryDataLatest[i]).length ) {
          tempGlossaryData = this.getPendingGlossaryTransactionDifference(glossaryDataLatest[i]);
        }
        glossaryProcessedData.push(tempGlossaryData);
      }
    }
    return glossaryProcessedData;
  },

  getPendingGlossaryTransactionDifference(pendingGlossaryData) {
    let glossaryProcessedData = [];
    const acceptedValue = '';
    if (!Array.isArray(pendingGlossaryData)) {
      return {
        ...pendingGlossaryData,
        glossaryDataOld: acceptedValue,
        glossaryDataLatest: pendingGlossaryData.glossaryDefinition,
        glossaryDefinition: TCMUtils.getDiffContent(acceptedValue, pendingGlossaryData.glossaryDefinition),
        glossaryTermOld: acceptedValue,
        glossaryTermLatest: pendingGlossaryData.glossaryTerm,
        glossaryTerm: TCMUtils.getDiffContent(acceptedValue, pendingGlossaryData.glossaryTerm),
        status: false,
      };
    }
    glossaryProcessedData = pendingGlossaryData.map(data => (
      {
        ...data,
        glossaryDataOld: acceptedValue,
        glossaryDataLatest: data.glossaryDefinition,
        glossaryDefinition: TCMUtils.getDiffContent(acceptedValue, data.glossaryDefinition),
        glossaryTermOld: acceptedValue,
        glossaryTermLatest: data.glossaryTerm,
        glossaryTerm: TCMUtils.getDiffContent(acceptedValue, data.glossaryTerm),
        status: false,
      }
    ));
    return glossaryProcessedData;
  },

  getGlossaryFootNoteChangeStatus(glossaryDataOld, glossaryDataLatest, compareValueType) {
    return TCMUtils.isDefinitionSame(glossaryDataOld[compareValueType], glossaryDataLatest[compareValueType]);
  },

};

export default GlossaryDataMapper;
