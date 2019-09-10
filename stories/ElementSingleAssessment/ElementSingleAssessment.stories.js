import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import ElementSingleAssessment from './../../src/component/ElementSingleAssessment';

const mockData1={
    
        "id": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
        "type": "figure",
        "figuretype": "assessment",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
        "title": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "Open response question updated"
        },
        "subtitle": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [ ],
        "mathml": [ ],
        "footnotes": [ ]
        },
        "captions": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [ ],
        "mathml": [ ],
        "footnotes": [ ]
        },
        "credits": {
        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
        "text": "",
        "textsemantics": [ ],
        "mathml": [ ],
        "footnotes": [ ]
        },
        "figuredata": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
        "subtype": "assessment",
        "elementdata": {
        "assessmentid": "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
        "assessmentitemid": "urn:pearson:work:fb9bcb66-3073-45e6-ab8a-b595a35bf93b",
        "assessmentitemtype": "assessmentItem",
        "assessmentformat": "cite",
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "posterimage": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
        },
        "usagetype": "Diagnostic"
        }
        },
        
        "versionUrn": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
        "contentUrn": "urn:pearson:entity:0f7c431f-e6c9-4574-bfe0-7d4ac25c1032"
        
}
const mockData2={
    
    "id": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "type": "figure",
    "figuretype": "assessment",
    "subtype": "",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "title": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "Open response question updated"
    },
    "subtitle": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "captions": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "credits": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "figuredata": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
        "subtype": "assessment",
        "elementdata": {
        "assessmentitemtype": "tdxAssessmentItem",
        "assessmentformat": "tdx",
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "posterimage": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
        },
        "usagetype": "Quiz"
        }
        },
    
    
    "versionUrn": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "contentUrn": "urn:pearson:entity:0f7c431f-e6c9-4574-bfe0-7d4ac25c1032"
    
}
const mockData3={
    
    "id": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "type": "figure",
    "figuretype": "assessment",
    "subtype": "",
    "schema": "http://schemas.pearson.com/wip-authoring/figure/1",
    "title": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": ""
    },
    "subtitle": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "captions": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "credits": {
    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
    "text": "",
    "textsemantics": [ ],
    "mathml": [ ],
    "footnotes": [ ]
    },
    "figuredata": {
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-assessment",
        "subtype": "assessment",
        "elementdata": {
        "assessmentitemtype": "assessmentItem",
        "assessmentformat": "cite",
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "posterimage": {
        "path": "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
        },
        "usagetype": "Quiz"
        }
        },
    
    "versionUrn": "urn:pearson:work:47926695-265e-469e-bfc3-2c942d2c1824",
    "contentUrn": "urn:pearson:entity:0f7c431f-e6c9-4574-bfe0-7d4ac25c1032"
    
}

storiesOf('Components|ElementSingleAssessment', module)

    .addDecorator(withInfo)
    .add('default Asessment1', () => <ElementSingleAssessment model={mockData1} index="1" /> )
    .add('default Asessment2', () => <div style={{width:"500px", position:"relative", left:"100px"}}> <ElementSingleAssessment model={mockData2} index="2" /> </div>)
    .add('default Asessment cite 3', () => <div style={{width:"500px", position:"relative", left:"100px"}}> <ElementSingleAssessment model={mockData3} index="3" /> </div>)
  