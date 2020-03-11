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

  export const permissions = [
      "login", "logout", "bookshelf_access", "generate_epub_output", "demand_on_print", "toggle_tcm", "content_preview", "add_instructor_resource_url", "grid_crud_access", "alfresco_crud_access", "set_favorite_project", "sort_projects",
      "search_projects", "project_edit", "edit_project_title_author", "promote_review", "promote_live", "create_new_version", "project_add_delete_users", "create_custom_user", "toc_add_pages", "toc_delete_entry", "toc_rearrange_entry", "toc_edit_title", "elements_add_remove", "split_slate", "full_project_slate_preview", "access_formatting_bar",
      "authoring_mathml", "slate_traversal", "trackchanges_edit", "trackchanges_approve_reject", "tcm_feedback", "notes_access_manager", "quad_create_edit_ia", "quad_linking_assessment", "add_multimedia_via_alfresco", "toggle_element_page_no", "toggle_element_borders", "global_search", "global_replace", "edit_print_page_no", "notes_adding", "notes_deleting", "notes_delete_others_comment", "note_viewer", "notes_assigning", "notes_resolving_closing", "notes_relpying",
  ]

  