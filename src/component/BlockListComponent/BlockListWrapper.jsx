import React from 'react';
import BlockList from './BlockList.jsx';

const BlockListWrapper = (props) => {
    return (
        <BlockList isBlockList={props.isBlockList} indexTemp={props.indexTemp} manifestList={props.element.listdata.bodymatter} asideData={props?.asideData} grandParentManifestList={props?.grandParentManifestList} parentManifestListItem={props?.parentManifestListItem} pasteElement={props?.pasteElement} {...props} />
    )
}

export default BlockListWrapper;
