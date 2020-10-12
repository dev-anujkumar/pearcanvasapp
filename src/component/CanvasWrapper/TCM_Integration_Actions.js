// // IMPORT - Plugins //
import config from '../../config/config';
import store from '../../appstore/store'
import { checkSlateLock } from '../../js/slateLockUtility'

export const loadTrackChanges = (elementId) => {
  let slateLockInfo = store.getState().slateLockReducer.slateLockInfo;
  if (!checkSlateLock(slateLockInfo)) {
    const title = store.getState().appStore && store.getState().appStore.slateTitleUpdated ? store.getState().appStore.slateTitleUpdated : "";
    const currentSlateTitle = title;
    const currentProjectUrn = config.projectUrn;
    const currentSlateUrn = config.tcmslatemanifest ? config.tcmslatemanifest : config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
    const currentProjectEntityUrn = config.projectEntityUrn;
    const slateEntityUrn = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN;
    const QUERY_URL = `?dURN=${currentProjectUrn}&sURN=${currentSlateUrn}&slateEntityURN=${slateEntityUrn}&slateTitle=${currentSlateTitle}&entityURN=${currentProjectEntityUrn}`;
    const CURRENT_ELEMENT_QUERY = elementId ? `&eURN=${elementId}` : "";
    window.open(config.TCM_DASHBOARD_UI_URL + QUERY_URL + CURRENT_ELEMENT_QUERY, 'tcmwin');
  }
}
