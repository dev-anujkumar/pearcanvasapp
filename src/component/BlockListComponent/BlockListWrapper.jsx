import React from 'react';
import BlockList from './BlockList.jsx';

const BlockListWrapper = (props) => {
    return (
        <BlockList indexTemp={props.indexTemp} manifestList={props.element.listdata.bodymatter} {...props} />
    )
}

export default BlockListWrapper;
