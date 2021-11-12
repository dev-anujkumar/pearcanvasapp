import React, { useEffect } from 'react';
import BlockList from './BlockList.jsx';

const BlockListWrapper = (props) => {
    return (
        <BlockList indexTemp={props.indexTemp} manifestList={props.element.listdata.bodymatter} asideData={props?.asideData} {...props} />
    )
}

export default BlockListWrapper;
