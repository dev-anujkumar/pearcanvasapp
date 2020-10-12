export const assessmentSlateDefault = {
    "id": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "type": "element-assessment",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid": "",
        "assessmentformat": "",
        "usagetype": "",
        "assessmenttitle":"",
    },
    "versionUrn": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "contentUrn": "urn:pearson:entity:30e2df12-8683-4ef7-b064-d889d4d480f6"
}
export const defaultAS = {
    "id": "urn:pearson:work:332ca0f1-9088-412c-a5da-60489b5b4165",
    "type": "element-assessment",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid": "",
        "assessmentformat": "fpo"
    },
    "versionUrn": "urn:pearson:work:332ca0f1-9088-412c-a5da-60489b5b4165",
    "contentUrn": "urn:pearson:entity:f7ac732c-212a-4737-a34d-cd3a362039af",
    "status": "wip"
}
export const DefaultAssessmentSlateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "contentUrn": "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
        "id": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "versionUrn": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "contents": {
            "backmatter": [],
            "frontmatter": [],
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "bodymatter": [
                defaultAS
            ]
        }
    }
}

export const assessmentSlateTDX = {
    "id": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "type": "element-assessment",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "assessmentformat": "tdx",
        "usagetype": "Quiz",
        "assessmenttitle":"1.1 Homework",
    },
    "versionUrn": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "contentUrn": "urn:pearson:entity:30e2df12-8683-4ef7-b064-d889d4d480f6"
}
export const assessmentSlateELM = {
    "id": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "type": "element-assessment",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid": "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464",
        "assessmentformat": "puf",
        "usagetype": "Quiz",
        "assessmenttitle":"Open response question updated",
    },
    "versionUrn": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "contentUrn": "urn:pearson:entity:30e2df12-8683-4ef7-b064-d889d4d480f6"
}
export const mockELMResponse = {
    "versionUrn": "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
    "contentUrn": "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
    "numberOfResources": 84,
    "alignments": {
        "resourceCollections": [
            {
                "rcUrn": "urn:pearson:rc:56cba0b2-ff36-41be-91e6-13bf064ebe19",
                "title": {
                    "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:2defbe42-eb49-46c4-805a-39424645ff00"
                    },
                    {
                        "urn": "urn:pearson:work:6fec4c48-aaf2-4524-83d5-bcd3529d4b9d"
                    },
                    {
                        "urn": "urn:pearson:work:984888fe-a6c8-4d64-920b-7926ecf2b71f",
                        "type": "assessment"
                    },
                    {
                        "urn": "urn:pearson:work:2822880e-7754-4a4e-8e68-5402f0b6c02b",
                        "type": "assessment"
                    },
                    {
                        "urn": "urn:pearson:work:6a5087c2-9e03-46dd-9f6c-aba600cacdb6",
                        "type": "assessment"
                    },
                    {
                        "urn": "urn:pearson:work:e0d58daa-fa31-4a63-992f-2e49592af2b3",
                        "type": "assessment"
                    },
                    {
                        "urn": "urn:pearson:work:0cf4e697-39cc-4819-b5d9-086808670921"
                    },
                    {
                        "urn": "urn:pearson:work:b256d093-c5b5-4917-ba5b-59e512de1edd"
                    }
                ]
            },
            {
                "rcUrn": "urn:pearson:rc:f68d6c73-be73-4eb4-b5bb-ff49cf4c0133",
                "title": {
                    "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:cbcb7f70-d712-4238-a804-74078cd0a282"
                    },
                    {
                        "urn": "urn:pearson:work:5d579662-f6be-45b0-8109-ebc9aa5089f2"
                    },
                    {
                        "urn": "urn:pearson:work:1c204a9e-bac3-40d8-89f0-a1877df28410"
                    },
                    {
                        "urn": "urn:pearson:work:3523044d-b121-4edf-9be4-b766bc9b9150"
                    },
                    {
                        "urn": "urn:pearson:work:998e861d-971c-417a-8467-cb403caac778"
                    },
                    {
                        "urn": "urn:pearson:work:5cadee41-da7f-4813-b78a-1def17c2612d"
                    },
                    {
                        "urn": "urn:pearson:work:93ca0f51-bf77-4d09-9d4e-d287e81e88b8"
                    },
                    {
                        "urn": "urn:pearson:work:b91aab86-1364-48e9-820f-b6bf4c2c5991"
                    },
                    {
                        "urn": "urn:pearson:work:9789a034-e205-46eb-8a35-3597789008e3"
                    },
                    {
                        "urn": "urn:pearson:work:626cad81-2a5c-4aa8-8f9c-cc301a964657"
                    },
                    {
                        "urn": "urn:pearson:work:d36f23d8-27ef-4803-8674-3168f278d2df"
                    },
                    {
                        "urn": "urn:pearson:work:957c9c5d-5c60-4411-8bb7-6feefeb5fa7a"
                    },
                    {
                        "urn": "urn:pearson:work:f195f9be-c187-45f4-b1c5-832cd548d582"
                    },
                    {
                        "urn": "urn:pearson:work:b5a153c1-745f-43e4-92c3-5221fe5cd672"
                    },
                    {
                        "urn": "urn:pearson:work:a55624a3-787c-42aa-a857-37d868d8f19d"
                    },
                    {
                        "urn": "urn:pearson:work:b6d8088a-f71d-4e43-986b-d90bfd48e844"
                    },
                    {
                        "urn": "urn:pearson:work:b120cb84-6580-4821-b013-df567398847c"
                    },
                    {
                        "urn": "urn:pearson:work:8f627273-9b5f-4d6c-8aa5-5fe1503b036e"
                    },
                    {
                        "urn": "urn:pearson:work:2a197115-5f99-42d4-ad1d-d8c7c5c90c7c"
                    },
                    {
                        "urn": "urn:pearson:work:e3a9cbca-a6d9-4830-b12e-8c50d5a49540"
                    },
                    {
                        "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                    },
                    {
                        "urn": "urn:pearson:work:e65fd2bf-e899-45a9-956b-132037bff222"
                    },
                    {
                        "urn": "urn:pearson:work:6237777b-c255-401e-8085-c4078062de21"
                    },
                    {
                        "urn": "urn:pearson:work:faeafa6b-de12-44ad-8883-f7a2a3ef8088"
                    },
                    {
                        "urn": "urn:pearson:work:77cd696d-5868-4879-8393-b37e578c9bef"
                    },
                    {
                        "urn": "urn:pearson:work:3f7a1b11-1eea-4175-82a6-c72abae1813a"
                    },
                    {
                        "urn": "urn:pearson:work:956380ed-7cb5-44ae-9ea6-f8de0eec8f77"
                    },
                    {
                        "urn": "urn:pearson:work:a7d912e5-5357-4cf0-8d93-ec211437be0a"
                    },
                    {
                        "urn": "urn:pearson:work:368d6cbb-ed18-414b-a9a0-5e3751f90ef4"
                    },
                    {
                        "urn": "urn:pearson:work:1ad762cb-7738-4b43-809b-7f912bae2b5c"
                    },
                    {
                        "urn": "urn:pearson:work:6d024ab8-f480-4708-a87d-d72c58632375"
                    },
                    {
                        "urn": "urn:pearson:work:e840e219-246b-415c-855c-5e6b48eb2dc8"
                    }
                ]
            },
            {
                "rcUrn": "urn:pearson:rc:c6d399f4-acc5-4e77-be6d-b7e5ef2dac55",
                "title": {
                    "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:7711d66c-37ad-490c-962e-2c031b59e6c0"
                    }
                ]
            },
            {
                "rcUrn": "urn:pearson:rc:98784607-2c30-49e4-850a-72997ddd4fce",
                "title": {
                    "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:96e14081-0849-40b4-b9ba-abd5446ab32e"
                    }
                ]
            },
            {
                "rcUrn": "urn:pearson:rc:c978949c-d844-4f93-9415-eabbf8d8db90",
                "title": {
                    "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:33707d71-fd7c-4f61-a443-2e996f995337"
                    },
                    {
                        "urn": "urn:pearson:work:0a04bf4e-4865-410b-a15c-d4a38db89205"
                    },
                    {
                        "urn": "urn:pearson:work:6037830f-f557-4222-9b8f-3dc77ca6478a"
                    },
                    {
                        "urn": "urn:pearson:work:a47ef221-1c65-471b-83c2-3ae9851c8c61"
                    }
                ]
            }
        ]
    },
    "contents": {        
        "frontMatter": [
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:9d1ff433-5f67-46b9-972d-c0f5b4c239d9",
                "versionUrn": "urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f",
                "unformattedTitle": {
                    "en": "PART - I"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:54e4a7bb-94fe-418a-8dac-76d0dc23c369",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:53a05d5e-67fa-49ee-af73-70cec4756801"
                                },
                                {
                                    "urn": "urn:pearson:work:c82ea0c4-875e-458e-b35e-3cbe70ff529d"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:b91aab86-1364-48e9-820f-b6bf4c2c5991"
                                },
                                {
                                    "urn": "urn:pearson:work:3eb891b8-32e8-46f5-8f38-a4fc62b8d6b1"
                                },
                                {
                                    "urn": "urn:pearson:work:d5c773a7-593f-4382-8ab9-c9106798d52a"
                                },
                                {
                                    "urn": "urn:pearson:work:47c2bf8b-053c-4645-bf93-fc53c3df877c"
                                },
                                {
                                    "urn": "urn:pearson:work:330257c9-98a9-4ba8-a088-e3c863464851"
                                },
                                {
                                    "urn": "urn:pearson:work:dddd8610-d562-4fad-9968-f7688a333d65"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:411d5ccd-2323-4a50-9a76-27ccdc92e4d8",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:2f14041b-2f5a-47e1-9298-0d0d74caaff0"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:e4093533-e1cb-4210-a510-16b6db502029",
                            "versionUrn": "urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7a00a62-5235-41ce-a50a-1da654112358",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:6f83e848-eb73-4581-ad83-10ac0bb59169"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e4aebda3-708d-40c2-9c18-d4833d07f77c"
                                            }
                                        ]
                                    },
                                    {
                                        "rcUrn": "urn:pearson:rc:6cb4eb4e-b90b-4f34-9424-e5482e5b7568",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:5f4911b1-6a82-4957-afbc-31e125c19611",
                                        "versionUrn": "urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:330de361-8cd2-44f5-aa08-17f93224aa55",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:eb21fcbf-a47e-479d-8ab2-719dee4c2129"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:b4c178e8-3789-48a6-89dd-119fe1ae8b09"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:68974181-1764-4be6-b370-3cac24926d08",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:6593a758-4a68-410f-ae2f-301069d8670a",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a5eb257a-5943-438f-9295-5e7c42cf79a8"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:408a0e28-1bb6-4916-a16f-556fb903c1f9",
                                        "versionUrn": "urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:8756df12-80e4-44f4-81f8-23cc705de8ae",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:f32d5516-0d22-4f40-9052-f36b3eb7a5e6"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:8a7d1817-4838-4bdb-9906-ea625f2cf514",
                            "versionUrn": "urn:pearson:manifest:354d1ae7-46b6-4cb4-81d2-ebdf464a1179",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c4dde2fc-befb-4f52-a35e-54a6feb351e9",
                            "versionUrn": "urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:760594d3-7e61-454e-bee7-a553c7ad7332",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:4cfe673f-762a-4d39-a6f8-64d2d0770818"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:818f82b8-25d7-461e-b678-ca725d8ba661",
                                        "versionUrn": "urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171",
                                        "unformattedTitle": {
                                            "en": "Module -3 "
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:496744b6-3981-4ab9-b5bf-1099901b9e39",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:e43498d2-b099-4a61-a71f-83c305478cd3"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:dd2a3fa6-aef6-41fb-a8fc-728893800590",
                "versionUrn": "urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c",
                "unformattedTitle": {
                    "en": "PART - II"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:efd3218b-20ee-4c88-9102-18d5586c31aa",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:5990cb28-c96a-4185-8779-b6597bda0c2c"
                                },
                                {
                                    "urn": "urn:pearson:work:327b2d3b-c735-4c0c-9a5f-690931c7a7c0"
                                },
                                {
                                    "urn": "urn:pearson:work:e17119ac-3a3b-4464-9160-58817773b675"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:d23210de-865a-44c3-a14d-3897b1eb64c4",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:7711d66c-37ad-490c-962e-2c031b59e6c0"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:2f2a6e12-e9b6-48f9-aa1d-42464443fc7c",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:5ea5bf1f-60b3-430f-b36f-f11172426589"
                                },
                                {
                                    "urn": "urn:pearson:work:f32cc559-31e9-40ed-aac3-623eda57e1d0"
                                },
                                {
                                    "urn": "urn:pearson:work:3b141679-213c-41fb-a233-87c093ed1688"
                                },
                                {
                                    "urn": "urn:pearson:work:62dd2e7e-28f0-4a83-8a5b-dd64dd64ea12"
                                },
                                {
                                    "urn": "urn:pearson:work:612205e4-bc65-451a-89c7-11cfad32c13f"
                                },
                                {
                                    "urn": "urn:pearson:work:1d6ff239-db57-4048-a954-b70f36940e42"
                                },
                                {
                                    "urn": "urn:pearson:work:d2c94500-203b-4fb2-8bc7-b0d6d1fa085b"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:6171fb1e-c39f-4241-a27a-5434af744ea2",
                            "versionUrn": "urn:pearson:manifest:b75c3fb7-46c9-4ea7-bac0-0b74889b4d34",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c485a0de-dc92-467b-8661-593aa0d6f4eb",
                            "versionUrn": "urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:004f944d-c704-40e2-995d-01e5c4ad087c",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:3644841e-5109-4d66-a6c1-ee9e0844f88c"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:1d734bb8-02db-4779-985f-defb58ae97ea",
                                        "versionUrn": "urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:7e4a4d68-b362-4aee-9383-3af558bbe569",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:41a74d71-1a6d-4aa2-89cf-6642d04ebba9"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:7efdb521-b337-42b2-8cc9-d8eb64ceebbb",
                            "versionUrn": "urn:pearson:manifest:43c822d9-4b65-4765-b2a4-c03bcb05ac8c",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:fe1e887a-a848-44e9-b1f7-ea7c834e88e3",
                "versionUrn": "urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d",
                "unformattedTitle": {
                    "en": "PART - III"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:10760228-fd7e-46bb-a2cd-9b27ec928feb",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:89f87a75-581f-4a1a-a478-3a6917398dd8"
                                },
                                {
                                    "urn": "urn:pearson:work:fbe08e2d-bc34-4288-9042-0f13f8e8018f"
                                },
                                {
                                    "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                },
                                {
                                    "urn": "urn:pearson:work:4dfa0fb0-bc23-438f-89a7-1f7a6f1cdc71"
                                },
                                {
                                    "urn": "urn:pearson:work:70a884d4-8d22-41a6-999d-ae7a14cb7008"
                                },
                                {
                                    "urn": "urn:pearson:work:c9d4dbe4-464a-4e9c-a626-8d3bea15ae11"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:ad7bba18-cbfb-4cd3-86ca-cfd4a253a75c",
                            "versionUrn": "urn:pearson:manifest:c232661f-e40f-4704-987e-0ad0f1c5b651",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:30273f9d-c995-4bf6-96ce-ee8035141164",
                                        "versionUrn": "urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:38c4baf0-4a6a-44d0-ad9b-042303c6f6b8",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:07c142d2-d40a-4320-873c-441d4c23987a"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:1ae20ece-96b1-4a0e-917e-a015c3f3f742",
                            "versionUrn": "urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7399aaf-bea6-41a4-bbf4-70bd05162a15",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:a0c5a9aa-04ed-4f75-8e63-8c6eb7d43117"
                                            },
                                            {
                                                "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e30291b1-b2ca-4b5b-8fa7-69c09a9028a5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:efb6782b-e60c-4239-9a66-34d5fb93d527",
                                        "versionUrn": "urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6",
                                        "unformattedTitle": {
                                            "en": "Module - III"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:33a92bb2-97b0-4c73-bcfc-ce3bc0d97b96",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:13b8385f-42fb-458a-b909-065e616ebbab"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:c8ffcbaa-e00f-4fbb-87e6-a97843d2a12d"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:974c28b7-19df-4cf7-9e55-fd0e9c10b868"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:5bdc5e84-9250-4980-bc21-36c7bb017d34"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:fcc25105-b24e-48b5-a3cc-7c334aadf1b6",
                            "versionUrn": "urn:pearson:manifest:eee7b7ac-afb1-49e1-8b87-84b14632b492",
                            "unformattedTitle": {
                                "en": "Chapter 1"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:f566830c-e0d9-4df4-9b8e-32950be4ccc6",
                                        "versionUrn": "urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3",
                                        "unformattedTitle": {
                                            "en": "Module"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:c336026d-bbfa-44b7-b174-91942f7e0355",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a046a657-88a4-4ffc-b336-63216c2e404d"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ],
        "bodyMatter": [
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:9d1ff433-5f67-46b9-972d-c0f5b4c239d9",
                "versionUrn": "urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f",
                "unformattedTitle": {
                    "en": "PART - I"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:54e4a7bb-94fe-418a-8dac-76d0dc23c369",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:53a05d5e-67fa-49ee-af73-70cec4756801"
                                },
                                {
                                    "urn": "urn:pearson:work:c82ea0c4-875e-458e-b35e-3cbe70ff529d"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:b91aab86-1364-48e9-820f-b6bf4c2c5991"
                                },
                                {
                                    "urn": "urn:pearson:work:3eb891b8-32e8-46f5-8f38-a4fc62b8d6b1"
                                },
                                {
                                    "urn": "urn:pearson:work:d5c773a7-593f-4382-8ab9-c9106798d52a"
                                },
                                {
                                    "urn": "urn:pearson:work:47c2bf8b-053c-4645-bf93-fc53c3df877c"
                                },
                                {
                                    "urn": "urn:pearson:work:330257c9-98a9-4ba8-a088-e3c863464851"
                                },
                                {
                                    "urn": "urn:pearson:work:dddd8610-d562-4fad-9968-f7688a333d65"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:411d5ccd-2323-4a50-9a76-27ccdc92e4d8",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:2f14041b-2f5a-47e1-9298-0d0d74caaff0"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:e4093533-e1cb-4210-a510-16b6db502029",
                            "versionUrn": "urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7a00a62-5235-41ce-a50a-1da654112358",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:6f83e848-eb73-4581-ad83-10ac0bb59169"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e4aebda3-708d-40c2-9c18-d4833d07f77c"
                                            }
                                        ]
                                    },
                                    {
                                        "rcUrn": "urn:pearson:rc:6cb4eb4e-b90b-4f34-9424-e5482e5b7568",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:5f4911b1-6a82-4957-afbc-31e125c19611",
                                        "versionUrn": "urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:330de361-8cd2-44f5-aa08-17f93224aa55",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:eb21fcbf-a47e-479d-8ab2-719dee4c2129"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:b4c178e8-3789-48a6-89dd-119fe1ae8b09"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:68974181-1764-4be6-b370-3cac24926d08",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:6593a758-4a68-410f-ae2f-301069d8670a",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a5eb257a-5943-438f-9295-5e7c42cf79a8"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:408a0e28-1bb6-4916-a16f-556fb903c1f9",
                                        "versionUrn": "urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:8756df12-80e4-44f4-81f8-23cc705de8ae",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:f32d5516-0d22-4f40-9052-f36b3eb7a5e6"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:8a7d1817-4838-4bdb-9906-ea625f2cf514",
                            "versionUrn": "urn:pearson:manifest:354d1ae7-46b6-4cb4-81d2-ebdf464a1179",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c4dde2fc-befb-4f52-a35e-54a6feb351e9",
                            "versionUrn": "urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:760594d3-7e61-454e-bee7-a553c7ad7332",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:4cfe673f-762a-4d39-a6f8-64d2d0770818"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:818f82b8-25d7-461e-b678-ca725d8ba661",
                                        "versionUrn": "urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171",
                                        "unformattedTitle": {
                                            "en": "Module -3 "
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:496744b6-3981-4ab9-b5bf-1099901b9e39",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:e43498d2-b099-4a61-a71f-83c305478cd3"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:dd2a3fa6-aef6-41fb-a8fc-728893800590",
                "versionUrn": "urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c",
                "unformattedTitle": {
                    "en": "PART - II"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:efd3218b-20ee-4c88-9102-18d5586c31aa",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:5990cb28-c96a-4185-8779-b6597bda0c2c"
                                },
                                {
                                    "urn": "urn:pearson:work:327b2d3b-c735-4c0c-9a5f-690931c7a7c0"
                                },
                                {
                                    "urn": "urn:pearson:work:e17119ac-3a3b-4464-9160-58817773b675"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:d23210de-865a-44c3-a14d-3897b1eb64c4",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:7711d66c-37ad-490c-962e-2c031b59e6c0"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:2f2a6e12-e9b6-48f9-aa1d-42464443fc7c",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:5ea5bf1f-60b3-430f-b36f-f11172426589"
                                },
                                {
                                    "urn": "urn:pearson:work:f32cc559-31e9-40ed-aac3-623eda57e1d0"
                                },
                                {
                                    "urn": "urn:pearson:work:3b141679-213c-41fb-a233-87c093ed1688"
                                },
                                {
                                    "urn": "urn:pearson:work:62dd2e7e-28f0-4a83-8a5b-dd64dd64ea12"
                                },
                                {
                                    "urn": "urn:pearson:work:612205e4-bc65-451a-89c7-11cfad32c13f"
                                },
                                {
                                    "urn": "urn:pearson:work:1d6ff239-db57-4048-a954-b70f36940e42"
                                },
                                {
                                    "urn": "urn:pearson:work:d2c94500-203b-4fb2-8bc7-b0d6d1fa085b"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:6171fb1e-c39f-4241-a27a-5434af744ea2",
                            "versionUrn": "urn:pearson:manifest:b75c3fb7-46c9-4ea7-bac0-0b74889b4d34",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c485a0de-dc92-467b-8661-593aa0d6f4eb",
                            "versionUrn": "urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:004f944d-c704-40e2-995d-01e5c4ad087c",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:3644841e-5109-4d66-a6c1-ee9e0844f88c"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:1d734bb8-02db-4779-985f-defb58ae97ea",
                                        "versionUrn": "urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:7e4a4d68-b362-4aee-9383-3af558bbe569",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:41a74d71-1a6d-4aa2-89cf-6642d04ebba9"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:7efdb521-b337-42b2-8cc9-d8eb64ceebbb",
                            "versionUrn": "urn:pearson:manifest:43c822d9-4b65-4765-b2a4-c03bcb05ac8c",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:fe1e887a-a848-44e9-b1f7-ea7c834e88e3",
                "versionUrn": "urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d",
                "unformattedTitle": {
                    "en": "PART - III"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:10760228-fd7e-46bb-a2cd-9b27ec928feb",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:89f87a75-581f-4a1a-a478-3a6917398dd8"
                                },
                                {
                                    "urn": "urn:pearson:work:fbe08e2d-bc34-4288-9042-0f13f8e8018f"
                                },
                                {
                                    "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                },
                                {
                                    "urn": "urn:pearson:work:4dfa0fb0-bc23-438f-89a7-1f7a6f1cdc71"
                                },
                                {
                                    "urn": "urn:pearson:work:70a884d4-8d22-41a6-999d-ae7a14cb7008"
                                },
                                {
                                    "urn": "urn:pearson:work:c9d4dbe4-464a-4e9c-a626-8d3bea15ae11"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:ad7bba18-cbfb-4cd3-86ca-cfd4a253a75c",
                            "versionUrn": "urn:pearson:manifest:c232661f-e40f-4704-987e-0ad0f1c5b651",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:30273f9d-c995-4bf6-96ce-ee8035141164",
                                        "versionUrn": "urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:38c4baf0-4a6a-44d0-ad9b-042303c6f6b8",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:07c142d2-d40a-4320-873c-441d4c23987a"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:1ae20ece-96b1-4a0e-917e-a015c3f3f742",
                            "versionUrn": "urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7399aaf-bea6-41a4-bbf4-70bd05162a15",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:a0c5a9aa-04ed-4f75-8e63-8c6eb7d43117"
                                            },
                                            {
                                                "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e30291b1-b2ca-4b5b-8fa7-69c09a9028a5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:efb6782b-e60c-4239-9a66-34d5fb93d527",
                                        "versionUrn": "urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6",
                                        "unformattedTitle": {
                                            "en": "Module - III"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:33a92bb2-97b0-4c73-bcfc-ce3bc0d97b96",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:13b8385f-42fb-458a-b909-065e616ebbab"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:c8ffcbaa-e00f-4fbb-87e6-a97843d2a12d"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:974c28b7-19df-4cf7-9e55-fd0e9c10b868"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:5bdc5e84-9250-4980-bc21-36c7bb017d34"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:fcc25105-b24e-48b5-a3cc-7c334aadf1b6",
                            "versionUrn": "urn:pearson:manifest:eee7b7ac-afb1-49e1-8b87-84b14632b492",
                            "unformattedTitle": {
                                "en": "Chapter 1"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:f566830c-e0d9-4df4-9b8e-32950be4ccc6",
                                        "versionUrn": "urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3",
                                        "unformattedTitle": {
                                            "en": "Module"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:c336026d-bbfa-44b7-b174-91942f7e0355",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a046a657-88a4-4ffc-b336-63216c2e404d"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ],
        "backMatter": [
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:9d1ff433-5f67-46b9-972d-c0f5b4c239d9",
                "versionUrn": "urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f",
                "unformattedTitle": {
                    "en": "PART - I"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:54e4a7bb-94fe-418a-8dac-76d0dc23c369",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:53a05d5e-67fa-49ee-af73-70cec4756801"
                                },
                                {
                                    "urn": "urn:pearson:work:c82ea0c4-875e-458e-b35e-3cbe70ff529d"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:b91aab86-1364-48e9-820f-b6bf4c2c5991"
                                },
                                {
                                    "urn": "urn:pearson:work:3eb891b8-32e8-46f5-8f38-a4fc62b8d6b1"
                                },
                                {
                                    "urn": "urn:pearson:work:d5c773a7-593f-4382-8ab9-c9106798d52a"
                                },
                                {
                                    "urn": "urn:pearson:work:47c2bf8b-053c-4645-bf93-fc53c3df877c"
                                },
                                {
                                    "urn": "urn:pearson:work:330257c9-98a9-4ba8-a088-e3c863464851"
                                },
                                {
                                    "urn": "urn:pearson:work:dddd8610-d562-4fad-9968-f7688a333d65"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:411d5ccd-2323-4a50-9a76-27ccdc92e4d8",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bdeec540-85f7-4bc1-a205-600836ce593f alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:2f14041b-2f5a-47e1-9298-0d0d74caaff0"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:e4093533-e1cb-4210-a510-16b6db502029",
                            "versionUrn": "urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7a00a62-5235-41ce-a50a-1da654112358",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:6f83e848-eb73-4581-ad83-10ac0bb59169"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e4aebda3-708d-40c2-9c18-d4833d07f77c"
                                            }
                                        ]
                                    },
                                    {
                                        "rcUrn": "urn:pearson:rc:6cb4eb4e-b90b-4f34-9424-e5482e5b7568",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bc6445ed-cefc-4548-9b6d-1d1d33d548a3 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:5f4911b1-6a82-4957-afbc-31e125c19611",
                                        "versionUrn": "urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:330de361-8cd2-44f5-aa08-17f93224aa55",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:eb21fcbf-a47e-479d-8ab2-719dee4c2129"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:b4c178e8-3789-48a6-89dd-119fe1ae8b09"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:68974181-1764-4be6-b370-3cac24926d08",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:1ef34abb-a290-4817-a81d-e94a8a9290c8"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "rcUrn": "urn:pearson:rc:6593a758-4a68-410f-ae2f-301069d8670a",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:21cf672a-0a26-4035-82ad-5316f10d0449 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a5eb257a-5943-438f-9295-5e7c42cf79a8"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:408a0e28-1bb6-4916-a16f-556fb903c1f9",
                                        "versionUrn": "urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:8756df12-80e4-44f4-81f8-23cc705de8ae",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3ed0bc80-59aa-42ed-9747-abf252f84de5 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:f32d5516-0d22-4f40-9052-f36b3eb7a5e6"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:8a7d1817-4838-4bdb-9906-ea625f2cf514",
                            "versionUrn": "urn:pearson:manifest:354d1ae7-46b6-4cb4-81d2-ebdf464a1179",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c4dde2fc-befb-4f52-a35e-54a6feb351e9",
                            "versionUrn": "urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:760594d3-7e61-454e-bee7-a553c7ad7332",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:e0d8e81d-ef3f-4690-8b3e-eb12b17fb2de alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:4cfe673f-762a-4d39-a6f8-64d2d0770818"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:818f82b8-25d7-461e-b678-ca725d8ba661",
                                        "versionUrn": "urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171",
                                        "unformattedTitle": {
                                            "en": "Module -3 "
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:496744b6-3981-4ab9-b5bf-1099901b9e39",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:9bc4b2d8-432c-46b5-a376-e855e28ce171 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:e43498d2-b099-4a61-a71f-83c305478cd3"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:dd2a3fa6-aef6-41fb-a8fc-728893800590",
                "versionUrn": "urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c",
                "unformattedTitle": {
                    "en": "PART - II"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:efd3218b-20ee-4c88-9102-18d5586c31aa",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                },
                                {
                                    "urn": "urn:pearson:work:5990cb28-c96a-4185-8779-b6597bda0c2c"
                                },
                                {
                                    "urn": "urn:pearson:work:327b2d3b-c735-4c0c-9a5f-690931c7a7c0"
                                },
                                {
                                    "urn": "urn:pearson:work:e17119ac-3a3b-4464-9160-58817773b675"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:d23210de-865a-44c3-a14d-3897b1eb64c4",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:7711d66c-37ad-490c-962e-2c031b59e6c0"
                                }
                            ]
                        },
                        {
                            "rcUrn": "urn:pearson:rc:2f2a6e12-e9b6-48f9-aa1d-42464443fc7c",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2e92ded8-3789-41a0-9c93-886407fdb45c alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:5ea5bf1f-60b3-430f-b36f-f11172426589"
                                },
                                {
                                    "urn": "urn:pearson:work:f32cc559-31e9-40ed-aac3-623eda57e1d0"
                                },
                                {
                                    "urn": "urn:pearson:work:3b141679-213c-41fb-a233-87c093ed1688"
                                },
                                {
                                    "urn": "urn:pearson:work:62dd2e7e-28f0-4a83-8a5b-dd64dd64ea12"
                                },
                                {
                                    "urn": "urn:pearson:work:612205e4-bc65-451a-89c7-11cfad32c13f"
                                },
                                {
                                    "urn": "urn:pearson:work:1d6ff239-db57-4048-a954-b70f36940e42"
                                },
                                {
                                    "urn": "urn:pearson:work:d2c94500-203b-4fb2-8bc7-b0d6d1fa085b"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:6171fb1e-c39f-4241-a27a-5434af744ea2",
                            "versionUrn": "urn:pearson:manifest:b75c3fb7-46c9-4ea7-bac0-0b74889b4d34",
                            "unformattedTitle": {
                                "en": "Chapter - I"
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:c485a0de-dc92-467b-8661-593aa0d6f4eb",
                            "versionUrn": "urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:004f944d-c704-40e2-995d-01e5c4ad087c",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:b86a620a-33a1-40da-a793-bd648316fc50 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:3644841e-5109-4d66-a6c1-ee9e0844f88c"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:1d734bb8-02db-4779-985f-defb58ae97ea",
                                        "versionUrn": "urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df",
                                        "unformattedTitle": {
                                            "en": "Module - 1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:7e4a4d68-b362-4aee-9383-3af558bbe569",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:a39e34a0-6f4e-4dd8-8279-14aacba479df alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:41a74d71-1a6d-4aa2-89cf-6642d04ebba9"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:7efdb521-b337-42b2-8cc9-d8eb64ceebbb",
                            "versionUrn": "urn:pearson:manifest:43c822d9-4b65-4765-b2a4-c03bcb05ac8c",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "contentUrn": "urn:pearson:entity:fe1e887a-a848-44e9-b1f7-ea7c834e88e3",
                "versionUrn": "urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d",
                "unformattedTitle": {
                    "en": "PART - III"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:10760228-fd7e-46bb-a2cd-9b27ec928feb",
                            "title": {
                                "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:bbbdbc28-2972-4586-b29c-89bf3110d68d alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:89f87a75-581f-4a1a-a478-3a6917398dd8"
                                },
                                {
                                    "urn": "urn:pearson:work:fbe08e2d-bc34-4288-9042-0f13f8e8018f"
                                },
                                {
                                    "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                },
                                {
                                    "urn": "urn:pearson:work:4dfa0fb0-bc23-438f-89a7-1f7a6f1cdc71"
                                },
                                {
                                    "urn": "urn:pearson:work:70a884d4-8d22-41a6-999d-ae7a14cb7008"
                                },
                                {
                                    "urn": "urn:pearson:work:c9d4dbe4-464a-4e9c-a626-8d3bea15ae11"
                                },
                                {
                                    "urn": "urn:pearson:work:51687ccc-267b-4997-88ec-3fe6cc13f356"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:ad7bba18-cbfb-4cd3-86ca-cfd4a253a75c",
                            "versionUrn": "urn:pearson:manifest:c232661f-e40f-4704-987e-0ad0f1c5b651",
                            "unformattedTitle": {
                                "en": "Chapter - II"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:30273f9d-c995-4bf6-96ce-ee8035141164",
                                        "versionUrn": "urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34",
                                        "unformattedTitle": {
                                            "en": "Module - 2"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:38c4baf0-4a6a-44d0-ad9b-042303c6f6b8",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:f7ec08cb-8d25-4d46-8cad-cd04b98b7e34 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:07c142d2-d40a-4320-873c-441d4c23987a"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:1ae20ece-96b1-4a0e-917e-a015c3f3f742",
                            "versionUrn": "urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8",
                            "unformattedTitle": {
                                "en": "Chapter - III"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:c7399aaf-bea6-41a4-bbf4-70bd05162a15",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:3b586866-c8a8-46cc-848b-f3c6f3d40fb8 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:a0c5a9aa-04ed-4f75-8e63-8c6eb7d43117"
                                            },
                                            {
                                                "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                            },
                                            {
                                                "urn": "urn:pearson:work:e30291b1-b2ca-4b5b-8fa7-69c09a9028a5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:efb6782b-e60c-4239-9a66-34d5fb93d527",
                                        "versionUrn": "urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6",
                                        "unformattedTitle": {
                                            "en": "Module - III"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:33a92bb2-97b0-4c73-bcfc-ce3bc0d97b96",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:2eb95a65-34b9-4be4-a23f-e51c0693b8e6 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:13b8385f-42fb-458a-b909-065e616ebbab"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:c8ffcbaa-e00f-4fbb-87e6-a97843d2a12d"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:974c28b7-19df-4cf7-9e55-fd0e9c10b868"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:5bdc5e84-9250-4980-bc21-36c7bb017d34"
                                                        },
                                                        {
                                                            "urn": "urn:pearson:work:8c45f9ee-88c2-441d-94d3-3f9c1eba7141"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "contentUrn": "urn:pearson:entity:fcc25105-b24e-48b5-a3cc-7c334aadf1b6",
                            "versionUrn": "urn:pearson:manifest:eee7b7ac-afb1-49e1-8b87-84b14632b492",
                            "unformattedTitle": {
                                "en": "Chapter 1"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "contentUrn": "urn:pearson:entity:f566830c-e0d9-4df4-9b8e-32950be4ccc6",
                                        "versionUrn": "urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3",
                                        "unformattedTitle": {
                                            "en": "Module"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:c336026d-bbfa-44b7-b174-91942f7e0355",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef|urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef container urn:pearson:manifest:be7dfd9a-b8fd-4e53-beee-a4634356dee3 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:a046a657-88a4-4ffc-b336-63216c2e404d"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}

export const mockElmItemResponse = {
    "items": [
        {
            "versionUrn": "urn:pearson:work:f0360d39-0f02-40c0-8a34-9d59869cbf38",
            "entityUrn": "urn:pearson:entity:a263fa6c-747c-4438-a26c-2488797fd112",
            "name": "MCQ-5. The Chemical World The properties of water molecules could help understand all of the following EXCEPT: 24QQ3N7TAS",
            "dateModified": "2020-02-12T00:29:19.271Z",
            "taxonomicTypes": [
                "puf"
            ],
            "modifiedBy": ""
        },
        {
            "versionUrn": "urn:pearson:work:b275351b-527d-4d23-8f36-746651e7d20a",
            "entityUrn": "urn:pearson:entity:b1df64f2-5be1-4670-85de-cea2b39f6eef",
            "name": "Test",
            "dateModified": "2020-02-12T10:26:52.066Z",
            "taxonomicTypes": [
                "puf"
            ],
            "modifiedBy": ""
        }
    ]
}

export const DefaultSlateData = {
    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
        "contentUrn": "urn:pearson:entity:c8240c45-ba81-4a8a-8f9e-32b68108eb4e",
        "id": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "type": "manifest",
        "versionUrn": "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
        "contents": {
            "backmatter": [],
            "frontmatter": [],
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "bodymatter": [
                {
                    "contentUrn": "urn:pearson:entity:1c729842-b027-4a68-bda2-b5908753072c",
                    "html": {},
                    "id": "urn:pearson:work:914b202c-7b51-4143-b045-3300b3491b34",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "type": "element-assessment",
                    "versionUrn": "urn:pearson:work:914b202c-7b51-4143-b045-3300b3491b34",
                    "elementdata": {
                        "assessmentformat": "",
                        "assessmentid": "",
                        "assessmenttitle": "",
                        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                        "usagetype": "",
                    }
                }
            ]
        }
    }
}

export const assessmentSlateWithNewData = {
    "id": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "type": "element-assessment",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid": "urn:pearson:work:fa8bcbce-1cc5-467e-be1d-66cc513ec464",
        "assessmentformat": "cite",
        "usagetype": "Quiz",
        "assessmenttitle":"1.1 Homework",
    },
    "versionUrn": "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
    "contentUrn": "urn:pearson:entity:30e2df12-8683-4ef7-b064-d889d4d480f6"
}

export const CurrentSlateAncestor = {
    currentSlateAncestorData1:
    {
        containerUrn: "urn:pearson:manifest:bb4e289e-8add-4c30-9f52-33b8fd246f81",
        entityUrn: "urn:pearson:entity:a92c93e9-7eca-4855-aa52-8746076382c7",
        title: "AS67",
        label: "assessment",
        matterType: "BodyMatter",
        ancestor: {
            containerUrn: "urn:pearson:manifest:2cd2b0e9-5d9e-4f14-a4ed-8daf8dd871fe",
            entityUrn: "urn:pearson:entity:949c84a3-8b21-4809-9728-bd9bf7d5a80b",
            title: "M67",
            label: "module",
            ancestor: {
                containerUrn: "urn:pearson:manifest:c4f8a211-7518-448c-acd0-831cd7715ae1",
                entityUrn: "urn:pearson:entity:c93ac30e-9945-4c1f-afbc-74cff157c589",
                title: "C67",
                label: "chapter",
                ancestor: {
                    containerUrn: "urn:pearson:manifest:f870431b-29a1-42a7-90e1-05ad274f00c5",
                    entityUrn: "urn:pearson:entity:39541e3c-92bb-453b-b147-665663bf2d78",
                    title: "P67",
                    label: "part",
                    ancestor: {
                        containerUrn: "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
                        entityUrn: "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
                        title: "CYQA_Dec21",
                        label: "project"
                    }
                }
            }
        }
    },
    currentSlateAncestorData2:
    {
        containerUrn: "urn:pearson:manifest:50778b02-a808-4a8c-9c7c-923181e1a7fc",
        entityUrn: "urn:pearson:entity:e14419c8-640e-4767-89c6-c439d9537db1",
        title: "AS--67",
        label: "assessment",
        matterType: "BodyMatter",
        ancestor: {
            containerUrn: "urn:pearson:manifest:c4f8a211-7518-448c-acd0-831cd7715ae1",
            entityUrn: "urn:pearson:entity:c93ac30e-9945-4c1f-afbc-74cff157c589",
            title: "C67",
            label: "chapter",
            ancestor: {
                containerUrn: "urn:pearson:manifest:f870431b-29a1-42a7-90e1-05ad274f00c5",
                entityUrn: "urn:pearson:entity:39541e3c-92bb-453b-b147-665663bf2d78",
                title: "P67",
                label: "part",
                ancestor: {
                    containerUrn: "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
                    entityUrn: "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
                    title: "CYQA_Dec21",
                    label: "project"
                }
            }
        }
    },
    currentSlateAncestorData3:
    {
        containerUrn: "urn:pearson:manifest:2473babc-3182-4639-b36e-4177e03fac03",
        entityUrn: "urn:pearson:entity:4e2e5124-e6f3-4db0-96b6-1d805baee6bb",
        title: "AS3",
        label: "assessment",
        matterType: "BodyMatter",
        ancestor: {
            containerUrn: "urn:pearson:manifest:761f2d68-6a7c-41e9-8363-ca81ab926b82",
            entityUrn: "urn:pearson:entity:dfd414ed-6e32-4d71-90d0-231158853e45",
            title: "Chap1",
            label: "chapter",
            ancestor: {
                containerUrn: "urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad",
                entityUrn: "urn:pearson:entity:e0066675-a993-4f03-aa3c-cd5a4631da41",
                title: "Part1",
                label: "part",
                ancestor: {
                    containerUrn: "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
                    entityUrn: "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
                    title: "CYQA_Dec21",
                    label: "project"
                }
            }
        }
    },
    currentSlateAncestorData4:
    {
        containerUrn: "urn:pearson:manifest:cfcfaa16-6e12-4ec8-b764-e0a440ee7bea",
        entityUrn: "urn:pearson:entity:f2126c57-5fcb-4dae-95ed-6811c140f71a",
        title: "AS1",
        label: "assessment",
        matterType: "BodyMatter",
        ancestor: {
            containerUrn: "urn:pearson:manifest:823f4807-74f5-4411-b9e2-5ede994b1091",
            entityUrn: "urn:pearson:entity:fc5a6d43-b861-490c-9df5-5843dd4046e4",
            title: "Mod1",
            label: "module",
            ancestor: {
                containerUrn: "urn:pearson:manifest:761f2d68-6a7c-41e9-8363-ca81ab926b82",
                entityUrn: "urn:pearson:entity:dfd414ed-6e32-4d71-90d0-231158853e45",
                title: "Chap1",
                label: "chapter",
                ancestor: {
                    containerUrn: "urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad",
                    entityUrn: "urn:pearson:entity:e0066675-a993-4f03-aa3c-cd5a4631da41",
                    title: "Part1",
                    label: "part",
                    ancestor: {
                        containerUrn: "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
                        entityUrn: "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
                        title: "CYQA_Dec21",
                        label: "project"
                    }
                }
            }
        }
    },
    currentSlateAncestorData5:
    {
        containerUrn: "urn:pearson:manifest:d29dfda8-73bc-4ad5-bd4a-3381193549d7",
        entityUrn: "urn:pearson:entity:9734374c-9032-4fe8-aa14-7500cedd0e88",
        title: "",
        label: "assessment",
        matterType: "BodyMatter",
        ancestor: {
            containerUrn: "urn:pearson:manifest:7a37125e-038b-43ad-a9cd-c46e5cab4b1b",
            entityUrn: "urn:pearson:entity:a3e502ad-e60b-43b2-8b11-065874cdb652",
            title: "",
            label: "module",
            ancestor: {
                containerUrn: "urn:pearson:manifest:df38223f-8dac-43ee-b720-edb053bbfa71",
                entityUrn: "urn:pearson:entity:1b4235f3-63ed-4e88-821b-af12f4d087ef",
                title: "chap4",
                label: "chapter",
                ancestor: {
                    containerUrn: "urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad",
                    entityUrn: "urn:pearson:entity:e0066675-a993-4f03-aa3c-cd5a4631da41",
                    title: "Part1",
                    label: "part",
                    ancestor: {
                        containerUrn: "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
                        entityUrn: "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
                        title: "CYQA_Dec21",
                        label: "project"
                    }
                }
            }
        }
    }
}

export const newElmData = {
    "type": "container",
    "label": "project",
    "containerUrn": "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
    "contentUrn": "urn:pearson:entity:ae765bae-a86c-4020-8e35-b98fcb0e3a5f",
    "versionUrn": "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
    "numberOfResources": 14,
    "projectVersionUrn": "urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e",
    "unformattedTitle": {
        "en": "CYQA_Dec21"
    },
    "alignments": {
        "resourceCollections": [
            {
                "rcUrn": "urn:pearson:rc:460c6239-f8a1-4be1-8c0b-0a01396c63de",
                "title": {
                    "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e"
                },
                "description": {
                    "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e alignment"
                },
                "resources": [
                    {
                        "urn": "urn:pearson:work:763ee36d-aa7b-4ee9-af58-e31c8582e38a",
                        "title": {
                            "en": "Elm Assessments title is 1F42J2SAMU"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:5a0928b3-7761-406a-a1b9-ca1cc1aad6b3",
                        "title": {
                            "en": "Copy of PUF Assessment from Elm 01"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:fc7f7eff-05be-4e60-ad1b-60bd2151ddc2",
                        "title": {
                            "en": "PUF Assessment from Elm 02"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:1d06d487-fcbe-4309-ad8d-85968e774656",
                        "title": {
                            "en": "Copy of PUF Assessment from Elm 02"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:dc75e07e-c33f-4ffe-b76c-1c13fb93e79f",
                        "title": {
                            "en": "Copy of Copy of PUF Assessment from Elm 01"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:b209bb2f-0500-4a1a-b1a5-3e41af325a31",
                        "title": {
                            "en": "Copy of Copy of PUF Assessment from Elm 01"
                        },
                        "description": {
                            "en": "--"
                        },
                        "type": "assessment",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:610896d7-2e67-4913-835f-14707a8d2437",
                        "title": {
                            "en": "dfabhdfzhgdfhdfh"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:589ae7d6-7413-49fd-9eb5-08ac174ac12e",
                        "title": {
                            "en": "Copy of dfabhdfzhgdfhdfh_edited title"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:9cf196bc-4ef9-4713-b6c8-03e8bd4301cb",
                        "title": {
                            "en": "Copy of new item chapter with assessment name"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:896197d7-3f8c-4578-aa2d-cc85ca17eba0",
                        "title": {
                            "en": "adasd"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:c20d01c5-4bda-4374-af75-6ca3b98bb0ce",
                        "title": {
                            "en": "mcq"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    },
                    {
                        "urn": "urn:pearson:work:cf68ac9a-6ac0-4da2-aac7-060ee9deec65",
                        "title": {
                            "en": "Copy of PAFAA 2125 Item 2"
                        },
                        "description": {
                            "en": "undefined"
                        },
                        "type": "assessmentItem",
                        "usageType": "Plan"
                    }
                ]
            }
        ]
    },
    "contents": {
        "bodyMatter": [
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:d1544f9f-3266-4217-aab7-5f3b463aadc7",
                "contentUrn": "urn:pearson:entity:dfea6e72-b290-4acf-94a5-b6ef2e1262b7",
                "versionUrn": "urn:pearson:manifest:d1544f9f-3266-4217-aab7-5f3b463aadc7",
                "unformattedTitle": {
                    "en": "chpter5"
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "module",
                            "containerUrn": "urn:pearson:manifest:e5b5c211-e1ad-4f1a-ab94-e6d001ad16d9",
                            "contentUrn": "urn:pearson:entity:95bae58a-70d8-4017-b4bd-d89031afc935",
                            "versionUrn": "urn:pearson:manifest:e5b5c211-e1ad-4f1a-ab94-e6d001ad16d9",
                            "unformattedTitle": {
                                "en": "mod5"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:99e78628-d49e-486e-8d7c-98b79c100cb0",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:e5b5c211-e1ad-4f1a-ab94-e6d001ad16d9"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:e5b5c211-e1ad-4f1a-ab94-e6d001ad16d9 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                                "title": {
                                                    "en": "test assessment"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:f4ab674c-9015-4cba-9752-09e32b62e4f3",
                "contentUrn": "urn:pearson:entity:df477df5-78f8-4552-a372-9f954b829e96",
                "versionUrn": "urn:pearson:manifest:f4ab674c-9015-4cba-9752-09e32b62e4f3",
                "unformattedTitle": {
                    "en": "C4"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:9d738752-6f70-49ba-a482-a83278867196",
                            "title": {
                                "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:f4ab674c-9015-4cba-9752-09e32b62e4f3"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:f4ab674c-9015-4cba-9752-09e32b62e4f3 alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:821eb68c-2228-4b38-9be4-02edd732651f",
                                    "title": {
                                        "en": "Elm Assessments title is IFTPFR8G4E"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "containerUrn": "urn:pearson:manifest:eb2128cd-4348-439a-aa48-62b4877f9bfd",
                "contentUrn": "urn:pearson:entity:5d900972-d967-410a-bce5-7c4bca3fc694",
                "versionUrn": "urn:pearson:manifest:eb2128cd-4348-439a-aa48-62b4877f9bfd",
                "unformattedTitle": {
                    "en": "P2"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:94c2801b-607d-44c2-a141-07a0a8cf0d68",
                            "title": {
                                "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:eb2128cd-4348-439a-aa48-62b4877f9bfd"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:eb2128cd-4348-439a-aa48-62b4877f9bfd alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:821eb68c-2228-4b38-9be4-02edd732651f",
                                    "title": {
                                        "en": "Elm Assessments title is IFTPFR8G4E"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "containerUrn": "urn:pearson:manifest:00d0427e-e575-4132-8082-0248b7bf9991",
                "contentUrn": "urn:pearson:entity:097beb01-72a9-48f6-a445-4caf25ac7397",
                "versionUrn": "urn:pearson:manifest:00d0427e-e575-4132-8082-0248b7bf9991",
                "unformattedTitle": {
                    "en": "P3"
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "containerUrn": "urn:pearson:manifest:7e005dc7-85cb-4ebf-bce4-6355203ba569",
                            "contentUrn": "urn:pearson:entity:1e16d2e1-af94-41a8-80ce-f0e13338ff13",
                            "versionUrn": "urn:pearson:manifest:7e005dc7-85cb-4ebf-bce4-6355203ba569",
                            "unformattedTitle": {
                                "en": "C3"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:ddf8f754-f6b4-4813-8faa-f063e79da3a7",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:7e005dc7-85cb-4ebf-bce4-6355203ba569"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:7e005dc7-85cb-4ebf-bce4-6355203ba569 alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:821eb68c-2228-4b38-9be4-02edd732651f",
                                                "title": {
                                                    "en": "Elm Assessments title is IFTPFR8G4E"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "chapter",
                "containerUrn": "urn:pearson:manifest:80988f18-3326-4c0f-8b60-151d871a86d3",
                "contentUrn": "urn:pearson:entity:98f9c874-124e-43f0-b7fc-a9c3ccc58c63",
                "versionUrn": "urn:pearson:manifest:80988f18-3326-4c0f-8b60-151d871a86d3",
                "unformattedTitle": {
                    "en": "CH45"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:a47d774a-3beb-405e-9253-62faae408162",
                            "title": {
                                "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:80988f18-3326-4c0f-8b60-151d871a86d3"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:80988f18-3326-4c0f-8b60-151d871a86d3 alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                    "title": {
                                        "en": "test assessment"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "container",
                "label": "part",
                "containerUrn": "urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad",
                "contentUrn": "urn:pearson:entity:e0066675-a993-4f03-aa3c-cd5a4631da41",
                "versionUrn": "urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad",
                "unformattedTitle": {
                    "en": "Part1"
                },
                "alignments": {
                    "resourceCollections": [
                        {
                            "rcUrn": "urn:pearson:rc:47427992-02f8-4e98-8dc7-12a5c1e59447",
                            "title": {
                                "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad"
                            },
                            "description": {
                                "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:1e4ce418-4160-4d8f-bbae-7a2c814555ad alignment"
                            },
                            "resources": [
                                {
                                    "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                    "title": {
                                        "en": "test assessment"
                                    },
                                    "description": {
                                        "en": "--"
                                    },
                                    "type": "assessment",
                                    "usageType": "Plan"
                                }
                            ]
                        }
                    ]
                },
                "contents": {
                    "bodyMatter": [
                        {
                            "type": "container",
                            "label": "chapter",
                            "containerUrn": "urn:pearson:manifest:761f2d68-6a7c-41e9-8363-ca81ab926b82",
                            "contentUrn": "urn:pearson:entity:dfd414ed-6e32-4d71-90d0-231158853e45",
                            "versionUrn": "urn:pearson:manifest:761f2d68-6a7c-41e9-8363-ca81ab926b82",
                            "unformattedTitle": {
                                "en": "Chap1"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "containerUrn": "urn:pearson:manifest:823f4807-74f5-4411-b9e2-5ede994b109f",
                                        "contentUrn": "urn:pearson:entity:fc5a6d43-b861-490c-9df5-5843dd4046e4",
                                        "versionUrn": "urn:pearson:manifest:823f4807-74f5-4411-b9e2-5ede994b109f",
                                        "unformattedTitle": {
                                            "en": "Mod1"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:e0a892e9-8fd6-469f-86b8-5c0b45c17630",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:823f4807-74f5-4411-b9e2-5ede994b109f"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:823f4807-74f5-4411-b9e2-5ede994b109f alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                                            "title": {
                                                                "en": "test assessment"
                                                            },
                                                            "description": {
                                                                "en": "--"
                                                            },
                                                            "type": "assessment",
                                                            "usageType": "Plan"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "containerUrn": "urn:pearson:manifest:affc71b9-16f9-4448-9732-9610e26745cd",
                            "contentUrn": "urn:pearson:entity:551bc929-e1de-4878-b8b4-b6550a16f40c",
                            "versionUrn": "urn:pearson:manifest:affc71b9-16f9-4448-9732-9610e26745cd",
                            "unformattedTitle": {
                                "en": "Chap2"
                            },
                            "alignments": {
                                "resourceCollections": [
                                    {
                                        "rcUrn": "urn:pearson:rc:d5ebaa01-0bd5-4341-96cc-75667f50fc10",
                                        "title": {
                                            "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:affc71b9-16f9-4448-9732-9610e26745cd"
                                        },
                                        "description": {
                                            "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:affc71b9-16f9-4448-9732-9610e26745cd alignment"
                                        },
                                        "resources": [
                                            {
                                                "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                                "title": {
                                                    "en": "test assessment"
                                                },
                                                "description": {
                                                    "en": "--"
                                                },
                                                "type": "assessment",
                                                "usageType": "Plan"
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        {
                            "type": "container",
                            "label": "chapter",
                            "containerUrn": "urn:pearson:manifest:38f19555-2002-4a3c-998e-bdb91c7fe0d4",
                            "contentUrn": "urn:pearson:entity:901261b9-1f8a-4ff1-892b-624d06c7438b",
                            "versionUrn": "urn:pearson:manifest:38f19555-2002-4a3c-998e-bdb91c7fe0d4",
                            "unformattedTitle": {
                                "en": "chap3"
                            },
                            "contents": {
                                "bodyMatter": [
                                    {
                                        "type": "container",
                                        "label": "module",
                                        "containerUrn": "urn:pearson:manifest:1b050a2a-a248-45e8-b09c-167dd4c6be14",
                                        "contentUrn": "urn:pearson:entity:6d3c1207-1506-4367-a349-ec3827e0b5f3",
                                        "versionUrn": "urn:pearson:manifest:1b050a2a-a248-45e8-b09c-167dd4c6be14",
                                        "unformattedTitle": {
                                            "en": "Mod3"
                                        },
                                        "alignments": {
                                            "resourceCollections": [
                                                {
                                                    "rcUrn": "urn:pearson:rc:1cbaaaeb-21d1-4abe-a5b9-14bab87e753d",
                                                    "title": {
                                                        "en": "elm|urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e|urn:pearson:manifest:1b050a2a-a248-45e8-b09c-167dd4c6be14"
                                                    },
                                                    "description": {
                                                        "en": "Elm collection for project urn:pearson:distributable:97aec104-3c20-46c2-825b-be5c1ea9ac4e container urn:pearson:manifest:1b050a2a-a248-45e8-b09c-167dd4c6be14 alignment"
                                                    },
                                                    "resources": [
                                                        {
                                                            "urn": "urn:pearson:work:b8756ecf-2bf0-4fc6-9c23-6c1fae6a8418",
                                                            "title": {
                                                                "en": "test assessment"
                                                            },
                                                            "description": {
                                                                "en": "--"
                                                            },
                                                            "type": "assessment",
                                                            "usageType": "Plan"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}
export const sortingData = [{
        type: "container",
        urn: "urn:pearson:manifest:9a333f60-0b23-4763-9879-a02c79607714",
        title: "Chapter Alpha",
        label: "chapter"
    },
    {
        type: "container",
        urn: "urn:pearson:manifest:6dbc57f3-1210-4851-a8bf-fd6077121a42",
        title: "Part 1",
        label: "part"
    },
    {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "test execution",
        type: "assessment",
        urn: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Elm Learnosity Assessment 1 patch renamed",
        type: "assessment",
        urn: "urn:pearson:work:2eedb903-0433-4782-bfe6-8b78c834f979"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Elm Learnosity Assessment 2 patch",
        type: "assessment",
        urn: "urn:pearson:work:77af8360-f8f5-49dd-b59c-2d13dc945b8f"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Elm Learnosity Assessment 4 patch retest",
        type: "assessment",
        urn: "urn:pearson:work:f774b6a5-b234-494b-b95f-be2f78502f70"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:7f35047f-2c4a-4c87-b040-93f82ad9c3dd"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:0a3fabde-8a0f-401c-bde0-9230f46f036b"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Activity 03-June",
        type: "assessment",
        urn: "urn:pearson:work:87d664a4-fda5-4b1a-bfa6-78a47175304b"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:4cd7d2d9-d563-4104-9b0c-b88c85a4cc0a"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:097bd3ef-c109-4bcc-8d6e-df3fc730d69a"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:0c70ba5a-2f9e-44ec-95e5-a2cbcf72e6a9"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:7cb78d83-afd6-492d-be3e-d12e85591947"
    }, {
        parentUrn: undefined,
        previousUrn: "urn:pearson:distributable:2f0630e1-35eb-4fac-89b7-84f36ecce392",
        title: "Untitled",
        type: "assessment",
        urn: "urn:pearson:work:ec621d57-124a-4934-a64f-9d8f2ac77468"
    }
]
export const sortingItemData = [{
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Copy of Elm Learnosity item 1 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:3dfba269-45b2-4963-bda9-48a74ca3136f"
},
{
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "GGGG1",
    type: "assessmentItem",
    urn: "urn:pearson:work:ac578853-c6b3-440d-9bb0-8a6d975dece3"
},{
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "GGGG",
    type: "assessmentItem",
    urn: "urn:pearson:work:eb190948-b7b2-456a-a799-1accf7b31d6e"
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Elm Learnosity item 3 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:9796d139-0b5d-4aa1-a62a-67970a78ce1e"
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Copy of Elm Learnosity item 3 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:ff69f469-0159-4906-aa8f-0118ab59e8ea"
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Copy of Elm Learnosity item 1 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:cecbbc7c-3f7c-48ca-8bb4-cb7481711568",
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Elm Learnosity item 2 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:1792412f-13f6-4d2c-8836-ed893ba64017",
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "Elm Learnosity item 1 patch",
    type: "assessmentItem",
    urn: "urn:pearson:work:ef533db2-e5a7-4f20-b831-ba6aeab0abc7"
}, {
    assessmentId: "urn:pearson:work:5e2a7a5a-cfdf-47a4-9580-f6552ed137d8",
    title: "test",
    type: "assessmentItem",
    urn: "urn:pearson:work:8023cd7d-0c06-4322-af4f-d46920b54587"
}
]

export const usageTypeAPI_Data =[
    {
        "entitytype": "assessment",
        "usagetype": "conceptcheck",
        "label": {
            "en": "Concept Check"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "diagnostic",
        "label": {
            "en": "Diagnostic"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "homework",
        "label": {
            "en": "Homework"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "journal",
        "label": {
            "en": "Journal"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "non-scored",
        "label": {
            "en": "Non Scored"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "practice",
        "label": {
            "en": "Practice"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "quiz",
        "label": {
            "en": "Quiz"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "remediation",
        "label": {
            "en": "Remediation"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "sharedwriting",
        "label": {
            "en": "Shared Writing"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "studytools",
        "label": {
            "en": "Study Tools"
        }
    },
    {
        "entitytype": "assessment",
        "usagetype": "test",
        "label": {
            "en": "Test"
        }
    }
]

export const MockUsageTypeList_Data = ["Concept Check", "Diagnostic", "Homework", "Journal", "Non Scored", "Practice", "Quiz", "Remediation", "Shared Writing", "Study Tools", "Test"]