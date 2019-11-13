export default {
    'element-authoredtext': {
        'primary-paragraph': {
            text: 'Paragraph',
            enum: 'AUTHORED_TEXT',
            toolbar: [],
            subtype: {
                'secondary-paragraph': {
                    text: 'Paragraph',
                    labelText: 'P',
                    enum: 'NA',
                }
            }
        },
        'primary-heading': {
            text: 'Headings',
            enum: 'HEADERS',
            toolbar: ['bold','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','glossary','assetpopover','slatetag','redo'],
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
            toolbar: ['bold', 'italic','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent','footnote', 'glossary','assetpopover'],
            subtype: {
                'secondary-learning-objective': {
                    text: 'Learning Objective',
                    labelText: 'LO',
                    enum: 'H1',
                }
            }
        },
        'primary-blockquote': {
            text: 'Blockquotes',
            toolbar: ['bold','underline','strikethrough','orderedlist','unorderedlist','increaseindent','decreaseindent', 'glossary','slatetag'],
            enum: 'BLOCKFEATURE',
            subtype: {
                'secondary-pullquote': {
                    text: 'Pullquote',
                    labelText: 'BQ',
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
            toolbar: [],
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
            toolbar: ['assetpopover','decreaseindent'],
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
            toolbar: ['assetpopover','decreaseindent'],
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
            toolbar: ['assetpopover','decreaseindent'],
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
            text: 'Math ML / Chem Editor',
            toolbar: ['assetpopover','decreaseindent'],
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
            text: 'Block Code Editor',
            toolbar: ['assetpopover','decreaseindent'],
            enum: 'BLOCK_CODE_EDITOR',
            subtype: {
                'secondary-blockcode-language-Default': {
                    text: 'Select',
                    labelText: 'BCE',
                    enum: 'SELECT'
                },
                'secondary-blockcode-language-C++': {
                    text: 'C++',
                    labelText: 'BCE',
                    enum: 'C_PLUS'
                },
                'secondary-blockcode-language-Java': {
                    text: 'Java',
                    labelText: 'BCE',
                    enum: 'JAVA'
                },
                'secondary-blockcode-language-C': {
                    text: 'C',
                    labelText: 'BCE',
                    enum: 'C'
                },
                'secondary-blockcode-language-Python': {
                    text: 'Python',
                    labelText: 'BCE',
                    enum: 'PYTHON'
                },
                'secondary-blockcode-language-Javascript': {
                    text: 'Javascript',
                    labelText: 'BCE',
                    enum: 'JAVA_SCRIPT'
                },
                'secondary-blockcode-language-HTML': {
                    text: 'HTML',
                    labelText: 'BCE',
                    enum: 'HTML'
                },
                'secondary-blockcode-language-CSS': {
                    text: 'CSS',
                    labelText: 'BCE',
                    enum: 'CSS'
                },
                'secondary-blockcode-language-Apache': {
                    text: 'Apache',
                    labelText: 'BCE',
                    enum: 'APACHE'
                },
                'secondary-blockcode-language-C#': {
                    text: 'C#',
                    labelText: 'BCE',
                    enum: 'C_SHARP'
                },
                'secondary-blockcode-language-JSON': {
                    text: 'JSON',
                    labelText: 'BCE',
                    enum: 'JSON'
                },
                'secondary-blockcode-language-Makefile': {
                    text: 'Makefile',
                    labelText: 'BCE',
                    enum: 'MAKE_FILE'
                },
                'secondary-blockcode-language-Kotlin': {
                    text: 'Kotlin',
                    labelText: 'BCE',
                    enum: 'KOTLIN'
                },
                'secondary-blockcode-language-R': {
                    text: 'R',
                    labelText: 'BCE',
                    enum: 'R'
                },
                'secondary-blockcode-language-Perl': {
                    text: 'Perl',
                    labelText: 'BCE',
                    enum: 'PERL'
                },
                'secondary-blockcode-language-PHP': {
                    text: 'PHP',
                    labelText: 'BCE',
                    enum: 'PHP'
                },
                'secondary-blockcode-language-GO': {
                    text: 'GO',
                    labelText: 'BCE',
                    enum: 'GO'
                },
                'secondary-blockcode-language-Ruby': {
                    text: 'Ruby',
                    labelText: 'BCE',
                    enum: 'RUBY'
                },
                'secondary-blockcode-language-Lisp': {
                    text: 'Lisp',
                    labelText: 'BCE',
                    enum: 'LISP'
                },
                'secondary-blockcode-language-Objective_C': {
                    text: 'Objective C',
                    labelText: 'BCE',
                    enum: 'OBJECTIVE_C'
                },
                'secondary-blockcode-language-Scala': {
                    text: 'Scala',
                    labelText: 'BCE',
                    enum: 'SCALA'
                },
                'secondary-blockcode-language-Shell_Session': {
                    text: 'Shell Session',
                    labelText: 'BCE',
                    enum: 'SHELL_SESSION'
                },
                'secondary-blockcode-language-SQL': {
                    text: 'SQL',
                    labelText: 'BCE',
                    enum: 'SQL'
                },
                'secondary-blockcode-language-Swift': {
                    text: 'Swift',
                    labelText: 'BCE',
                    enum: 'SWIFT'
                },
                'secondary-blockcode-language-XML': {
                    text: 'XML',
                    labelText: 'BCE',
                    enum: 'XML'
                },
                'secondary-blockcode-language-Matlab': {
                    text: 'Matlab',
                    labelText: 'BCE',
                    enum: 'MATLAB'
                },
                'secondary-blockcode-language-GLSL': {
                    text: 'GLSL',
                    labelText: 'BCE',
                    enum: 'GLSL'
                },
                'secondary-blockcode-language-SML': {
                    text: 'SML',
                    labelText: 'BCE',
                    enum: 'SML'
                },
            }
        },
        'primary-editor-table-equation': {
            text: 'Table Editor',
            toolbar: ['assetpopover','decreaseindent'],
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
            toolbar: ['assetpopover'],
            enum: 'VIDEO',
            subtype: {
                'secondary-video-smartlink': {
                    text: 'SPP Video Link (sl)',
                    labelText: 'VID',
                    enum: 'EXTERNAL_LINK',
                    wipValue : 'externallink'
                },
                'secondary-video-alfresco': {
                    text: 'Alfresco Video Link',
                    labelText: 'VID',
                    enum: 'INTERNAL_LINK',
                    wipValue:'internal'
                }
            }
        },
        'primary-audio': {
            text: 'Audio',
            toolbar: ['assetpopover'],
            enum: 'AUDIO',
            subtype: {
                'secondary-audio-smartlink': {
                    text: 'SPP Audio Link (sl)',
                    labelText: 'AUD',
                    enum: 'EXTERNAL_LINK',
                    wipValue : 'externallink'
                },
                'secondary-audio-alfresco': {
                    text: 'Alfresco Audio Link',
                    labelText: 'AUD',
                    enum: 'INTERNAL_LINK',
                    wipValue:'internal'
                }
            }
        },
        enumType: 'audiovideo',
    },
    'element-aside': {
        'primary-aside-aside': {
            text: 'Aside',
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
            enum: 'LEARNING_OBJECTIVE_LIST',
            subtype: {
                'secondary-aside-lol': {
                    text: 'Learning Objective List',
                    labelText: 'As',
                    enum: 'NA',
                }
            }
        },
        'primary-aside-showhide': {
            text: 'Show Hide',
            toolbar: ['assetpopover'],
            enum: 'MMI',
            subtype: {
                'secondary-aside-showhide': {
                    text: 'Show Hide',
                    labelText: 'SH',
                    enum: 'SHOWHIDE',
                    wipValue: 'showhide'
                }
            }
        },
        'primary-aside-popup': {
            text: 'Pop Up',
            toolbar: ['assetpopover'],
            enum: 'NARRATIVE_LINK',
            subtype: {
                'secondary-aside-popup': {
                    text: 'Pop Up',
                    labelText: 'Pop',
                    enum: 'POPUP',
                    wipValue: 'popup'
                }
            }
        },
        enumType: 'container',
    },
    'element-workedexample': {
        'primary-workedexample-we1': {
            text: 'Worked Example 1',
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
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
            toolbar:['bold','italic','underline','strikethrough','clearformatting','increaseindent','decreaseindent','footnote','glossary','orderedlist','unorderedlist','mathml','chemml','inlinecode','superscript','subscript','specialcharactor','undo','redo','assetpopover','slatetag'],
            enum: '',		
            subtype: {		
                'secondary-single-assessment-cite': {		
                    text: 'CITE',		
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_CITE'
                },		
                'secondary-single-assessment-tdx': {		
                    text: 'TDX',		
                    labelText: 'Qu',
                    enum: 'SINGLE_ASSESSMENT_TDX'		
                }		
            }		
        },
        'primary-assessment-slate' : {
            text: 'Single Assessment',
            enum: '',		
            subtype: {		
                'secondary-assessment-cite': {		
                    text: 'CITE',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'
                },		
                'secondary-assessment-tdx': {		
                    text: 'TDX',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'		
                },
                'secondary-assessment-puf' : {
                    text: 'PUF',		
                    labelText: 'As',
                    enum: 'ELEMENT_ASSESSMENT'	
                }	
            }
        },
        enumType: 'assessment',		
    },
    'element-interactive': {
        'primary-mmi': {
            text: 'MMI',
            toolbar: ['assetpopover'],
            enum: 'MMI',
            subtype: {
                'secondary-interactive-mmi': {
                    text: 'MMI',
                    labelText: 'MMI',
                    enum: 'FLASHCARDS',
                    wipValue: 'fpo'
                }
            }
        },
        'primary-smartlink': {
            text: 'Smart Link',
            toolbar: ['assetpopover'],
            enum: 'EXTERNAL_LINK',
            subtype: {
                'secondary-interactive-smartlink-third': {
                    text: '3rd Party',
                    labelText: 'SL',
                    enum: 'THIRD_PARTY',
                    wipValue: '3rd-party'
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
                    wipValue: 'web-link'
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
    }
};