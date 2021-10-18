export default {
    'element-authoredtext': {
        'primary-paragraph': {
            text: 'Paragraph',
            enum: 'AUTHORED_TEXT',
            toolbar: ['insertMedia'],
            subtype: {
                'secondary-paragraph': {
                    text: 'Paragraph',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        'primary-handwriting': {
            text: 'Handwriting',
            enum: 'HS',
            toolbar: ['insertMedia','alignment'],
            subtype: {
                'subtype-handwriting': {
                    text: 'Handwriting',
                    labelText: 'HS',
                    enum: 'NA'
                },
            }
        },
        'primary-heading': {
            text: 'Headings',
            enum: 'HEADERS',
            toolbar: ['insertMedia','bold','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','glossary','crossLinkingIcon','assetpopover','slatetag'],//PCAT-6725 fixed
            subtype: {
                'secondary-heading-1': {
                    text: 'Heading 1',
                    labelText: 'H1',
                    enum: 'H1'
                },
                'secondary-heading-2': {
                    text: 'Heading 2',
                    labelText: 'H2',
                    enum: 'H2'
                },
                'secondary-heading-3': {
                    text: 'Heading 3',
                    labelText: 'H3',
                    enum: 'H3'
                },
                'secondary-heading-4': {
                    text: 'Heading 4',
                    labelText: 'H4',
                    enum: 'H4'
                },
                'secondary-heading-5': {
                    text: 'Heading 5',
                    labelText: 'H5',
                    enum: 'H5'
                },
                'secondary-heading-6': {
                    text: 'Heading 6',
                    labelText: 'H6',
                    enum: 'H6'
                }
            }
        },
        'primary-learning-objective': {
            text: 'Learning Objective Item',
            toolbar: ['insertMedia','bold', 'italic','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','footnote', 'glossary','crossLinkingIcon','assetpopover','alignment'],
            enum: 'LEARNING_OBJECTIVE',
            subtype: {
                'secondary-learning-objective': {
                    text: 'Learning Objective',
                    labelText: 'LO',
                    enum: 'NA',
                }
            }
        },
        'primary-blockquote': {
            text: 'Blockquotes',
            toolbar: ['insertMedia','bold','underline','strikethrough','orderedlist','unorderedlist', 'glossary','slatetag','alignment'],
            enum: 'BLOCKFEATURE',
            subtype: {
                'secondary-pullquote': {
                    text: 'Pullquote',
                    labelText: 'PQ',
                    enum: 'PULLQUOTE'
                },
                'secondary-marginalia': {
                    text: 'Marginalia',
                    labelText: 'BQ',
                    enum: 'BLOCKQUOTE'
                },
                'secondary-marginalia-attribution': {
                    text: 'Marginalia with Attribution',
                    labelText: 'BQ',
                    enum: 'MARGINALIA',
                    attributes: {
                        attribution: {
                            text: 'Attribution',
                            isEditable: true
                        }
                    }
                }
            }
        },
        'primary-list': {
            text: 'List',
            toolbar: ['formatSelector','alignment'],
            enum: 'LIST',
            subtype: {
                'secondary-list-1': {
                    text: 'Bulleted List',
                    labelText: 'UL',
                    enum: 'DISC'

                },
                'secondary-list-2': {
                    text: 'Numbered List',
                    labelText: 'OL',
                    enum: 'DECIMAL'
                },
                'secondary-list-3': {
                    text: 'Upper Alpha List',
                    labelText: 'OL',
                    enum: 'UPPER_ALPHA'
                },
                'secondary-list-4': {
                    text: 'Lower Alpha List',
                    labelText: 'OL',
                    enum: 'LOWER_ALPHA'
                },
                'secondary-list-5': {
                    text: 'Upper Roman List',
                    labelText: 'OL',
                    enum: 'UPPER_ROMAN'
                },
                'secondary-list-6': {
                    text: 'Lower Roman List',
                    labelText: 'OL',
                    enum: 'LOWER_ROMAN'
                },
                'secondary-list-7': {
                    text: 'None List',
                    labelText: 'OL',
                    enum: 'NONE'
                }
            }
        },
        enumType: 'text',
    },
    
    'figure': {
        'primary-image-figure': {
            text: 'Figure Image',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment','calloutIcon'],
            enum: 'IMAGE',
            subtype: {
                'secondary-image-figure-width': {
                    text: 'Text Width',
                    labelText: 'Fg',
                    enum: 'IMAGE_TEXT_WIDTH'
                },
                'secondary-image-figure-quarter': {
                    text: '25% Text Width',
                    labelText: 'Fg',
                    enum: 'IMAGE_25_TEXT'
                },
                'secondary-image-figure-half': {
                    text: '50% Text Width',
                    labelText: 'Fg',
                    enum: 'IMAGE_50_TEXT'
                },
                'secondary-image-figure-three-quarter': {
                    text: '75% Text Width',
                    labelText: 'Fg',
                    enum: 'IMAGE_75_TEXT'
                },               
                'secondary-image-figure-wider': {
                    text: 'Wider Than Text',
                    labelText: 'Fg',
                    enum: 'IMAGE_WIDER'
                },
                'secondary-image-figure-full': {
                    text: 'Full Screen',
                    labelText: 'Fg',
                    enum: 'IMAGE_FULL'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text',
                    isEditable: false
                },
                long_description: {
                    text: 'Long Description',
                    isEditable: false
                }
            }
        },
        'primary-image-table': {
            text: 'Table Image',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            enum: 'TABLE',
            subtype: {
                'secondary-image-table-half': {
                    text: '50% Text Width',
                    labelText: 'TB',
                    enum: 'IMAGE_50_TEXT_TABLE'
                },
                'secondary-image-table-width': {
                    text: 'Text Width',
                    labelText: 'TB',
                    enum: 'IMAGE_TEXT_WIDTH_TABLE'
                },
                'secondary-image-table-wider': {
                    text: 'Wider Than Text',
                    labelText: 'TB',
                    enum: 'IMAGE_WIDER_TABLE'
                },
                'secondary-image-table-full': {
                    text: 'Full Screen',
                    labelText: 'TB',
                    enum: 'IMAGE_FULL_TABLE'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text',
                    isEditable: false
                },
                long_description: {
                    text: 'Long Description',
                    isEditable: false
                }
            }
        },
        'primary-image-equation': {
            text: 'Math Image',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            enum: 'MATH',
            subtype: {
                'secondary-image-equation-half': {
                    text: '50% Text Width',
                    labelText: 'EQ',
                    enum: 'IMAGE_50_TEXT_MATH'
                },
                'secondary-image-equation-width': {
                    text: 'Text Width',
                    labelText: 'EQ',
                    enum: 'IMAGE_TEXT_WIDTH_MATH'
                },
                'secondary-image-equation-wider': {
                    text: 'Wider Than Text',
                    labelText: 'EQ',
                    enum: 'IMAGE_WIDER_MATH'
                },
                'secondary-image-equation-full': {
                    text: 'Full Screen',
                    labelText: 'EQ',
                    enum: 'IMAGE_FULL_MATH'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text',
                    isEditable: false
                },
                long_description: {
                    text: 'Long Description',
                    isEditable: false
                }
            }
        },
        'primary-mathml-equation': {
            text: 'Block Math',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            enum: 'MATH_ML_CHEM_EDITOR',
            subtype: {
                'secondary-mathml-equation': {
                    text: 'Math ML / Chem Editor',
                    labelText: 'MML',
                    enum: 'MATHML'
                }
            }
        },
        'primary-blockcode-equation': {
            text: 'Block Code',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            enum: 'BLOCK_CODE_EDITOR',
            subtype: {
                'secondary-blockcode-language-default': {
                    text: 'Select',
                    labelText: 'BCE',
                    enum: 'SELECT'
                },
                'secondary-blockcode-language-c++': {
                    text: 'C++',
                    labelText: 'BCE',
                    enum: 'C_PLUS'
                },
                'secondary-blockcode-language-java': {
                    text: 'Java',
                    labelText: 'BCE',
                    enum: 'JAVA'
                },
                'secondary-blockcode-language-c': {
                    text: 'C',
                    labelText: 'BCE',
                    enum: 'C'
                },
                'secondary-blockcode-language-python': {
                    text: 'Python',
                    labelText: 'BCE',
                    enum: 'PYTHON'
                },
                'secondary-blockcode-language-javascript': {
                    text: 'Javascript',
                    labelText: 'BCE',
                    enum: 'JAVA_SCRIPT'
                },
                'secondary-blockcode-language-html': {
                    text: 'HTML',
                    labelText: 'BCE',
                    enum: 'HTML'
                },
                'secondary-blockcode-language-css': {
                    text: 'CSS',
                    labelText: 'BCE',
                    enum: 'CSS'
                },
                'secondary-blockcode-language-apache': {
                    text: 'Apache',
                    labelText: 'BCE',
                    enum: 'APACHE'
                },
                'secondary-blockcode-language-c#': {
                    text: 'C#',
                    labelText: 'BCE',
                    enum: 'C_SHARP'
                },
                'secondary-blockcode-language-json': {
                    text: 'JSON',
                    labelText: 'BCE',
                    enum: 'JSON'
                },
                'secondary-blockcode-language-makefile': {
                    text: 'Makefile',
                    labelText: 'BCE',
                    enum: 'MAKE_FILE'
                },
                'secondary-blockcode-language-kotlin': {
                    text: 'Kotlin',
                    labelText: 'BCE',
                    enum: 'KOTLIN'
                },
                'secondary-blockcode-language-r': {
                    text: 'R',
                    labelText: 'BCE',
                    enum: 'R'
                },
                'secondary-blockcode-language-perl': {
                    text: 'Perl',
                    labelText: 'BCE',
                    enum: 'PERL'
                },
                'secondary-blockcode-language-php': {
                    text: 'PHP',
                    labelText: 'BCE',
                    enum: 'PHP'
                },
                'secondary-blockcode-language-go': {
                    text: 'GO',
                    labelText: 'BCE',
                    enum: 'GO'
                },
                'secondary-blockcode-language-ruby': {
                    text: 'Ruby',
                    labelText: 'BCE',
                    enum: 'RUBY'
                },
                'secondary-blockcode-language-lisp': {
                    text: 'Lisp',
                    labelText: 'BCE',
                    enum: 'LISP'
                },
                'secondary-blockcode-language-objective_c': {
                    text: 'Objective C',
                    labelText: 'BCE',
                    enum: 'OBJECTIVE_C'
                },
                'secondary-blockcode-language-scala': {
                    text: 'Scala',
                    labelText: 'BCE',
                    enum: 'SCALA'
                },
                'secondary-blockcode-language-shell_session': {
                    text: 'Shell Session',
                    labelText: 'BCE',
                    enum: 'SHELL_SESSION'
                },
                'secondary-blockcode-language-sql': {
                    text: 'SQL',
                    labelText: 'BCE',
                    enum: 'SQL'
                },
                'secondary-blockcode-language-swift': {
                    text: 'Swift',
                    labelText: 'BCE',
                    enum: 'SWIFT'
                },
                'secondary-blockcode-language-xml': {
                    text: 'XML',
                    labelText: 'BCE',
                    enum: 'XML'
                },
                'secondary-blockcode-language-matlab': {
                    text: 'Matlab',
                    labelText: 'BCE',
                    enum: 'MATLAB'
                },
                'secondary-blockcode-language-glsl': {
                    text: 'GLSL',
                    labelText: 'BCE',
                    enum: 'GLSL'
                },
                'secondary-blockcode-language-sml': {
                    text: 'SML',
                    labelText: 'BCE',
                    enum: 'SML'
                },
                'secondary-blockcode-language-verilog': {
                    text: 'Verilog',
                    labelText: 'BCE',
                    enum: 'VERILOG'
                }
            }
        },
        'primary-editor-table-equation': {
            text: 'Table Editor',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            enum: 'TABLE_EDITOR',
            subtype: {
                'secondary-editor-table-equation': {
                    text: 'Table Editor',
                    labelText: 'TE',
                    enum: 'IMAGE_TEXT_WIDTH_TABLE_EDITOR'
                }
            }
        },
        enumType: 'image',
    },
    'video-audio': {
        'primary-video': {
            text: 'Video',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon'],
            enum: 'VIDEO',
            subtype: {
                'secondary-video-smartlink': {
                    text: 'SPP Video Link (sl)',
                    labelText: 'VID',
                    enum: 'EXTERNAL_LINK',
                    wipValue : 'externallink'
                }
            }
        },
        'primary-audio': {
            text: 'Audio',
            toolbar: ['insertMedia','formatSelector', 'crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon'],
            enum: 'AUDIO',
            subtype: {
                'secondary-audio-smartlink': {
                    text: 'SPP Audio Link (sl)',
                    labelText: 'AUD',
                    enum: 'EXTERNAL_LINK',
                    wipValue : 'externallink'
                }
            }
        },
        enumType: 'audiovideo',
    },
    'manifestlist': {
        'primary-column-1': {
            text: '1-Column View',
            enum: 'COLUMN_VIEW_1',
            toolbar: ['insertMedia'],
            subtype: {
                'secondary-column-1': {
                    text: '1-Column View',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        'primary-column-2': {
            text: '2-Column View',
            enum: 'COLUMN_VIEW_2',
            toolbar: ['insertMedia'],
            subtype: {
                'secondary-column-2': {
                    text: '2-Column View',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        'primary-column-3': {
            text: '3-Column View',
            enum: 'COLUMN_VIEW_3',
            toolbar: ['insertMedia'],
            subtype: {
                'secondary-column-3': {
                    text: '3-Column View',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        'primary-column-4': {
            text: '4-Column View',
            enum: 'COLUMN_VIEW_4',
            toolbar: ['insertMedia'],
            subtype: {
                'secondary-column-4': {
                    text: '4-Column View',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        enumType: 'blocklist',
    },
    'element-aside': {
        'primary-aside-aside': {
            text: 'Aside',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'ASIDE',
            subtype: {
                'secondary-aside-sb1': {
                    text: 'Sidebar 01',
                    labelText: 'As',
                    enum: 'SIDEBAR_01'
                },
                'secondary-aside-sb2': {
                    text: 'Sidebar 02',
                    labelText: 'As',
                    enum: 'SIDEBAR_02'
                },
                'secondary-aside-sb3': {
                    text: 'Sidebar 03',
                    labelText: 'As',
                    enum: 'SIDEBAR_03'
                },
                'secondary-aside-sb4': {
                    text: 'Sidebar 04',
                    labelText: 'As',
                    enum: 'SIDEBAR_04'
                },
                'secondary-aside-sb5': {
                    text: 'Sidebar 05',
                    labelText: 'As',
                    enum: 'SIDEBAR_05'
                }
            }
        },
        'primary-aside-feature': {
            text: 'Feature',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'FEATURE',
            subtype: {
                'secondary-aside-feature': {
                    text: 'Feature',
                    labelText: 'As',
                    enum: 'NA'
                }
            }
        },
        'primary-aside-activity': {
            text: 'Activity',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'ACTIVITY',
            subtype: {
                'secondary-aside-activity': {
                    text: 'Activity',
                    labelText: 'As',
                    enum: 'NA'
                }
            }
        },
        'primary-aside-tactic': {
            text: 'Tactic Box',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'TACTIC_BOX',
            subtype: {
                'secondary-aside-tactic': {
                    text: 'Tactic Box',
                    labelText: 'As',
                    enum: 'NA'
                }
            }
        },
        'primary-aside-lol': {
            text: 'Learning Objective List',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'LEARNING_OBJECTIVE_LIST',
            subtype: {
                'secondary-aside-lol': {
                    text: 'Learning Objective List',
                    labelText: 'As',
                    enum: 'NA',
                }
            }
        },
        enumType: 'container',
    },
    'element-workedexample': {
        'primary-workedexample-we1': {
            text: 'Worked Example 1',
            toolbar:['insertMedia','formatSelector','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'WORKED_EXAMPLE',
            subtype: {
                'secondary-workedexample-we1': {
                    text: 'Worked Example 1',
                    labelText: 'WE',
                    enum: 'WORK_EXAMPLE_1'
                }
            }
        },
        'primary-workedexample-we2': {
            text: 'Worked Example 2',
            toolbar:['insertMedia','formatSelector', 'bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'WORKED_EXAMPLE',
            subtype: {
                'secondary-workedexample-we2': {
                    text: 'Worked Example 2',
                    labelText: 'WE',
                    enum: 'WORK_EXAMPLE_2'
                }
            }
        },
        enumType: 'workedexample'
    },
	'element-assessment': {		
        'primary-single-assessment': {		
            text: 'Single Assessment',
            toolbar:['insertMedia','bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','crossLinkingIcon','assetpopover','slatetag','alignment', 'calloutIcon'],
            enum: 'SINGLE_ASSESSMENT',		
            subtype: {	
                'secondary-single-assessment-puf': {
                    text: 'Elm',
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_PUF'
                },	
                'secondary-single-assessment-cite': {
                    text: 'QuAD CITE',
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_CITE'
                },
                'secondary-single-assessment-tdx': {
                    text: 'TDX',
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_TDX'
                },
                
                'secondary-single-assessment-learnosity': {
                    text: 'Learnosity',
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_LEARNOSITY'
                }
            }		
        },
        'primary-assessment-slate' : {
            text: 'Assessment Slate',
            enum: '',		
            subtype: {		
                'secondary-assessment-puf' : {
                    text: 'ELM',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'	
                },
                'secondary-assessment-cite': {		
                    text: 'QuAd CITE',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'
                },		
                'secondary-assessment-tdx': {		
                    text: 'TDX',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'		
                },
                
                'secondary-assessment-learnosity' : {
                    text: 'LEARNOSITY',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'	
                },
                'secondary-assessment-learningtemplate' : {
                    text: 'LEARNING TEMPLATE',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'	
                }			
            }
        },
        enumType: 'assessment',		
    },
     'element-interactive': {
        'primary-elm-interactive': {
            text: 'Elm Interactive',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon'],
            enum: 'MMI_ELM',
            subtype: {
                'secondary-elm-interactive': {
                    text: 'Elm Interactive',
                    labelText: 'ELM',
                    enum: 'FLASHCARDS',
                    wipValue: 'fpo'
                }
            }
        },
        'primary-mmi': {
            text: 'Quad Interactive',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon'],
            enum: 'MMI',
            subtype: {
                'secondary-interactive-mmi': {
                    text: 'Quad',
                    labelText: 'QUAD',
                    enum: 'FLASHCARDS',
                    wipValue: 'fpo'
                }
            }
        },
        'primary-smartlink': {
            text: 'Smart Link',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover', 'glossary','alignment', 'calloutIcon'],
            enum: 'EXTERNAL_LINK',
            subtype: {
                'secondary-interactive-smartlink-third': {
                    text: '3rd Party',
                    labelText: 'SL',
                    enum: 'THIRD_PARTY',
                    wipValue: '3rd-party',
                    attributes: {
                        alt_text: {
                            text: 'Alt Text',
                            isEditable: false
                        },
                        long_description: {
                            text: 'Long Description',
                            isEditable: false
                        }            
                    }
                },
                'secondary-interactive-smartlink-pdf': {
                    text: 'PDF',
                    labelText: 'SL',
                    enum: 'PDF',
                    wipValue: 'pdf'
                },
                'secondary-interactive-smartlink-web': {
                    text: 'External Website Link',
                    labelText: 'SL',
                    enum: 'WEB_LINK',
                    wipValue: 'web-link',
                    attributes: {
                        long_description: {
                            text: 'Long Description',
                            isEditable: false
                        } 
                    }
                },
                'secondary-interactive-smartlink-pop-up-web-link': {
                    text: 'Legacy Web Link',
                    labelText: 'SL',
                    enum: 'POPUP_WEBLINK',
                    wipValue: 'pop-up-web-link'
                },
                'secondary-interactive-smartlink-tab': {
                    text: 'Table',
                    labelText: 'SL',
                    enum: 'TABLE',
                    wipValue: 'table'
                }
            }
        },
        enumType: 'interactive'
    },
    "popup": {
        "primary-popup": {
            text: 'Pop up window',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon', 'assetpopover','glossary', 'orderedlist', 'unorderedlist','decreaseindent','alignment', 'calloutIcon'],
            dropdownDisabled: true,
            enum:'POP_UP',
            subtype: {
                'secondary-popup': {
                    text: 'Pop up window',
                    labelText: 'Pop',
                    enum : "NA"
                }
            }
        } 
    },
    "showhide": {
        "primary-showhide": {
            text: 'Show Hide',
            dropdownDisabled: true,
            enum:'SHOW_HIDE',
            subtype: {
                'secondary-showhide': {
                    text: 'Show Hide',
                    labelText: 'SH',
                    enum : "NA"
                }
            }
        } 
    },
    "openerelement": {
        "primary-openerelement": {
            text: 'Opener Element',
            enum: 'openerelement',
            dropdownDisabled: true,
            subtype: {
                'secondary-openerelement': {
                    text: 'Opener Element',
                    labelText: 'OE',
                    enum: 'openerelement',
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text',
                    isEditable: false
                },
                long_description: {
                    text: 'Long Description',
                    isEditable: false
                }
            }
        } 
    },
    'citations' : {
        'primary-citations-group': {
            text: 'Citation Group',
            enum: 'CITATION',
            toolbar: ['insertMedia','formatSelector','footnote', 'increaseindent', 'decreaseindent', 'glossary', 'crossLinkingIcon', 'assetpopover', 'orderedlist', 'unorderedlist','alignment', 'calloutIcon'],
            subtype: {
                'secondary-citations-group': {
                    text: 'Citation Group',
                    labelText: 'CG',
                    enum: 'NA',
                }
            }
        }
    },
    'element-citation' : {
        'primary-element-citation': {
            text: 'Citation',
            enum: 'ELEMENT_CITATION',
            toolbar: ['insertMedia','formatSelector','footnote', 'increaseindent', 'decreaseindent', 'glossary', 'crossLinkingIcon', 'assetpopover', 'orderedlist', 'unorderedlist','alignment', 'calloutIcon'],
            subtype: {
                'secondary-element-citation': {
                    text: 'Citation element',
                    labelText: 'CT',
                    enum: 'NA',
                }
            }
        }
    },   
    "poetry" : {
        "primary-poetry": {
            text: 'Block Poetry',
            enum: 'POETRY',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary', 'orderedlist', 'unorderedlist','decreaseindent','alignment', 'calloutIcon'],
            dropdownDisabled: true,
            subtype: {
                'secondary-poetry': {
                    text: 'Poetry Editor',
                    labelText: 'PE',
                    enum: 'NA',
                }
            }
        } 
    },
    "stanza" : {
        "primary-stanza": {
            text: 'Stanza',
            enum: 'STANZA',
            toolbar: ['insertMedia','orderedlist', 'unorderedlist','alignment', 'calloutIcon'],
            dropdownDisabled: true,
            subtype: {
                'secondary-stanza': {
                    text: 'Stanza',
                    labelText: 'PE',
                    enum: 'NA',
                }
            }
        } 
    },
    'groupedcontent': {		
        'primary-multicolumn': {		
            text: '2 Column',
            toolbar: [],
            enum: 'MULTI_COLUMN',		
            subtype: {		
                'secondary-multicolumn-wider': {
                    text: 'Wider than text width 60/40%',
                    labelText: '2C',
                    enum: 'WIDER_60_40'
                },
                'secondary-multicolumn-half': {
                    text: 'Wider than text width 50/50%',
                    labelText: '2C',
                    enum: 'WIDER_50_50'
                },
                'secondary-multicolumn-wider-text': {
                    text: 'Text width 60/40%',
                    labelText: '2C',
                    enum: 'TEXT_WIDTH_60_40'
                },
                'secondary-multicolumn-half-text': {
                    text: 'Text width 50/50%',
                    labelText: '2C',
                    enum: 'TEXT_WIDTH_50_50'
                }
            }		
        },
        'primary-multicolumn-3c': {		
            text: '3 Column',
            toolbar: [],
            enum: 'MULTI_COLUMN',		
            subtype: {		
                'secondary-multicolumn-3c-wider': {
                    text: 'Wider than text width 33/33/33%',
                    labelText: '3C',
                    enum: 'WIDER_33_33_33'
                }
            }		
        },
        enumType: 'multicolumn'		
    },
    "element-dialogue" : {
        "primary-element-dialogue": {
            text: 'Block Element Dialogue',
            enum: 'ELEMENT_DIALOGUE',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            dropdownDisabled: true,
            subtype: {
                'secondary-element-dialogue': {
                    text: 'Element Dialogue Editor',
                    labelText: 'PS',
                    enum: 'NA',
                }
            }
        } 
    },
    "discussion" : {
        "primary-element-discussion": {
            enum: 'DISCUSSION',
            toolbar: ['insertMedia','formatSelector','crossLinkingIcon','assetpopover','glossary','decreaseindent','alignment', 'calloutIcon'],
            dropdownDisabled: true,
            subtype: {
                'secondary-element-discussion': {
                    text: 'Element Dialogue Editor',
                    labelText: 'PS',
                    enum: 'NA',
                }
            }
        } 
    }, 
};