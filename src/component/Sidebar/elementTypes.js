export default {
    'element-authoredtext': {
        'primary-paragraph': {
            text: 'Paragraph',
            subtype: {
                'secondary-paragraph': {
                    text: 'Paragraph',
                    labelText: 'P'
                }
            }
        },
        'primary-heading': {
            text: 'Headings',
            subtype: {
                'secondary-heading-1': {
                    text: 'Heading 1',
                    labelText: 'H1'
                },
                'secondary-heading-2': {
                    text: 'Heading 2',
                    labelText: 'H2'
                },
                'secondary-heading-3': {
                    text: 'Heading 3',
                    labelText: 'H3'
                },
                'secondary-heading-4': {
                    text: 'Heading 4',
                    labelText: 'H4'
                },
                'secondary-heading-5': {
                    text: 'Heading 5',
                    labelText: 'H5'
                },
                'secondary-heading-6': {
                    text: 'Heading 6',
                    labelText: 'H6'
                }
            }
        },
        // 'primary-learning-objective': {
        //     text: 'Learning Objective Item',
        //     subtype: {
        //         'secondary-learning-objective': {
        //             text: 'Learning Objective',
        //             labelText: 'LO'
        //         }
        //     }
        // },
        'primary-blockquote': {
            text: 'Blockquotes',
            subtype: {
                'secondary-pullquote': {
                    text: 'Pullquote',
                    labelText: 'BQ'
                },
                'secondary-marginalia': {
                    text: 'Marginalia',
                    labelText: 'BQ'
                },
                'secondary-marginalia-attribution': {
                    text: 'Marginalia with Attribution',
                    labelText: 'BQ',
                    attributes: {
                        attribution: {
                            text: 'Attribution'
                        }
                    }
                }
            }
        },
        'primary-list': {
            text: 'List',
            subtype: {
                'secondary-list-1': {
                    text: 'Bulleted List',
                    labelText: 'UL'
                },
                'secondary-list-2': {
                    text: 'Numbered List',
                    labelText: 'OL'
                },
                'secondary-list-3': {
                    text: 'Upper Alpha List',
                    labelText: 'OL'
                },
                'secondary-list-4': {
                    text: 'Lower Alpha List',
                    labelText: 'OL'
                },
                'secondary-list-5': {
                    text: 'Upper Roman List',
                    labelText: 'OL'
                },
                'secondary-list-6': {
                    text: 'Lower Roman List',
                    labelText: 'OL'
                },
                'secondary-list-7': {
                    text: 'None List',
                    labelText: 'OL'
                }
            }
        }
    },
    'figure': {
        'primary-image-figure': {
            text: 'Figure Image',
            subtype: {
                // 'secondary-image-figure-quarter': {
                //     text: '25% Text Width',
                //     labelText: 'Fg'
                // },
                'secondary-image-figure-half': {
                    text: '50% Text Width',
                    labelText: 'Fg'
                },
                'secondary-image-figure-width': {
                    text: 'Text Width',
                    labelText: 'Fg'
                },
                'secondary-image-figure-wider': {
                    text: 'Wider Than Text',
                    labelText: 'Fg'
                },
                'secondary-image-figure-full': {
                    text: 'Full Screen',
                    labelText: 'Fg'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text'
                },
                long_description: {
                    text: 'Long Description'
                }
            }
        },
        'primary-image-table': {
            text: 'Table Image',
            subtype: {
                'secondary-image-table-half': {
                    text: '50% Text Width',
                    labelText: 'TB'
                },
                'secondary-image-table-width': {
                    text: 'Text Width',
                    labelText: 'TB'
                },
                'secondary-image-table-wider': {
                    text: 'Wider Than Text',
                    labelText: 'TB'
                },
                'secondary-image-table-full': {
                    text: 'Full Screen',
                    labelText: 'TB'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text'
                },
                long_description: {
                    text: 'Long Description'
                }
            }
        },
        'primary-image-equation': {
            text: 'Math Image',
            subtype: {
                'secondary-image-equation-half': {
                    text: '50% Text Width',
                    labelText: 'EQ'
                },
                'secondary-image-equation-width': {
                    text: 'Text Width',
                    labelText: 'EQ'
                },
                'secondary-image-equation-wider': {
                    text: 'Wider Than Text',
                    labelText: 'EQ'
                },
                'secondary-image-equation-full': {
                    text: 'Full Screen',
                    labelText: 'EQ'
                }
            },
            attributes: {
                alt_text: {
                    text: 'Alt Text'
                },
                long_description: {
                    text: 'Long Description'
                }
            }
        },
        'primary-mathml-equation': {
            text: 'Math ML / Chem Editor',
            subtype: {
                'secondary-mathml-equation': {
                    text: 'Math ML / Chem Editor',
                    labelText: 'MML'
                }
            }
        },
        'primary-blockcode-equation': {
            text: 'Block Code Editor',
            subtype: {
                'secondary-blockcode-equation': {
                    text: 'Block Code Editor',
                    labelText: 'BCE'
                }
            }
        },
        'primary-editor-table-equation': {
            text: 'Table Editor',
            subtype: {
                'secondary-editor-table-half': {
                    text: '50% Text Width',
                    labelText: 'TE'
                },
                'secondary-editor-table-width': {
                    text: 'Text Width',
                    labelText: 'TE'
                },
                'secondary-editor-table-wider': {
                    text: 'Wider Than Text',
                    labelText: 'TE'
                },
                'secondary-editor-table-full': {
                    text: 'Full Screen',
                    labelText: 'TE'
                }
            }
        }
    },
    'video-audio': {
        'primary-video': {
            text: 'Video',
            subtype: {
                'secondary-video-smartlink': {
                    text: 'SPP Video Link (sl)',
                    labelText: 'VID'
                },
                'secondary-video-alfresco': {
                    text: 'Alfresco Video Link',
                    labelText: 'VID'
                }
            }
        },
        'primary-audio': {
            text: 'Audio',
            subtype: {
                'secondary-audio-smartlink': {
                    text: 'SPP Audio Link (sl)',
                    labelText: 'AUD'
                },
                'secondary-audio-alfresco': {
                    text: 'Alfresco Audio Link',
                    labelText: 'AUD'
                }
            }
        }
    },
    'element-aside': {
        'primary-aside-lol': {
            text: 'Learning Objective List',
            subtype: {
                'secondary-aside-lol': {
                    text: 'Learning Objective List',
                    labelText: 'As'
                }
            }
        },
        'primary-aside-aside': {
            text: 'Aside',
            subtype: {
                'secondary-aside-sb1': {
                    text: 'Sidebar 01',
                    labelText: 'As'
                },
                'secondary-aside-sb2': {
                    text: 'Sidebar 02',
                    labelText: 'As'
                },
                'secondary-aside-sb3': {
                    text: 'Sidebar 03',
                    labelText: 'As'
                },
                'secondary-aside-sb4': {
                    text: 'Sidebar 04',
                    labelText: 'As'
                },
                'secondary-aside-sb5': {
                    text: 'Sidebar 05',
                    labelText: 'As'
                }
            }
        },
        'primary-aside-feature': {
            text: 'Feature',
            subtype: {
                'secondary-aside-feature': {
                    text: 'Feature',
                    labelText: 'As'
                }
            }
        },
        'primary-aside-activity': {
            text: 'Activity',
            subtype: {
                'secondary-aside-activity': {
                    text: 'Activity',
                    labelText: 'As'
                }
            }
        },
        'primary-aside-tactic': {
            text: 'Tactic Box',
            subtype: {
                'secondary-aside-tactic': {
                    text: 'Tactic Box',
                    labelText: 'As'
                }
            }
        }
    },
    'element-workedexample': {
        'primary-workedexample-we1': {
            text: 'Worked Example 1',
            subtype: {
                'secondary-workedexample-we1': {
                    text: 'Worked Example 1',
                    labelText: 'WE'
                }
            }
        },
        'primary-workedexample-we2': {
            text: 'Worked Example 2',
            subtype: {
                'secondary-workedexample-we2': {
                    text: 'Worked Example 2',
                    labelText: 'WE'
                }
            }
        }
    },
    'others': {
        'primary-mmi': {
            text: 'MMI',
            subtype: {
                'secondary-interactive-mmi': {
                    text: 'MMI'
                }
            }
        },
        'primary-smartlink': {
            text: 'Smart Link',
            subtype: {
                'secondary-interactive-smartlink-third': {
                    text: '3rd Party'
                },
                'secondary-interactive-smartlink-pdf': {
                    text: 'PDF'
                },
                'secondary-interactive-smartlink-web': {
                    text: 'External Website Link'
                },
                'secondary-interactive-smartlink-pop-up-web-link': {
                    text: 'Legacy Web Link'
                },
                'secondary-interactive-smartlink-tab': {
                    text: 'Table'
                }
            }
        },
        'primary-showhide': {
            text: 'Show Hide',
            subtype: {
                
            }
        },
        'primary-popup': {
            text: 'Pop Up Window',
            subtype: {
                
            }
        },
        'primary-single-assessment': {
            text: 'Single Assessment',
            subtype: {
                
            }
        }
    }
};