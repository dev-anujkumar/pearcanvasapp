const elementData = {
	"elementType":"figure",
	"primaryOption":"primary-blockcode-equation",
	"secondaryOption":"secondary-blockcode-language-default"
}
const activeElement = { 
	"elementType":"figure",
	"primaryOption":"primary-blockcode-equation",
	"secondaryOption":"secondary-blockcode-language-default",
}

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
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		elementData: {...elementData},
		activeElement: { index: "0-0-0",...activeElement },
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
		elementData: {...elementData},
		activeElement: { index: "0-0-0-0",...activeElement },
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
		elementData: {...elementData},
		activeElement: { index: "0",...activeElement },
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
		elementData: { elementId: "urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f400",...elementData},
		activeElement: { index: "0",...activeElement },
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
		elementData: {...elementData},
		activeElement: { index: "0-0-0-0",...activeElement },
		fromToolbar: {},
		showHideObj: undefined
	},
	testcase6: {
		initState: {
			appStore: {
				activeElement: { id: "urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d90" },
			}
		},
		store: {},
		attribute: "type",
		value: 'Showhide'
	},
	testcase7: {
		oldElementData: {
			"id":"urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4",
			"type":"figure",
			"figuretype":"assessment",
			"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
			"title":{
				"text":"text"
			},
			"figuredata":{
				id:"urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a4dsd",
				"type":"element-assessment",
				"elementdata":{
					posterimage:"posterimage"
				}
			},
			"html":{
				"title":"<p></p>"
			},
			"versionUrn":"urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4",
			"contentUrn":"urn:pearson:entity:293e9be5-9eb2-481b-b1fa-1e20d4284555",
			"status":"wip",
			"index":"0",
			"inputType":"SINGLE_ASSESSMENT",
			"inputSubType":"SINGLE_ASSESSMENT_CITE",
			"slateVersionUrn":"urn:pearson:manifest:4b84d144-cf62-46b6-852f-90021aad81f7",
			"elementParentEntityUrn":"urn:pearson:entity:262c355e-15f1-441c-9e89-f21eff3f5699",
			"projectUrn":"urn:pearson:distributable:5966ada2-0e9e-4113-b2dc-9a88fe1706dd",
			"elementdata":{
				"text":null
			},
			"tcm":false
		},
        newElementData: {"elementId":"urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4","elementType":"element-assessment","primaryOption":"primary-single-assessment","secondaryOption":"secondary-single-assessment-puf","labelText":"Qu","toolbar":["insertMedia","bold","italic","underline","strikethrough","clearformatting","increaseindent","decreaseindent","footnote","glossary","orderedlist","unorderedlist","mathml","chemml","inlinecode","superscript","subscript","specialcharactor","undo","redo","crossLinkingIcon","assetpopover","slatetag","alignment","calloutIcon"]},
        oldElementInfo: {"elementType":"element-assessment","primaryOption":"primary-single-assessment","secondaryOption":"secondary-single-assessment-cite","usageType":"Diagnostic","elementId":"urn:pearson:work:fd5d9748-6928-43ed-85b7-48c1a4a42bb4","index":0,"elementWipType":"figure","toolbar":["insertMedia","bold","italic","underline","strikethrough","clearformatting","increaseindent","decreaseindent","footnote","glossary","orderedlist","unorderedlist","mathml","chemml","inlinecode","superscript","subscript","specialcharactor","undo","redo","crossLinkingIcon","assetpopover","slatetag","alignment","calloutIcon"],"tag":"Qu"}
	},
	testcase8: {
		oldElementData: {
            "id":"urn:pearson:work:1d3f6612-66e2-46bb-a748-f836353ecedc",
            "type":"figure",
            "figuretype":"table",
            "subtype":"image50TextTableImage",
            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
            "alignment":"half-text",
            "figuredata":{
                "schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid":"",
                "path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height":"422",
                "width":"680",
                "podwidth":"",
                "srctype":"src",
                "interactivetype":"elm",
                "postertext": {"text":"hello world"}
            },
            "html":{
                "title":"<p><br></p>",
                "text":"",
                "postertext":"",
                "captions":"<p><br></p>",
                "credits":"<p><br></p>",
                "footnotes":{},
                "assetsPopover":{},
                "glossaryentries":{}
            },
            "versionUrn":"urn:pearson:work:1d3f6612-66e2-46bb-a748-f836353ecedc",
            "contentUrn":"urn:pearson:entity:73489985-c5d4-4757-8e4f-3a7cccf15a22"
        },
        newElementData: {
            "elementId":"urn:pearson:work:1d3f6612-66e2-46bb-a748-f836353ecedc",
            "elementType":"figure",
            "primaryOption":"primary-image-figure",
            "secondaryOption":"secondary-image-figure-width",
            "labelText":"Fg",
            "toolbar":[
                "insertMedia",
                "formatSelector"
            ]
        },
        oldElementInfo: {
        "elementType":"figure",
        "primaryOption":"primary-image-table",
        "altText":"",
        "longDesc":"",
        "podwidth":"",
        "secondaryOption":"secondary-image-table-half",
        "elementId":"urn:pearson:work:1d3f6612-66e2-46bb-a748-f836353ecedc",
        "index":0,
        "elementWipType":"figure",
        "toolbar":[
            "insertMedia",
            "formatSelector",
            "crossLinkingIcon"
        ],
        "tag":"TB"
        }
	},
	testcase9: {
		oldElementData: {
            "id":"urn:pearson:work:312c6572-701b-4c28-bdbf-9befc939a0f2",
            "type":"figure",
            "figuretype":"codelisting",
            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
            "figuredata":{
                "schema":"http://schemas.pearson.com/wip-authoring/preformatted/1#/definitions/preformatted",
                "type":"codelistingformatted",
                "numbered":true,
                "startNumber":"1",
                "preformattedtext":[],
                "syntaxhighlighting":true,
                "programlanguage":"Select"
            },
            "html":{
                "title":"<p><br></p>",
                "preformattedtext":"<p></p>",
                "captions":"<p><br></p>",
                "credits":"<p><br></p>"
            },
            "versionUrn":"urn:pearson:work:312c6572-701b-4c28-bdbf-9befc939a0f2",
            "contentUrn":"urn:pearson:entity:bc8cbe82-7e32-4c6b-8ccd-c90d5a63d2bc",
            "status":"wip"
        },
        newElementData: {
            "elementId":"urn:pearson:work:312c6572-701b-4c28-bdbf-9befc939a0f2",
            "elementType":"figure",
            "primaryOption":"primary-blockcode-equation",
            "secondaryOption":"secondary-blockcode-language-default",
            "labelText":"BCE",
            "toolbar":[
                "insertMedia",
                "formatSelector",
                "crossLinkingIcon"
            ]                   
        },
        oldElementInfo: {
            "elementType":"figure",
            "primaryOption":"primary-blockcode-equation",
            "numbered":true,
            "startNumber":"1",
            "syntaxhighlighting":true,
            "secondaryOption":"secondary-blockcode-language-default",
            "elementId":"urn:pearson:work:312c6572-701b-4c28-bdbf-9befc939a0f2",
            "index":0,
            "elementWipType":"figure",
            "toolbar":[
                "insertMedia",
                "formatSelector",
                "crossLinkingIcon"
            ],
            "tag":"BCE"
        },
		store: {
			"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d":{
				"id":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"type":"manifest",
				"versionUrn":"urn:pearson:manifest:0897e38f-801b-4fbb-8423-7d16fd167d4d",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405",
				"contents":{
					"bodymatter":[
						{
							"id":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
							"type":"element-authoredtext",
							"elementdata":{
								"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
								"text":""
							},
							"html":{
								"text":"<p class=\"paragraphNumeroUno\"><br></p>",
							},
							"versionUrn":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
							"contentUrn":"urn:pearson:entity:f0266083-3328-47eb-9d1d-33be5948c647"
						}
					],
				},
				"status":"approved",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		}
	},
	testcase10: {
		oldElementData: {
            "id":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "type":"element-blockfeature",
            "subtype":"quote",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata":{
                "schema":"http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
                "type":"blockquote"
            },
            "html":{
                "text":"<blockquote class=\"blockquoteMarginalia\"><p class=\"paragraphNummerEins\"><br></p><p class=\"blockquoteTextCredit\" contenteditable=\"true\" data-placeholder=\"Attribution Text\"></p></blockquote>",
                "footnotes":{},
                "assetsPopover":{},
                "glossaryentries":{}
            },
            "versionUrn":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "contentUrn":"urn:pearson:entity:add7ac55-e30f-486f-b5da-2af5955e7a55"
        },
        newElementData: {
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "elementType":"element-authoredtext",
            "primaryOption":"primary-paragraph",
            "secondaryOption":"secondary-paragraph",
            "labelText":"P",
            "toolbar":[
                "insertMedia"
            ]
        },
        oldElementInfo: {
            "elementType":"element-authoredtext",
            "primaryOption":"primary-blockquote",
            "secondaryOption":"secondary-marginalia",
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "index":0,
            "elementWipType":"element-blockfeature",
            "toolbar":[
                "insertMedia",
                "bold",
                "underline"
            ],
            "tag":"BQ"
        }
	},
	testcase11: {
		oldElementData: {
            "id":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "type":"element-authoredtext",
            "subtype":"quote",
            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata":{
                "schema":"http://schemas.pearson.com/wip-authoring/blockfeature/1#/definitions/blockfeature",
                "type":"list",
                "authoredtext":{
                    "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text":""
                },
                startNumber:"2"
            },
            "html":{
                "text":"<blockquote class=\"blockquoteMarginalia\"><p class=\"paragraphNummerEins\"><br></p><p class=\"blockquoteTextCredit\" contenteditable=\"true\" data-placeholder=\"Attribution Text\"></p></blockquote>",
                "footnotes":{},
                "assetsPopover":{},
                "glossaryentries":{}
            },
            "versionUrn":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "contentUrn":"urn:pearson:entity:add7ac55-e30f-486f-b5da-2af5955e7a55"
        },
        newElementData: {
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "elementType":"element-authoredtext",
            "primaryOption":"primary-list",
            "secondaryOption":"secondary-list-2",
            "labelText":"P",
            "toolbar":[
                "insertMedia"
            ]
        },
        oldElementInfo: {
            "elementType":"element-authoredtext",
            "primaryOption":"primary-list",
            "secondaryOption":"secondary-list-2",
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "index":0,
            "elementWipType":"element-blockfeature",
            "toolbar":[
                "insertMedia",
                "bold",
                "underline"
            ],
            "tag":"BQ"
        }
	},
	testcase12: {
		oldElementData: {
            "id":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "type":"element-authoredtext",
            "subtype":"secondary-paragraph",
            "elementdata":{
                "type":"list",
                startNumber:"2"
            },
            "versionUrn":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "contentUrn":"urn:pearson:entity:add7ac55-e30f-486f-b5da-2af5955e7a55"
        },
        newElementData: {
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "elementType":"element-authoredtext",
            "primaryOption":"primary-paragraph",
            "secondaryOption":"secondary-paragraph",
            "labelText":"P",
            "toolbar":[
                "insertMedia"
            ]
        },
        oldElementInfo: {
            "elementType":"element-authoredtext",
            "primaryOption":"primary-list",
            "secondaryOption":"secondary-list-2",
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "index":0,
            "elementWipType":"element-blockfeature",
            "toolbar":[
                "insertMedia",
                "bold",
                "underline",
                "strikethrough",
                "orderedlist",
                "unorderedlist",
                "glossary",
                "slatetag",
                "alignment"
            ],
            "tag":"BQ"
        }
	},
	testcase13: {
		oldElementData: {
            "id":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "type":"element-authoredtext",
            "subtype":"quote",
            "versionUrn":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "contentUrn":"urn:pearson:entity:add7ac55-e30f-486f-b5da-2af5955e7a55"
        },
        newElementData: {
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "elementType":"element-authoredtext",
            "primaryOption":"primary-list",
            "secondaryOption":"secondary-list-2",
            "labelText":"P",
            "toolbar":[
                "insertMedia"
            ]
        },
        oldElementInfo: {
            "elementType":"element-authoredtext",
            "primaryOption":"primary-list",
            "secondaryOption":"secondary-list-2",
            "elementId":"urn:pearson:work:6e2b4d66-4fd7-4d7e-a7d6-1b3b2b4a775b",
            "index":0,
            "elementWipType":"element-blockfeature",
            "toolbar":[
                "insertMedia",
                "bold",
                "underline",
                "strikethrough",
                "orderedlist",
                "unorderedlist",
                "glossary",
                "slatetag",
                "alignment"
            ],
            "tag":"BQ"
        }
	},
	testcase14: {
		elementConversionData: {
			
			"currentSlateData":{
				"status":"wip",
				"contentUrn":"urn:pearson:entity:e719e981-17af-48b6-b94c-c5cac5a3f405"
			},
			"oldElementData":{
				"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
				"type":"figure",
				"figuretype":"image",
				"subtype":"imageTextWidth",
				"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
				"titlecontentintitlefield":true,
				"alignment":"text-width",
				"figuredata":{
					"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
					"imageid":"",
					"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
					"height":"422",
					"width":"680",
					"podwidth":""
				},
				"html":{
					"title":"<p><br></p>",
					"text":"",
					"postertext":"",
					"captions":"<p><br></p>",
					"credits":"<p><br></p>"
				},
				"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
				"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
				"status":"wip"
			},
			"response":{
				"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
				"type":"figure",
				"figuretype":"table1",
				"subtype":"image50TextTableImage",
				"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
				"titlecontentintitlefield":true,
				"alignment":"half-text",
				"figuredata":{
					"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
					"imageid":"",
					"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
					"height":"422",
					"width":"680"
				},
				"html":{
					"title":"<p><br></p>",
					"text":"",
					"postertext":"",
					"captions":"<p><br></p>",
					"credits":"<p><br></p>"
				},
				"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
				"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a"
			}
			
		},
		indexes: ["0", "0", "1", "1", "0", "0"],
		appStore: {
			"slateLevelData":{
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
							"groupproportions":"50-50",
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
												"footnotes":{},
												"assetsPopover":{},
												"glossaryentries":{}
												},
												"versionUrn":"urn:pearson:work:1789717a-b9ab-4de3-bdb6-adde013aefcd",
												"contentUrn":"urn:pearson:entity:f0266083-3328-47eb-9d1d-33be5948c647"
											},
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
																"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
																"type":"figure",
																"figuretype":"image",
																"subtype":"imageTextWidth",
																"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
																"titlecontentintitlefield":true,
																"alignment":"text-width",
																
																"figuredata":{
																	"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
																	"imageid":"",
																	"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
																	"height":"422",
																	"width":"680",
																	"podwidth":""
																},
																"html":{
																	"title":"<p><br></p>",
																	"text":"",
																	"postertext":"",
																	"captions":"<p><br></p>",
																	"credits":"<p><br></p>"
																},
																"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
																"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
																"status":"wip"
															},
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
			"parentUrn":{
				"contentUrn":"urn:pearson:entity:b24ec0cf-d23d-4cc1-bd01-80f77bb23331",
				"elementType":"showhide",
				"manifestUrn":"urn:pearson:manifest:50ceb822-1c1f-43a5-b72a-75ad7fdd6dbb"
			},
			"asideData":{
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
						"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
						"type":"figure",
						"figuretype":"image",
						"subtype":"imageTextWidth",
						"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
						"titlecontentintitlefield":true,
						"alignment":"text-width",
						
						"figuredata":{
							"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
							"imageid":"",
							"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
							"height":"422",
							"width":"680",
							"podwidth":""
						},
						"html":{
							"title":"<p><br></p>",
							"text":"",
							"postertext":"",
							"captions":"<p><br></p>",
							"credits":"<p><br></p>"
						},
						"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
						"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
						"status":"wip"
						},
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
				},
				"grandParent":{
					"asideData":{
						"type":"element-aside",
						"subtype":"workedexample",
						"id":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
						"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
						"element":{
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
											"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
											"type":"figure",
											"figuretype":"image",
											"subtype":"imageTextWidth",
											"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
											"titlecontentintitlefield":true,
											"alignment":"text-width",
											
											"figuredata":{
												"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
												"imageid":"",
												"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
												"height":"422",
												"width":"680",
												"podwidth":""
											},
											"html":{
												"title":"<p><br></p>",
												"text":"",
												"postertext":"",
												"captions":"<p><br></p>",
												"credits":"<p><br></p>"
											},
											"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
											"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
											"status":"wip"
										},
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
						"index":"0-0-1",
						"parent":{
						"id":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
						"type":"groupedcontent",
						"columnId":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
						"columnName":"C1",
						"multiColumnType":"2C",
						"parentContentUrn":"urn:pearson:entity:22bcf469-c819-4cc1-9279-a78d0e710b6b",
						"columnContentUrn":"urn:pearson:entity:e744f7b5-ddcb-4a03-980c-41ebfae49d23"
						}
					},
					"parentUrn":{
						"manifestUrn":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
						"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
						"elementType":"element-aside"
					}
				}
			},
			"showHideObj":{
				"currentElement":{
					"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
					"type":"figure",
					"figuretype":"image",
					"subtype":"imageTextWidth",
					"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
					"titlecontentintitlefield":true,
					"alignment":"text-width",
					
					"figuredata":{
						"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
						"imageid":"",
						"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
						"height":"422",
						"width":"680",
						"podwidth":""
					},
					"html":{
						"title":"<p><br></p>",
						"text":"",
						"postertext":"",
						"captions":"<p><br></p>",
						"credits":"<p><br></p>"
					},
					"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
					"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
					"status":"wip"
				},
				"index":"0-0-1-1-0-0",
				"element":{
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
							"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
							"type":"figure",
							"figuretype":"image",
							"subtype":"imageTextWidth",
							"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
							"titlecontentintitlefield":true,
							"alignment":"text-width",
							
							"figuredata":{
								"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
								"imageid":"",
								"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
								"height":"422",
								"width":"680",
								"podwidth":""
							},
							"html":{
								"title":"<p><br></p>",
								"text":"",
								"postertext":"",
								"captions":"<p><br></p>",
								"credits":"<p><br></p>"
							},
							"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
							"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
							"status":"wip"
						},
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
					},
					"grandParent":{
						"asideData":{
						"type":"element-aside",
						"subtype":"workedexample",
						"id":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
						"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
						"element":{
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
												"id":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
												"type":"figure",
												"figuretype":"image",
												"subtype":"imageTextWidth",
												"schema":"http://schemas.pearson.com/wip-authoring/figure/1",
												"titlecontentintitlefield":true,
												"alignment":"text-width",
												"title":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
												},
												"captions":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
												},
												"credits":{
												"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
												"text":""
												},
												"figuredata":{
												"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
												"imageid":"",
												"path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
												"height":"422",
												"width":"680",
												"podwidth":""
												},
												"html":{
												"title":"<p><br></p>",
												"text":"",
												"postertext":"",
												"captions":"<p><br></p>",
												"credits":"<p><br></p>"
												},
												"versionUrn":"urn:pearson:work:af7a74c6-ac7b-45f8-9798-eef0373aa390",
												"contentUrn":"urn:pearson:entity:b201b111-6f72-4dcb-9b63-1c621feb2a5a",
												"status":"wip"
											},
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
						"index":"0-0-1",
						"parent":{
							"id":"urn:pearson:manifest:b98d8b6a-c75c-490a-8dde-2f22987e0f76",
							"type":"groupedcontent",
							"columnId":"urn:pearson:manifest:d2237608-c66c-4472-98b1-221ffea47afa",
							"columnName":"C1",
							"multiColumnType":"2C",
							"parentContentUrn":"urn:pearson:entity:22bcf469-c819-4cc1-9279-a78d0e710b6b",
							"columnContentUrn":"urn:pearson:entity:e744f7b5-ddcb-4a03-980c-41ebfae49d23"
						}
						},
						"parentUrn":{
						"manifestUrn":"urn:pearson:manifest:79b788c1-3135-4443-8369-e418b9d2392f",
						"contentUrn":"urn:pearson:entity:553c84bd-0994-430e-9eb8-2ff31dc606cc",
						"elementType":"element-aside"
						}
					}
				},
				"showHideType":"show"
			}
		},
	},
	testcase15: {
		oldElementData: {
			"id":"urn:pearson:manifest:88c63d61-753f-4f9d-947a-1ac6edd77934",
			"type":"element-aside",
			"subtype":"workedexample",
			"designtype":"workedexample1",
			"elementdata":{
				"bodymatter":[
					{
						"id":"urn:pearson:work:357ed147-c460-4838-8638-7e12d509aeba",
						"type":"element-authoredtext",
						"elementdata":{
						"text":"",
						"headers":[
							{
								"level":4
							}
						]
						},
						"html":{
							"text":"<h4 class=\"heading4NummerEins\"><br></h4>",
						},
						"versionUrn":"urn:pearson:work:357ed147-c460-4838-8638-7e12d509aeba",
						"contentUrn":"urn:pearson:entity:0a9dfa7c-4a4b-420c-933c-16554a639444"
					},
					{
						"id":"urn:pearson:manifest:eb26a09b-feae-492a-8d83-818c0c7d31b8",
						"type":"manifest",
						"versionUrn":"urn:pearson:manifest:eb26a09b-feae-492a-8d83-818c0c7d31b8",
						"contentUrn":"urn:pearson:entity:457dbec1-ab94-4310-abea-e1b3fa5e84f9",
						"contents":{
						"bodymatter":[
							{
								"id":"urn:pearson:work:b8a238ef-0d4c-4f74-bcbb-213f7469d0d0",
								"type":"element-authoredtext",
								"elementdata":{
									"text":"",
									"headers":[
									{
										"level":5
									}
									]
								},
								"html":{
									"text":"<h5 class=\"heading5NummerEins\"><br></h5>",
								},
								"versionUrn":"urn:pearson:work:b8a238ef-0d4c-4f74-bcbb-213f7469d0d0",
								"contentUrn":"urn:pearson:entity:495fc553-35de-453a-b21d-00932379b763"
							},
							{
								"id":"urn:pearson:work:641d649c-c7b0-4a8f-a571-d455fc94264e",
								"type":"element-authoredtext",
								"elementdata":{
									"text":""
								},
								"html":{
									"text":"<p class=\"paragraphNumeroUno\"><br></p>",
								},
								"versionUrn":"urn:pearson:work:641d649c-c7b0-4a8f-a571-d455fc94264e",
								"contentUrn":"urn:pearson:entity:0372cd59-0e9d-49c0-b07c-9a7396a927bf"
							}
						],
						},
						"status":"wip"
					}
				],
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
			},
			"versionUrn":"urn:pearson:manifest:88c63d61-753f-4f9d-947a-1ac6edd77934",
			"contentUrn":"urn:pearson:entity:fe76d7ff-7878-41cb-bb62-a7937831d74c",
			"status":"wip"
		},
		newElementData: {
			"elementId":"urn:pearson:manifest:88c63d61-753f-4f9d-947a-1ac6edd77934",
			"elementType":"element-workedexample",
			"primaryOption":"primary-workedexample-we2",
			"secondaryOption":"secondary-workedexample-we2",
			"labelText":"WE",
			"toolbar":[
					"insertMedia"
				]
		},
		oldElementInfo: {
			"elementType":"element-workedexample",
			"primaryOption":"primary-workedexample-we1",
			"secondaryOption":"secondary-workedexample-we1",
			"elementId":"urn:pearson:manifest:88c63d61-753f-4f9d-947a-1ac6edd77934",
			"index":0,
			"elementWipType":"element-aside",
			"toolbar":[
				"insertMedia"
			],
			"tag":"WE"
		}
	},
	testcase16: {
		oldElementData: {
			"id":"urn:pearson:manifest:af90f8aa-8e6a-45cf-9692-0fae06ef4548",
			"type":"element-aside",
			"subtype":"sidebar",
			"designtype":"asideSidebar01",
			"elementdata":{
				"bodymatter":[
					{
						"id":"urn:pearson:work:8f6846fd-75bf-4bed-8dc5-1f18dfe1bdef",
						"type":"element-authoredtext",
						"elementdata":{
						"text":""
						},
						"html":{
						"text":"<p class=\"paragraphNumeroUno\"><br></p>" },
						"versionUrn":"urn:pearson:work:8f6846fd-75bf-4bed-8dc5-1f18dfe1bdef",
						"contentUrn":"urn:pearson:entity:1df5c575-2e2e-4953-8360-a52241133543"
					}
				]
			},
			"versionUrn":"urn:pearson:manifest:af90f8aa-8e6a-45cf-9692-0fae06ef4548",
			"contentUrn":"urn:pearson:entity:7c38e83c-c03a-4e07-9c94-f46bfcf6845b",
			"status":"approved"
		},
		newElementData: {
			"elementId":"urn:pearson:manifest:af90f8aa-8e6a-45cf-9692-0fae06ef4548",
			"elementType":"element-aside",
			"primaryOption":"primary-aside-aside",
			"secondaryOption":"secondary-aside-sb2",
			"labelText":"As",
			"toolbar":[
				"insertMedia"
			]
		},
		oldElementInfo: {
			"elementType":"element-aside",
			"primaryOption":"primary-aside-aside",
			"secondaryOption":"secondary-aside-sb1",
			"elementId":"urn:pearson:manifest:af90f8aa-8e6a-45cf-9692-0fae06ef4548",
			"index":0,
			"elementWipType":"element-aside",
			"toolbar":[
				"insertMedia"
			],
			"tag":"As"
		}
	},
	testcase17: {
		oldElementData: {
			"id":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
			"type":"element-authoredtext",
			"elementdata":{
				"text":"weqwe"
			},
			"html":{
				"text":"<p class=\"paragraphNumeroUno\">weqwe</p>"
			},
			"versionUrn":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
			"contentUrn":"urn:pearson:entity:614e9d2f-3146-4ff1-98ad-0ff1fcafa243"
		},
		newElementData: {
			"elementId":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
			"elementType":"element-authoredtext",
			"primaryOption":"primary-heading",
			"secondaryOption":"secondary-heading-3",
			"labelText":"H3",
			"toolbar":[
					"insertMedia"
			]
		},
		oldElementInfo: {
			"tag":"P",
			"elementType":"element-authoredtext",
			"primaryOption":"primary-paragraph",
			"secondaryOption":"secondary-paragraph",
			"elementId":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
			"index":"0-0-0",
			"elementWipType":"element-authoredtext",
			"toolbar":[
				"insertMedia"
			]
		},
		store: {
			"urn:pearson:manifest:c981f32b-7a2d-4a73-ae33-51ac40ad9fb4":{
				"id":"urn:pearson:manifest:c981f32b-7a2d-4a73-ae33-51ac40ad9fb4",
				"type":"manifest",
				"schema":"http://schemas.pearson.com/wip-authoring/manifest/1",
				"versionUrn":"urn:pearson:manifest:c981f32b-7a2d-4a73-ae33-51ac40ad9fb4",
				"contentUrn":"urn:pearson:entity:1860082d-0482-4172-aebd-159881d3bcc1",
				"contents":{
					"bodymatter":[
						{
						"id":"urn:pearson:manifest:5e85f1d1-ee63-4652-ac9b-2edc84ff25b9",
						"type":"showhide",
						"schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
						"versionUrn":"urn:pearson:manifest:5e85f1d1-ee63-4652-ac9b-2edc84ff25b9",
						"contentUrn":"urn:pearson:entity:9c723e06-5b17-4e2b-bb5e-fc29fc98cf24",
						"status":"wip",
						"interactivedata":{
							"postertextobject":[
								{
									"id":"urn:pearson:work:bf126c89-c3be-496e-8dbf-98b1a31fd6f8",
									"type":"element-authoredtext",
									"elementdata":{
									"text":"Reveal Answer:"
									},
									"html":{
									"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
									},
									"versionUrn":"urn:pearson:work:bf126c89-c3be-496e-8dbf-98b1a31fd6f8",
									"contentUrn":"urn:pearson:entity:af943790-a88f-4d50-be93-60ef20141aa3"
								}
							],
							"show":[
								{
									"id":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
									"type":"element-authoredtext",
									"elementdata":{
									"text":"weqwe"
									},
									"html":{
									"text":"<p class=\"paragraphNumeroUno\">weqwe</p>"},
									"versionUrn":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
									"contentUrn":"urn:pearson:entity:614e9d2f-3146-4ff1-98ad-0ff1fcafa243"
								}
							],
							"hide":[
								{
									"id":"urn:pearson:work:d9fc4be3-aaf7-41af-88fb-e45b21d8468c",
									"type":"element-authoredtext",
									"elementdata":{
									"text":""
									},
									"html":{
									"text":"<p class=\"paragraphNumeroUno\"><br></p>"},
									"versionUrn":"urn:pearson:work:d9fc4be3-aaf7-41af-88fb-e45b21d8468c",
									"contentUrn":"urn:pearson:entity:6128c6c2-e28e-4059-afaa-4fe39afdc6da"
								}
							]
						}
						}
					],
					"title":{
						"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
						"text":"sh"
					},
					"schema":"http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest"
				},
				"status":"wip",
				"pageNo":0,
				"pageCount":1,
				"pageLimit":25
			}
		},
		showHideObj : {
			"currentElement":{
				"id":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
				"type":"element-authoredtext",
				"elementdata":{
					"text":"weqwe"
				},
				"html":{
					"text":"<p class=\"paragraphNumeroUno\">weqwe</p>"},
				"versionUrn":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
				"contentUrn":"urn:pearson:entity:614e9d2f-3146-4ff1-98ad-0ff1fcafa243"
			},
			"index":"0-0-0",
			"element":{
				"id":"urn:pearson:manifest:5e85f1d1-ee63-4652-ac9b-2edc84ff25b9",
				"type":"showhide",
				"schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
				"versionUrn":"urn:pearson:manifest:5e85f1d1-ee63-4652-ac9b-2edc84ff25b9",
				"contentUrn":"urn:pearson:entity:9c723e06-5b17-4e2b-bb5e-fc29fc98cf24",
				"status":"wip",
				"interactivedata":{
					"postertextobject":[
						{
						"id":"urn:pearson:work:bf126c89-c3be-496e-8dbf-98b1a31fd6f8",
						"type":"element-authoredtext",
						"schema":"http://schemas.pearson.com/wip-authoring/element/1",
						"elementdata":{
							"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
							"text":"Reveal Answer:"
						},
						"html":{
							"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"},
						"versionUrn":"urn:pearson:work:bf126c89-c3be-496e-8dbf-98b1a31fd6f8",
						"contentUrn":"urn:pearson:entity:af943790-a88f-4d50-be93-60ef20141aa3"
						}
					],
					"show":[
						{
						"id":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
						"type":"element-authoredtext",
						"schema":"http://schemas.pearson.com/wip-authoring/element/1",
						"elementdata":{
							"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
							"text":"weqwe"
						},
						"html":{
							"text":"<p class=\"paragraphNumeroUno\">weqwe</p>"},
						"versionUrn":"urn:pearson:work:bf44530b-aba5-4935-a354-5c8f9e110647",
						"contentUrn":"urn:pearson:entity:614e9d2f-3146-4ff1-98ad-0ff1fcafa243"
						}
					],
					"hide":[
						{
						"id":"urn:pearson:work:d9fc4be3-aaf7-41af-88fb-e45b21d8468c",
						"type":"element-authoredtext",
						"schema":"http://schemas.pearson.com/wip-authoring/element/1",
						"elementdata":{
							"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
							"text":""
						},
						"html":{
							"text":"<p class=\"paragraphNumeroUno\"><br></p>"},
						"versionUrn":"urn:pearson:work:d9fc4be3-aaf7-41af-88fb-e45b21d8468c",
						"contentUrn":"urn:pearson:entity:6128c6c2-e28e-4059-afaa-4fe39afdc6da"
						}
					]
				},
				"grandParent":{}
			},
			"showHideType":"show"
		}
	},
	testcase18: {
		initState: {
			appStore:{
				dataToUpdate: {
					isNumbered: true,
					startNumber: 1
				},
				activeElement: {elementType: "poetry",index: 0, primaryOption: "primary-poetry", secondaryOption: "secondary-poetry", numbered: false, startNumber: "1",tag: "PE"},
				slateLevelData:{
					"urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333":{
						id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
						contents:{
							bodymatter: [
								{
									contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
									contents: {
										bodymatter: []
									},
									id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
									index: 0,
									numberedline: false,
									schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
								}
							],
							schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
							title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
						},
						pageCount: 0,
						pageLimit: 25,
						pageNo: 0,
						schema: "http://schemas.pearson.com/wip-authoring/intro/1",
						status: "wip",
						type: "chapterintro",
						contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
						versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
					}
				}
			}
		},
		store: {},
		dataToUpdate: {
			"isNumbered": true,
			"startNumber": 1
		},
		activeElement: {
			elementId: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
			elementType: "poetry",
			elementWipType: "poetry",
			index: 0,
			numbered: true,
			primaryOption: "primary-poetry",
			secondaryOption: "secondary-poetry",
			startNumber: "1",
			tag: "PE",
		},
		currentSlateData: {
			id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
			contents:{
				bodymatter: [
					{
						contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
						contents: {
							bodymatter: []
						},
						id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
						index: 0,
						numberedline: false,
						schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
					},
				],
				schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
				title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
			},
			pageCount: 0,
			pageLimit: 25,
			pageNo: 0,
			schema: "http://schemas.pearson.com/wip-authoring/intro/1",
			status: "wip",
			type: "chapterintro",
			contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
			versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
		},
	},
	testcase19: {
		initState: {
			appStore:{
				dataToUpdate: {
					isNumbered: true,
					startNumber: 1
				},
				activeElement: {elementType: "poetry",index: 0, primaryOption: "primary-poetry", secondaryOption: "secondary-poetry", numbered: false, startNumber: "1",tag: "PE"},
				slateLevelData:{
					"urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333":{
						id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
						contents:{
							bodymatter: [
								{
									contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
									contents: {
										bodymatter: []
									},
									id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
									index: 0,
									numberedline: false,
									schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
								}
							],
							schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
							title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
						},
						pageCount: 0,
						pageLimit: 25,
						pageNo: 0,
						schema: "http://schemas.pearson.com/wip-authoring/intro/1",
						status: "approved",
						type: "popup",
						contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
						versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
					}
				}
			}
		},
		store: {},
		dataToUpdate: {
			"isNumbered": true,
			"startNumber": 1
		},
		activeElement: {
			elementId: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
			elementType: "poetry",
			elementWipType: "poetry",
			index: 0,
			numbered: true,
			primaryOption: "primary-poetry",
			secondaryOption: "secondary-poetry",
			startNumber: "1",
			tag: "PE",
		},
		currentSlateData: {
			id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
			contents:{
				bodymatter: [
					{
						contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
						contents: {
							bodymatter: []
						},
						id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
						index: 0,
						numberedline: false,
						schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
					},
				],
				schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
				title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
			},
			pageCount: 0,
			pageLimit: 25,
			pageNo: 0,
			schema: "http://schemas.pearson.com/wip-authoring/intro/1",
			status: "approved",
			type: "popup",
			contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
			versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
		},
	},
	testcase20: {
		initState: {
			appStore:{
				dataToUpdate: {
					isNumbered: true,
					startNumber: 1
				},
				activeElement: {elementType: "poetry",index: 0, primaryOption: "primary-poetry", secondaryOption: "secondary-poetry", numbered: false, startNumber: "1",tag: "PE"},
				slateLevelData:{
					"urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333":{
						id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
						contents:{
							bodymatter: [
								{
									contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
									contents: {
										bodymatter: []
									},
									id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
									index: 0,
									numberedline: false,
									schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
								}
							],
							schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
							title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
						},
						pageCount: 0,
						pageLimit: 25,
						pageNo: 0,
						schema: "http://schemas.pearson.com/wip-authoring/intro/1",
						status: "approved",
						type: "chapterintro",
						contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
						versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
					}
				}
			}
		},
		store: {},
		dataToUpdate: {
			"isNumbered": true,
			"startNumber": 1
		},
		activeElement: {
			elementId: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
			elementType: "poetry",
			elementWipType: "poetry",
			index: 0,
			numbered: true,
			primaryOption: "primary-poetry",
			secondaryOption: "secondary-poetry",
			startNumber: "1",
			tag: "PE",
		},
		currentSlateData: {
			id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
			contents:{
				bodymatter: [
					{
						contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
						contents: {
							bodymatter: []
						},
						id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
						index: 0,
						numberedline: false,
						schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
					},
				],
				schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
				title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
			},
			pageCount: 0,
			pageLimit: 25,
			pageNo: 0,
			schema: "http://schemas.pearson.com/wip-authoring/intro/1",
			status: "approved",
			type: "chapterintro",
			contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
			versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333"
		},
	},
}

