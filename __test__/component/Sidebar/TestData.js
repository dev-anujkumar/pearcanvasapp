export default {
	testcase1: {
		initState: {
			appStore: {
				parentUrn: {
					manifestUrn: "urn:pearson:manifest:bc9d51e0-f0df-4127-b09e-9d5e4f75cc36",
					contentUrn: "urn:pearson:entity:5d6c4a51-2587-4250-8423-061b67aebe5e",
					elementType: "group"
				},
			}
		},
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[
						{
						"id":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
						"type":"groupedcontent",
						"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
						"width":"wider",
						"groupproportions":"60-40",
						"versionUrn":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
						"contentUrn":"urn:pearson:entity:22bcf469-c819-4cc1-9279-a78d0e710b6b",
						"groupeddata":{
							"bodymatter":[
								{
									"id":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
									"type":"group",
									"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
									"versionUrn":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
									"contentUrn":"urn:pearson:entity:e744f7b5-ddcb-4a03-980c-41ebfae49d23",
									"groupdata":{
									"bodymatter":[
										{
											"id":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
											"type":"element-authoredtext",
											"schema":"http://schemas.pearson.com/wip-authoring/element/1",
											"elementdata":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
											},
											"html":{
												"text":"<p class=\"paragraphNumeroUno\"><br></p>",
												"footnotes":{
												
												},
												"assetsPopover":{
												
												},
												"glossaryentries":{
												
												}
											},
											"versionUrn":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
											"contentUrn":"urn:pearson:entity:f0266083-3328-47eb-9d1d-33be5948c647"
										}
									]
									},
									"status":"wip"
								},
								{
									"id":"urn:pearson:manifest:50a3417d-8fb5-41a6-8ddd-02235b93959b",
									"type":"group",
									"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
									"versionUrn":"urn:pearson:manifest:50a3417d-8fb5-41a6-8ddd-02235b93959b",
									"contentUrn":"urn:pearson:entity:d19c1375-4955-42b8-8d23-05037b10b02f",
									"groupdata":{
									"bodymatter":[
										{
											"id":"urn:pearson:work:dbddfcc2-2126-4a28-946f-519aa00628ef",
											"type":"element-authoredtext",
											"schema":"http://schemas.pearson.com/wip-authoring/element/1",
											"elementdata":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
											},
											"html":{
												"text":"<p class=\"paragraphNumeroUno\"><br></p>",
												"footnotes":{
												
												},
												"assetsPopover":{
												
												},
												"glossaryentries":{
												
												}
											},
											"versionUrn":"urn:pearson:work:dbddfcc2-2126-4a28-946f-519aa00628ef",
											"contentUrn":"urn:pearson:entity:031a962b-8921-405a-95f2-371017ed72c3"
										}
									]
									},
									"status":"wip"
								}
							]
						},
						"status":"wip"
						}
					],
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: {},
		activeElement: { index: "0-0-0" },
		fromToolbar: {},
		showHideObj: undefined
	},
	testcase2: {
		initState: {
			appStore: {
				asideData: {
					manifestUrn: "urn:pearson:manifest:bc9d51e0-f0df-4127-b09e-9d5e4f75cc36",
					contentUrn: "urn:pearson:entity:5d6c4a51-2587-4250-8423-061b67aebe5e",
					parent: { type: "groupedcontent" }
				},
			}
		},
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[
						{
						"id":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
						"type":"groupedcontent",
						"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
						"width":"wider",
						"groupproportions":"60-40",
						"versionUrn":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
						"contentUrn":"urn:pearson:entity:22bcf469-c819-4cc1-9279-a78d0e710b6b",
						"groupeddata":{
							"bodymatter":[
								{
									"id":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
									"type":"group",
									"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
									"versionUrn":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
									"contentUrn":"urn:pearson:entity:e744f7b5-ddcb-4a03-980c-41ebfae49d23",
									"groupdata":{
									"bodymatter":[
										{
											"id":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
											"type":"element-aside",
											"subtype":"workedexample",
											"schema":"http://schemas.pearson.com/wip-authoring/element/1",
											"designtype":"workedexample1",
											"elementdata":{
												"bodymatter":[
												{
													"id":"urn:pearson:work:d1d7ee52-d4d2-4d0c-817a-8c379e954682",
													"type":"element-authoredtext",
													"schema":"http://schemas.pearson.com/wip-authoring/element/1",
													"elementdata":{
														"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
														"text":"",
														"headers":[
															{
															"level":4
															}
														]
													},
													"html":{
														"text":"<h4 class=\"heading4NummerEins\"><br></h4>",
														"footnotes":{
															
														},
														"assetsPopover":{
															
														},
														"glossaryentries":{
															
														}
													},
													"versionUrn":"urn:pearson:work:d1d7ee52-d4d2-4d0c-817a-8c379e954682",
													"contentUrn":"urn:pearson:entity:f7dc643c-0d5c-4189-b18c-b82c3212b681"
												},
												{
													"id":"urn:pearson:manifest:50ceb822-1c1f-43a5-b72a-75ad7fdd6dbb",
													"type":"showhide",
													"schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
													"versionUrn":"urn:pearson:manifest:50ceb822-1c1f-43a5-b72a-75ad7fdd6dbb",
													"contentUrn":"urn:pearson:entity:b24ec0cf-d23d-4cc1-bd01-80f77bb23331",
													"status":"wip",
													"interactivedata":{
														"postertextobject":[
															{
															"id":"urn:pearson:work:8550fa5b-39ce-4cda-95a6-0ac189093807",
															"type":"element-authoredtext",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":"Reveal Answer:"
															},
															"html":{
																"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:8550fa5b-39ce-4cda-95a6-0ac189093807",
															"contentUrn":"urn:pearson:entity:534ae267-107f-4a0d-8a9b-08528e0f4763"
															}
														],
														"show":[
															{
															"id":"urn:pearson:work:4d80aa82-7b37-4d25-882d-418a0e86a160",
															"type":"element-dialogue",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"startNumber":"13",
																"numberedlines":true,
																"acttitle":{
																	"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																	"text":"qweqw"
																},
																"scenetitle":{
																	"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																	"text":"e"
																},
																"dialoguecontents":[
																	{
																		"type":"stagedirection",
																		"stagedirection":{
																		"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																		"text":"1"
																		}
																	},
																	{
																		"type":"lines",
																		"speaker":{
																		"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																		"text":"2"
																		},
																		"lines":[
																		{
																			"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																			"text":"3"
																		}
																		]
																	}
																]
															},
															"credits":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":"4"
															},
															"html":{
																"actTitle":"<p>qweqw</p>",
																"sceneTitle":"<p>e</p>",
																"dialogueContent":[
																	{
																		"type":"stagedirection",
																		"text":"<p>1</p>"
																	},
																	{
																		"type":"lines",
																		"characterName":"<p>2</p>",
																		"text":"<p><span class=\"dialogueLine\">3</span></p>"
																	}
																],
																"credits":"<p>4</p>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:4d80aa82-7b37-4d25-882d-418a0e86a160",
															"contentUrn":"urn:pearson:entity:c7996269-894a-41ee-b58b-fe0852e878dd"
															},
															{
															"id":"urn:pearson:work:28443f96-ff97-47bc-b78d-7c10d15772df",
															"type":"element-authoredtext",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":""
															},
															"html":{
																"text":"<p class=\"paragraphNumeroUno\"><br></p>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:28443f96-ff97-47bc-b78d-7c10d15772df",
															"contentUrn":"urn:pearson:entity:2d723fb4-7284-4544-9dc7-892d4ce8df4f"
															}
														],
														"hide":[
															{
															"id":"urn:pearson:work:2738bda1-c2f0-4c04-bca3-c6e582ae3f8d",
															"type":"element-authoredtext",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":""
															},
															"html":{
																"text":"<p class=\"paragraphNumeroUno\"><br></p>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:2738bda1-c2f0-4c04-bca3-c6e582ae3f8d",
															"contentUrn":"urn:pearson:entity:4df508e2-419e-445f-aa67-3a88d920ff07"
															}
														]
													}
												},
												{
													"id":"urn:pearson:manifest:9482b902-2fd2-4ec1-9aac-1715c3f37397",
													"type":"manifest",
													"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
													"versionUrn":"urn:pearson:manifest:9482b902-2fd2-4ec1-9aac-1715c3f37397",
													"contentUrn":"urn:pearson:entity:2a98027b-4d27-4d7c-bf47-5f7ad6718160",
													"contents":{
														"bodymatter":[
															{
															"id":"urn:pearson:work:a7587c73-f832-4816-a428-d9a3b8d4cd92",
															"type":"element-authoredtext",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":"",
																"headers":[
																	{
																		"level":5
																	}
																]
															},
															"html":{
																"text":"<h5 class=\"heading5NummerEins\"><br></h5>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:a7587c73-f832-4816-a428-d9a3b8d4cd92",
															"contentUrn":"urn:pearson:entity:7b35aa3d-c417-4e10-ab45-3007778dafa2"
															},
															{
															"id":"urn:pearson:work:a03a0c4d-3b60-4e75-8110-d485a945cc0c",
															"type":"element-authoredtext",
															"schema":"http://schemas.pearson.com/wip-authoring/element/1",
															"elementdata":{
																"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
																"text":""
															},
															"html":{
																"text":"<p class=\"paragraphNumeroUno\"><br></p>",
																"footnotes":{
																	
																},
																"assetsPopover":{
																	
																},
																"glossaryentries":{
																	
																}
															},
															"versionUrn":"urn:pearson:work:a03a0c4d-3b60-4e75-8110-d485a945cc0c",
															"contentUrn":"urn:pearson:entity:67aa3c51-a975-4fb5-8fe8-3d06b1ed1347"
															}
														],
														"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
													},
													"status":"wip"
												}
												],
												"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
											},
											"versionUrn":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
											"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
											"status":"wip"
										},
										{
											"id":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
											"type":"element-authoredtext",
											"schema":"http://schemas.pearson.com/wip-authoring/element/1",
											"elementdata":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
											},
											"html":{
												"text":"<p class=\"paragraphNumeroUno\"><br></p>",
												"footnotes":{
												
												},
												"assetsPopover":{
												
												},
												"glossaryentries":{
												
												}
											},
											"versionUrn":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
											"contentUrn":"urn:pearson:entity:f0266083-3328-47eb-9d1d-33be5948c647"
										}
									]
									},
									"status":"wip"
								},
								{
									"id":"urn:pearson:manifest:50a3417d-8fb5-41a6-8ddd-02235b93959b",
									"type":"group",
									"schema":"http://schemas.pearson.com/wip-authoring/groupedcontent/1",
									"versionUrn":"urn:pearson:manifest:50a3417d-8fb5-41a6-8ddd-02235b93959b",
									"contentUrn":"urn:pearson:entity:d19c1375-4955-42b8-8d23-05037b10b02f",
									"groupdata":{
									"bodymatter":[
										{
											"id":"urn:pearson:work:dbddfcc2-2126-4a28-946f-519aa00628ef",
											"type":"element-authoredtext",
											"schema":"http://schemas.pearson.com/wip-authoring/element/1",
											"elementdata":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
											},
											"html":{
												"text":"<p class=\"paragraphNumeroUno\"><br></p>",
												"footnotes":{
												
												},
												"assetsPopover":{
												
												},
												"glossaryentries":{
												
												}
											},
											"versionUrn":"urn:pearson:work:dbddfcc2-2126-4a28-946f-519aa00628ef",
											"contentUrn":"urn:pearson:entity:031a962b-8921-405a-95f2-371017ed72c3"
										}
									]
									},
									"status":"wip"
								}
							]
						},
						"status":"wip"
						}
					],
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: {},
		activeElement: { index: "0-0-0-0" },
		fromToolbar: {},
		showHideObj: undefined
	},
	testcase3: {
		initState: {
			appStore: {
				parentUrn: {},
			}
		},
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[],
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: {},
		activeElement: { index: "0" },
		fromToolbar: {},
		showHideObj: undefined
	},
	testcase4: {
		initState: {
			appStore: {
				parentUrn: {},
			}
		},
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[
						{ id: "urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f400" }
					],
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: { elementId: "urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f400"},
		activeElement: { index: "0" },
		fromToolbar: {},
		showHideObj: undefined
	},
	testcase5: {
		initState: {
			appStore: {
				asideData: {},
			}
		},
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[
						{
							"id":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
							"type":"element-aside",
							"subtype":"workedexample",
							"schema":"http://schemas.pearson.com/wip-authoring/element/1",
							"designtype":"workedexample1",
							"elementdata":{
								"bodymatter":[
								{
									"id":"urn:pearson:work:d1d7ee52-d4d2-4d0c-817a-8c379e954682",
									"type":"element-authoredtext",
									"schema":"http://schemas.pearson.com/wip-authoring/element/1",
									"elementdata":{
										"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
										"text":"",
										"headers":[
											{
											"level":4
											}
										]
									},
									"html":{
										"text":"<h4 class=\"heading4NummerEins\"><br></h4>",
										"footnotes":{
											
										},
										"assetsPopover":{
											
										},
										"glossaryentries":{
											
										}
									},
									"versionUrn":"urn:pearson:work:d1d7ee52-d4d2-4d0c-817a-8c379e954682",
									"contentUrn":"urn:pearson:entity:f7dc643c-0d5c-4189-b18c-b82c3212b681"
								}
								],
								"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
							},
							"versionUrn":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
							"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
							"status":"wip"
						},
					],
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: {},
		activeElement: { index: "0-0-0-0" },
		fromToolbar: {},
		showHideObj: undefined
	},
}



