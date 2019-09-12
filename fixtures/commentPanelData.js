export const comments = [{
    "commentType": "comment",
    "commentDateTime": "2019-08-25T04:29:55.633Z",
    "commentAssignee": "c5test01",
    "commentCreator": "c5test01",
    "commentString": "this is comment",
    "commentStatus": "OPEN",
    "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
    "replyComments": [{
      "commentCreator": "c5test01",
      "commentDateTime": "2019-08-25T04:56:38.241Z",
      "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
      "commentString": "zxczcczz",
      "commentType": "commentReply"
    }],
    "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
  },
  {
    "commentType": "comment",
    "commentDateTime": "2019-08-25T04:29:55.633Z",
    "commentAssignee": "c5test01",
    "commentCreator": "c5test01",
    "commentString": "paragraph",
    "commentStatus": "Resolved",
    "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
    "replyComments": [{
      "commentCreator": "c5test01",
      "commentDateTime": "2019-08-25T04:56:38.241Z",
      "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
      "commentString": "zxczcczz",
      "commentType": "commentReply"
    }],
    "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
  }
  ]
export const commentWithoutReply = [{
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "this is comment",
  "commentStatus": "OPEN",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
},
{
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "paragraph",
  "commentStatus": "Resolved",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
}
]
export const comment = {
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "this is comment",
  "commentStatus": "OPEN",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
}
export const commentWithReply = {
  "commentType": "comment",
  "commentDateTime": "2019-08-25T04:29:55.633Z",
  "commentAssignee": "c5test01",
  "commentCreator": "c5test01",
  "commentString": "this is comment",
  "commentStatus": "OPEN",
  "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
  "replyComments": [{
    "commentCreator": "c5test01",
    "commentDateTime": "2019-08-25T04:56:38.241Z",
    "commentOnEntity": "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5",
    "commentString": "zxczcczz",
    "commentType": "commentReply"
  }],
  "commentUrn": "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
}

  export const filters = {
    text: '',
    sortBy: {
        value: '-1',
        label: 'Newest to Oldest'
    },
    assignee: {
        value: 'all',
        label: 'All'
    },
    status: {
        value: 'all',
        label: 'All'
    }
  }
  
  export const users = [{
    "userId": "alf-cms-1",
    "email": "kashif.khan@pearson.com",
    "isMember": false,
    "isAdmin": false,
    "roleId": "default_user",
    "eTag": null
  }, {
    "userId": "alf04",
    "email": "alf04.mail@pearson.com",
    "isMember": false,
    "isAdmin": false,
    "roleId": "default_user",
    "eTag": null
  }, {
    "userId": "blueprint-editor",
    "email": "blueprint-editor@pearson.com",
    "isMember": false,
    "isAdmin": false,
    "roleId": "default_user",
    "eTag": null
  }]

  