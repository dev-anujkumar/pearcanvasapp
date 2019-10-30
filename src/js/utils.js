var _ = require("lodash");
const uuidV4 = require("uuid/v4");
//import findAndReplaceDOMText from "./findAndReplaceDOMText"

export const utils= {

    keyObjectsToList(object) {
        object.users = [];
        const patt = new RegExp("user_");
        _.forEach(object, (item, key) => {
            if (patt.test(key)) {
                object.users.push({
                    userId: key.replace(/user_/g,""),
                    role: item
                })
            }
        });
        return _.pick(object,["name","id","users"]) ;
    },
    
    buildProjectList(projectList) {
        let newProjectList = [];
        _.map(projectList, (project) => {
            if (project && project.id.includes !== 'KEY is null from Redis') {
                let newProject = {
                    id: project.id,
                    book_title: project.book_title,
                    cite_urn: project.cite_urn,
                    project_urn: project.project_urn,
                    entity_urn: project.entity_urn,
                    name: project.name,
                    users: utils.filteredKeys(project,/user_/),
                    wip_service: project.wip_service,
                    versions: project.versions
                };
                newProjectList.push(newProject)
            }
        });
        return newProjectList;
    },
    buildProjectData(project, users) {
        _.forEach(project.users, (user) => {

            user.info = _.find(users, (userData) => userData.id === user.userId);
            user.info = _.omit(user.info,['role']);
        });
        return _.pick(project, ["id", "name", "users"]);
    },
    checkRole(roleList, currentRole) {
        return _.find(roleList,(role) => role.roleName === currentRole);
    },
    buildPermissions(customRoles, defaultRoles) {
        if(customRoles){
            let customRole;
            _.forEach(customRoles,(item) => {
                customRole = {
                    name: item.customRole.role,
                    label: item.customRole.role,
                    permissions: item.customRole.permissions
                };
                defaultRoles.push(customRole)
            });
            return defaultRoles;
        } else {
            return defaultRoles;
        }
    },
    mapProjects(projectList){
        let newProjectList = [];
        _.mapKeys(projectList, (value, key) => {
            newProjectList.push({ projectId : key.replace(/\S*_/g,"") });
        });
        return newProjectList;
    },
    filteredKeys(obj, filter) {
        var key, keys = [];
        for (key in obj) {
            if (obj.hasOwnProperty(key) && filter.test(key)) {
                keys.push(key);
            }
        }
        return _.size(keys);
    },
    buildEnums(enumList) {
        let enums = {};
        _.forEach(enumList, (item) => {
            let enumItem ={};
            if (item.data) {
                _.mapKeys(item.data, (value, key) => {
                    item.data[key] = {
                        label: value,
                        name: key
                    };
                    return item.data
                });
                enumItem = item.data;
            }
            enums[item.parent] = enumItem;
        });
        return enums;
    },
    getRole(role) {
        const roles = {
            StructuredContentAdmin: "admin",
            StructuredContentEditor: "default_user"
        };
        return roles[role];
    },
    handleUserInfo(user) {
        return {
            id: uuidV4(),
            pearsonRole: user.role,
            username: user.username,
            email : _.first(user.mail),
            firstName: _.first(user.name),
            role: utils.getRole(user.role),
            lastName: _.first(user.givenName),
            usernameIndex : user.username.toLowerCase(),
            fullName: `${_.first(user.givenName)}${_.first(user.givenName)}`.toLowerCase()
        }
    },
    buildLogMessage(log){
      return {
          'user-agent':log.headers['user-agent'],
          'url': log.url,
          'method': log.method,
          'ip':log.connection.remoteAddress
      }
    },

    processText(matchList,query){
        _.forEach(matchList, (item) => {
            item.excerpt = item.text.match(/[^\.!\?]+/g);
            let matchedSentence = utils.getSentence(item.excerpt, query);
            item.sentence = matchedSentence.sentence ? matchedSentence.sentence : item.text.replace(/<(.*?)>/g, "");
            item.sentenceIndex = matchedSentence.index;
            item.replaced = item.replaced || false;
            item.previousElement = $(item.element)[0].firstChild.localName || "p";
            item.previousClass = item.element.children[0].className || "";

            item.instances = 0;

            let slate_container = null;
            let itemText = $(`.composite-artboard`);

            itemText.each((index, element)  => {
       
                let currentElement = $(element)[0];
                let foundElement = $(currentElement).find(`[data-id='${item.urn}']`);
                if ($(foundElement)['length'] > 0 ) {

                    let currentUrn;
                    let parentDiv = $(foundElement[0]).parents('div[class^="composite-artboard"]');
                    currentUrn = parentDiv.attr("data-id");
                    let titleHolder = $('div').find(`[data-id='${currentUrn}']`);
                    let header = $(titleHolder)[0].firstChild;

                    if( $(header).find('.input-text .txt-input')[0]) {
                      slate_container = $(header).find('.input-text .txt-input')[0].value;
                      item.titleUrn = slate_container
                    } else {
                        item.titleUrn = null;
                    }
                    item.parent_urn = currentUrn;
                }

            });

            item.sentence = _.truncate(item.sentence.replace(/&nbsp;/g," "),{ length: 200 });
            item.slate_container = item.titleUrn;
        });

        utils.getDuplicatedInstances(matchList);

        return matchList;
    },
    getDuplicatedInstances(matchList) {
        let dupes = [];

        _.forEach(matchList, (item) => {

            let T = new utils.SuffixTree(item.sentence);
            let h = function(s, c) {
                return c;
            };
            //NEED TO CALL INNER METHOD TO GET # OF SEARCHED WORD INSTANCES
            let dups = T.duplicates(h);

            dupes.push({ suffix: T, instances: T.dups[0] ? !_.isUndefined(T.dups[0]) ? { count: T.dups[0]['count'], word: T.dups[0]['s'], matches: []} : { count: 0 } : { count: 1 } , index: item.index});

            let hasInstances = _.find(dupes, (duplicatedWord) => duplicatedWord.index === item.index);

            item.instances =  !_.isUndefined(hasInstances) ? !_.isUndefined(hasInstances) ? hasInstances.instances : 1 : 0;

            item.suffix = hasInstances.suffix;

            if (_.isArray(item.instances.matches)) {
                item.instances.matches.push({
                    replaced: false,
                    index: 1,
                    word: hasInstances.instances.word
                });
                _.map(hasInstances.suffix.dups, (match) => {
                    item.instances.matches.push({
                        replaced: false,
                        index: match.depth + 1,
                        word: match.s
                    })
                });
            }
        });

        return matchList;
    },
    SuffixTree(text) {
        let regex = /\b\w+/g;
        let words = text.match(regex);
        let wave = [];
        let words_l = words.length;
        if (words_l == 0) return false;
        this.tree = this.node("", false);
        for (var i = 0; i < words_l; ++i) {
            let x = words[i] + "_";
            wave.push(this.tree);
            let wave_l = wave.length;
            for (var j = 0; j < wave_l; ++j) {
                var y = wave[j];
                if (typeof y[x] != 'undefined') y[x].count++;
                else y[x] = this.node(words[i], y);
                wave[j] = y[x];
            }
        }
    },

    getSentence(sentences,query) {
        for(var i = 0; i < sentences.length;i++){
            if(sentences[i].indexOf(query) !== -1)
                return {
                    sentence: `${sentences[i].replace(/^\s+|\s+$/g,"").replace(/<(.*?)>/g,"").replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi,'')}`,
                    index: i
                };
        }
        return -1;
    },
    processReplace(index, targetToReplace, query, replaceValue){
        let element = $(`#replacer-editor-${index}`);

        if (element) {
            let currentElement = _.first($(element));
            $(currentElement).text(function () {
                let text = $(this).html();
                text = text.replace(query, replaceValue);
                targetToReplace.text = text;
            });
            targetToReplace.replaced = false;

            return targetToReplace;
        } else {
            return false;
        }
    },
    getOffset(container, currentElement) {
        $(container).height();
        let coordinate = currentElement.offset().top - $(document).scrollTop() - 70;

        if (coordinate < 0) {
            coordinate = coordinate * -1
        }
        return coordinate;
    },
    savePreviousData(targetToReplace, value, query, index) {
        let previousData = {
            targetToReplace: targetToReplace,
            value: value,
            query: query,
            index: index
        };

        return previousData;
    },
    setTemporaryReplace(targetToReplace, value, query, index, isMatchingCase){
        let element = $(`#replacer-editor-${index}`);

        if (element) {
            let regex = RegExp(query, 'gi');
            findAndReplaceDOMText(document.getElementById(`replacer-editor-${index}`), {
                find: isMatchingCase ? query : regex,
                replace: query,
                wrap: 'span',
                wrapClass: 'highlight-match'
            });
            utils.savePreviousData(targetToReplace, value, query, index)
        }
    },
    setVisualReplace(currentIndex, text, isFullyReplaced,previousClass){
        let element = $(`#replacer-editor-${currentIndex}`);

        if (element) {

            $(element).html(text);

             if(previousClass){
                _.delay(() => {
                    $(`#replacer-editor-${currentIndex} p`).addClass(previousClass);
                }, 10)
             }

            if (isFullyReplaced) {
                $(element).removeAttr("id");
                $(element).removeAttr("replacer-editor");
            }

            //REMOVE HIGHLIGHTED ITEMS CLASS WITH DELAY
            _.delay(() => {
                $(element).find('span.highlight-match').each(() => {
                    $(this).removeClass("highlight-match")
                });

                $(element).each((index, el) => {
                    $(el).find('span.highlight-match').removeClass("highlight-match")
                });
            }, 10)

        }
    },
    addPreviousClass(replacedValue, element, previousClass) {
        return `<${element.toLowerCase()} class="${previousClass}">${replacedValue}</${element.toLowerCase()}>`;
    },
    removeClass(idSelector, index, target,removedClass) {
        let element = $(`#${idSelector}${index}`);

        if (element) {
            $(element).each((index, el) => {
                $(el).find(target).removeClass(removedClass)
            });
        }
    },
    highlightMatches(index, query) {
        let element = $(`#match-${index}`);

        if (element) {
            var regex = RegExp(query, 'gi');
            findAndReplaceDOMText(document.getElementById(`match-${index}`),{
                find: regex,
                replace: query,
                portionMode: 'first',
                preset: 'prose',
                wrap: 'span',
                wrapClass: 'highlight-match'
            });
        }
    },
    setReplace(targetToReplace, value, query, index, isReplaceAll, instances) {
        let element = $(`#replacer-editor-${index}`);
        if (element) {
            let regex = RegExp(query, 'gi');
            findAndReplaceDOMText(document.getElementById(`replacer-editor-${index}`),{
                find: regex,
                replace: value,
                portionMode: 'first',
                preset: 'prose',
                // wrap: isReplaceAll ? 'span' : 'span',
                wrap: 'span',
                wrapClass: 'replacer-single'
            });

            if (isReplaceAll && instances.count === 1){
                targetToReplace.replaced = index === targetToReplace.index;
            } else if(instances.count === 1){
                targetToReplace.replaced = index === targetToReplace.index;
            } else  {

                //ITERATE OVER INSTANCES WITH INDEX PLUS 1 THEN UPDATE REPLACED STATUS IN CURRENT INSTANCE THEN CHECK GENERAL REPLACED STATUS

                if(instances.count > 1) {
                    let newInstanceIndex = index;
                    newInstanceIndex === 1 ? 1 : newInstanceIndex + 1;

                    _.forEach(instances.matches, (item) => {
                        item.replaced = newInstanceIndex === item.index;
                    })

                    targetToReplace.replaced = _.every(instances.matches, 'replaced');

                }

            }

            if (!isReplaceAll) {
                /*$(`#replacer-popup-${index}`).hide();*/
            }else{
                targetToReplace.newValue = $(element).text();
                targetToReplace.newValue = targetToReplace.newValue.replace(/<(?!\s*\/?\s*p\b)[^>]*>/gi,'').replace(/&nbsp;/g,' ')
            }

            /*$(element).removeAttr("id");
            $(element).removeAttr("replacer-editor");*/
        }
    },
    updateSelectors(selectors) {
        if (_.size(selectors)>0) {
            let ids = _.map(selectors, (item) => item.index);
            if (_.size(ids) > 0 ) {
                _.forEach(ids, (item) => {
                    let element = $(`#replacer-editor-${item}`);
                    $(element).removeAttr("id");
                    $(element).removeAttr("replacer-editor");
                })
            }
        }
    },

    getMonthName(monthNumber, abbrev){
        var monthFullNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var monthAbbrevNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var monthNames = abbrev ? monthAbbrevNames : monthFullNames;

        return monthNames[monthNumber]
    },

    getCommentFormatTime(hour, min) {
        var AMorPM =  hour > 11 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        hour = hour < 10 ? `0${hour}` : hour;
        min = min < 10 ? `0${min}` : min;
        return `${hour}:${min} ${AMorPM}`
    },

    buildCommentDate(dateString) {
        var date = new Date(dateString);
        var day = date.getDate();
        var month = utils.getMonthName(date.getMonth(), true);
        var year = date.getFullYear();
        var time = utils.getCommentFormatTime(date.getHours(), date.getMinutes());

        return `${month}. ${day}, ${year} @${time}`
    },

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    checkSpecialChars(text) {
        let newText = _.cloneDeep(text);
        let spRegex = /[!-/:-@[-\]_{-~\u0080-þͰ-ϾЀ-ӾԀ-\u052e՚-՟։-֊־׀׃׆׳-״؆-؍؛؞-؟٪-٭۔܀-܍߷-߹।-॥॰৲-৳૱௹෴฿๏๚-๛༄-༒༺-༽྅࿐-࿔၊-၏჻፡-፨᙭-᙮᚛-᚜᛫-᛭᜵-᜶។-៖៘-៛᠀-᠊᥄-᥅᧞-᧟᨞-᨟᭚-᭠᰻-᰿᱾-᱿ἀ-῾‐-‧‰-⁞⁺-⁾₊-₎₠-₵⅀-⅄⅋←-⋿⌈-⌋⌠-⌡〈-〉⍼⎛-⎳⏜-⏡▷◁◸-\u26fe❨-❵⟀-⟊⟌⟐-⟿⤀-⫿⬰-⭄⭇-⭌⳹-⳼⳾-⳿\u2de0-\u2dfe⸀-⸮⸰、-〃〈-】〔-〟〰〽゠・꘍-꘏Ꙁ-\ua69e꡴-꡷꣎-꣏꤮-꤯꥟꩜-꩟﬩﴾-﴿﷼︐-︙︰-﹒﹔-﹦﹨-﹫！-／：-＠［-］＿｛-･￠-￢￥-￦￩-￬]|\ud800[\udd00-\udd01\udd40-\udd8e\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc70-\udc73]|\ud834[\ude00-\ude4e]|\ud835[\udec1\udedb\udefb\udf15\udf35\udf4f\udf6f\udf89\udfa9\udfc3]/g;
        let hasSC = spRegex.test(newText);
        let isMatchingSC;

        if(hasSC) {
            _.forEach(newText, (character, index) => {
                isMatchingSC = spRegex.test(character);
                if( isMatchingSC) {
                    newText = newText.replace(character, utils.testSpecialCharacter(character));
                }
            })
            return newText;
        }
    },
    testSpecialCharacter(character) {
        switch (character) {
            //region LATIN
            case "¡":
                character = "&#x00A1;";
                break;
            case "¢":
                character = "&#x00A2;";
                break;
            case "£":
                character = "&#x00A3;";
                break;
            case "¤":
                character = "";
                break;
            case "¥":
                character = "&#x00A5;";
                break;
            case "¦":
                character = "&#x00A6;";
                break;
            case "§":
                character = "&#x00A7;";
                break;
            case "¨":
                character = "&#x00A8;";
                break;
            case "©":
                character = "&#x00A9;";
                break;
            case "™":
                character = "";
                break;
            case "ª":
                character = "&#x00AA;";
                break;
            case "«":
                character = "&#x00AB;";
                break;
            case "¬":
                character = "&#x00AC;";
                break;
            case  "®":
                character = "&#x00AE;";
                break;
            case "¯":
                character = "&#x00AF;";
                break;
            case "°":
                character = "&#x00B0;";
                break;
            case "±":
                character = "&#x00B1;";
                break;
            case "²":
                character = "&#x00B2;";
                break;
            case "³":
                character = "&#x00B3;";
                break;
            case "´":
                character = "&#x00B4;";
                break;
            case "µ":
                character = "&#x00B5;";
                break;
            case "¶":
                character = "&#x00B6;";
                break;
            case "·":
                character = "&#x00B7;";
                break;
            case "¸":
                character = "&#x00B8;";
                break;
            case "¹":
                character = "&#x00B9";
                break;
            case "º":
                character = "&#x00B0;";
                break;
            case "»":
                character = "&#x00BB;";
                break;
            case "¼":
                character = "&#x00BC;";
                break;
            case "½":
                character = "&#x00BD;";
                break;
            case "¾":
                character = "&#x00BE;";
                break;
            case "¿":
                character = "&#x00BF;";
                break;
            case "À":
                character = "&#x00C0;";
                break;
            case "Á":
                character = "&#x00C1;";
                break;
            case "Â":
                character = "&#x00C2;";
                break;
            case "Ã":
                character = "&#x00C3;";
                break;
            case "Ä":
                character = "&#x00C4;";
                break;
            case "Å":
                character = "&#x00C5;";
                break;
            case "Æ":
                character = "&#x00C6;";
                break;
            case "Ç":
                character = "&#x00C7;";
                break;
            case "È":
                character = "&#x00C8;";
                break;
            case "É":
                character = "&#x00C9;";
                break;
            case "Ê":
                character = "&#x00CA;";
                break;
            case "Ë":
                character = "&#x00CB;";
                break;
            case "Ì":
                character = "&#x00CC;";
                break;
            case "Í":
                character = "&#x00CD;";
                break;
            case "Î":
                character = "&#x00CE;";
                break;
            case "Ï":
                character = "&#x00CF;";
                break;
            case "Ð":
                character = "&#x00D0;";
                break;
            case "Ñ":
                character = "&#x00D1;";
                break;
            case "Ò":
                character = "&#x00D2;";
                break;
            case "Ó":
                character = "&#x00D3;";
                break;
            case "Ô":
                character = "&#x00D4;";
                break;
            case "Õ":
                character = "&#x00D5;";
                break;
            case "Ö":
                character = "&#x00D6;";
                break;
            case "×":
                character = "&#x00D7;";
                break;
            case "Ø":
                character = "&#x00D8;";
                break;
            case "Ù":
                character = "&#x00D9;";
                break;
            case "Ú":
                character = "&#x00DA;";
                break;
            case "Û":
                character = "&#x00DB;";
                break;
            case "Ü":
                character = "&#x00DC;";
                break;
            case "Ý":
                character = "&#x00DD;";
                break;
            case "Þ":
                character = "&#x00DE;";
                break;
            case "ß":
                character = "&#x00DF;";
                break;
            case "à":
                character = "&#x00E0;";
                break;
            case "á":
                character = "&#x00E1;";
                break;
            case "â":
                character = "&#x00E2;";
                break;
            case "ã":
                character = "&#x00E3;";
                break;
            case "ä":
                character = "&#x00E4;";
                break;
            case "å":
                character = "&#x00E5;";
                break;
            case "æ":
                character = "&#x00E6;";
                break;
            case "ç":
                character = "&#x00E7;";
                break;
            case "è":
                character = "&#x00E8;";
                break;
            case "é":
                character = "&#x00E9;";
                break;
            case "ê":
                character = "&#x00EA;";
                break;
            case "ë":
                character = "&#x00EB;";
                break;
            case "ì":
                character = "&#x00EC;";
                break;
            case "í":
                character = "&#x00ED;";
                break;
            case "î":
                character = "&#x00EE;";
                break;
            case "ï":
                character = "&#x00EF;";
                break;
            case "ð":
                character = "&#x00F5;";
                break;
            case "ñ":
                character = "&#x00F1;";
                break;
            case "ò":
                character = "&#x00F2;";
                break;
            case "ó":
                character = "&#x00F3;";
                break;
            case "ô":
                character = "&#x00F4;";
                break;
            case "õ":
                character = "&#x00F5;";
                break;
            case "ö":
                character = "&#x00F6;";
                break;
            case "÷":
                character = "&#x00F7;";
                break;
            case "ø":
                character = "&#x00F8;";
                break;
            case "ù":
                character = "&#x00F9;";
                break;
            case "ú":
                character = "&#x00FA;";
                break;
            case "û":
                character = "&#x00FB;";
                break;
            case "ü":
                character = "&#x00FC;";
                break;
            case  "ý":
                character = "&#x00FD;";
                break;
            case "þ":
                character = "&#x00FE;";
                break;
            case "ÿ":
                character = "&#x00FF;";
                break;
            //endregion
            //region GREEK
            case "Α":
                character = "&#x0391;";
            break;
            case "Β":
                character = "&#x0392;";
            break;
            case "Γ":
                character = "&#x0393;";
            break;
            case "Δ":
                character = "&#x0394;";
            break;
            case "Ε":
                character = "&#x0395;";
            break;
            case "Ζ":
                character = "&#x0396;";
            break;
            case "Η":
                character = "&#x0397;";
            break;
            case "Θ":
                character = "&#x0398;";
            break;
            case "Ι":
                character = "&#x0399;";
            break;
            case "Κ":
                character = "&#x039A;";
            break;
            case "Λ":
                character = "&#x039B;";
            break;
            case "Μ":
                character = "&#x039C;";
            break;
            case "Ν":
                character = "&#x039D;";
            break;
            case "Ξ":
                character = "&#x039E;";
            break;
            case "Ο":
                character = "&#x039F;";
            break;
            case "Π":
                character = "&#x03A0;";
            break;
            case "Ρ":
                character = "&#x03A1;";
            break;
            case "Σ":
                character = "&#x03A3;";
            break;
            case "Τ":
                character = "&#x03A4;";
            break;
            case "Υ":
                character = "&#x03A5;";
            break;
            case "Φ":
                character = "&#x03A6;";
            break;
            case "Χ":
                character = "&#x03A7;";
            break;
            case "Ψ":
                character = "&#x03A8;";
            break;
            case "Ω":
                character = "&#x03A9;";
            break;
            case "α":
                character = "&#x03B1;";
            break;
            case "β":
                character = "&#x03B2;";
            break;
            case "γ":
                character = "&#x03D2;";
            break;
            case "δ":
                character = "&#x03B4;";
            break;
            case "ε":
                character = "&#x03B5;";
            break;
            case "ζ":
                character = "&#x03B6;";
            break;
            case "η":
                character = "&#x03B7;";
            break;
            case "θ":
                character = "&#x03B8;";
            break;
            case "ι":
                character = "&#x03B9;";
            break;
            case "κ":
                character = "&#x03BA;";
            break;
            case "λ":
                character = "&#x03BB;";
            break;
            case "μ":
                character = "&#x03BC;";
            break;
            case "ν":
                character = "&#x03C5;";
            break;
            case "ξ":
                character = "&#x03BE;";
            break;
            case "ο":
                character = "&#x03BF;";
            break;
            case "π":
                character = "&#x03C0;";
            break;
            case "ρ":
                character = "&#x03C1;";
            break;
            case "ς":
                character = "&#x03C2;";
            break;
            case "σ":
                character = "&#x03C3;";
            break;
            case "τ":
                character = "&#x03C4;";
            break;
            case "υ":
                character = "&#x03C5;";
            break;
            case "φ":
                character = "&#x03C6;";
            break;
            case "χ":
                character = "&#x03C7;";
            break;
            case "ψ":
                character = "&#x03C8;";
            break;
            case "ω":
                character = "&#x03C9;";
            break;
            case "ϑ":
                character = "&#x03D1;";
            break;
            case "ϒ":
                character = "&#x03D2;";
            break;
            case "ϕ":
                character = "&#x03D5;";
            break;
            case "ϖ":
                character = "&#x03D6;";
            break;
            case "Ϝ":
                character = "&#x03DC;";
            break;
            case "ϝ":
                character = "&#x03DD;";
            break;
            case "ϰ":
                character = "&#x03F0;";
            break;
            case "ϱ":
                character = "&#x03F1;";
            break;
            case "ϵ":
                character = "&#x03F5;";
            break;
            case "϶":
                character = "&#x03F6;";
            break;
            //endregion
            //region CYRILLIC
            case "Ѐ":
                character = "&#x0400;";
            break;
            case "Ё":
                character = "&#x0401;";
            break;
            case "Ђ":
                character = "&#x040B;";
            break;
            case "Ѓ":
                character = "&#x0403;";
            break;
            case "Є":
                character = "&#x0404;";
            break;
            case "Ѕ":
                character = "&#x0405;";
            break;
            case "І":
                character = "&#x0406;";
            break;
            case "Ї":
                character = "&#x0407;";
            break;
            case "Ј":
                character = "&#x0408;";
            break;
            case "Љ":
                character = "&#x0409;";
            break;
            case "Њ":
                character = "";
            break;
            case "Ћ":
                character = "";
            break;
            case "Ќ":
                character = "&#x040C;";
            break;
            case "Ѝ":
                character = "&#x040D;";
            break;
            case "Ў":
                character = "&#x045E;";
            break;
            case "Џ":
                character = "&#x040F;";
            break;
            case "А":
                character = "&#x0410;";
            break;
            case "Б":
                character = "&#x0411;";
            break;
            case "В":
                character = "&#x0412;";
            break;
            case "Г":
                character = "&#x0413;";
            break;
            case "Д":
                character = "&#x0414;";
            break;
            case "Е":
                character = "&#x0415;";
            break;
            case "Ж":
                character = "&#x0416;";
            break;
            case "З":
                character = "&#x0417;";
            break;
            case "И":
                character = "&#x0418;";
            break;
            case "Й":
                character = "&#x0419;";
            break;
            case "К":
                character = "&#x041A;";
            break;
            case "Л":
                character = "&#x041B;";
            break;
            case "М":
                character = "&#x041C;";
            break;
            case "Н":
                character = "&#x041D;";
            break;
            case "О":
                character = "&#x041E;";
            break;
            case "П":
                character = "&#x041F;";
            break;
            case "Р":
                character = "&#x0420;";
            break;
            case "С":
                character = "&#x0421;";
            break;
            case "Т":
                character = "&#x0422;";
            break;
            case "У":
                character = "&#x0443;";
            break;
            case "Ф":
                character = "&#x0444;";
            break;
            case "Х":
                character = "&#x0425;";
            break;
            case "Ц":
                character = "&#x0426;";
            break;
            case "Ч":
                character = "&#x0427;";
            break;
            case "Ш":
                character = "&#x0428;";
            break;
            case "Щ":
                character = "&#x0429;";
            break;
            case "Ъ":
                character = "&#x042A;";
            break;
            case "Ы":
                character = "&#x042B;";
            break;
            case "Ь":
                character = "&#x042C;";
            break;
            case "Э":
                character = "&#x042D;";
                break;
            case "Ю":
                character = "&#x042E;";
                break;
            case "Я":
                character = "&#x042F;";
                break;
            case "а":
                character = "&#x0430;";
                break;
            case "б":
                character = "&#x0431;";
                break;
            case "в":
                character = "&#x0432;";
                break;
            case "г":
                character = "&#x0433;";
                break;
            case "д":
                character = "&#x0414;";
                break;
            case "е":
                character = "&#x0435;";
                break;
            case "ж":
                character = "&#x0436;";
                break;
            case "з":
                character = "&#x0437;";
                break;
            case "и":
                character = "&#x0438;";
                break;
            case "й":
                character = "&#x0439;";
                break;
            case "к":
                character = "&#x043A;";
                break;
            case "л":
                character = "&#x043B;";
                break;
            case "м":
                character = "&#x043C;";
                break;
            case "н":
                character = "&#x043D;";
                break;
            case "о":
                character = "&#x043E;";
                break;
            case "п":
                character = "&#x043F;";
                break;
            case "р":
                character = "&#x0440;";
                break;
            case "с":
                character = "&#x0441;";
                break;
            case "т":
                character = "&#x0442;";
                break;
            case "у":
                character = "&#x0443;";
                break;
            case "ф":
                character = "&#x0444;";
                break;
            case "х":
                character = "&#x0445;";
                break;
            case "ц":
                character = "&#x0446;";
                break;
            case "ч":
                character = "&#x0447;";
                break;
            case "ш":
                character = "&#x0448;";
                break;
            case "щ":
                character = "&#x0449;";
                break;
            case "ъ":
                character = "&#x044A;";
                break;
            case "ы":
                character = "&#x044B;";
                break;
            case "ь":
                character = "&#x044C;";
                break;
            case "э":
                character = "&#x044D;";
                break;
            case "ю":
                character = "&#x044E;";
                break;
            case "я":
                character = "&#x044F;";
                break;
            case "ѐ":
                character = "&#x0450;";
                break;
            case "ё":
                character = "&#x0451;";
                break;
            case "ђ":
                character = "&#x0452;";
                break;
            case "ѓ":
                character = "&#x0453;";
                break;
            case "є":
                character = "&#x0416;";
                break;
            case "ѕ":
                character = "&#x0455;";
                break;
            case "і":
                character = "&#x0456;";
                break;
            case "ї":
                character = "&#x0457;";
                break;
            case "ј":
                character = "&#x0458;";
                break;
            case "љ":
                character = "&#x0459;";
                break;
            case "њ":
                character = "&#x045A;";
                break;
            case "ћ":
                character = "&#x045B;";
                break;
            case "ќ":
                character = "&#x045C;";
                break;
            case "ѝ":
                character = "&#x045D;";
                break;
            case "ў":
                character = "&#x045E;";
                break;
            case "џ":
                character = "&#x045F;";
                break;
            //endregion
            //region PUNCTUATION
            case "–":
                character = "&#x2013;";
                break;
            case "—":
                character = "&#x2014;";
                break;
            case "‘":
                character = "&#x2018;";
                break;
            case "’":
                character = "&#x2019;";
                break;
            case "‚":
                character = "&#x201A;";
                break;
            case "“":
                character = "&#x2033;";
                break;
            case "„":
                character = "&#x201E;";
            break;
            case "†":
                character = "&#x2020;";
            break;
            case "‡":
                character = "&#x2021;";
            break;
            case "•":
                character = "&#x2022;";
            break;
            case "…":
                character = "&#x2026;";
            break;
            case "‰":
                character = "&#x2030;";
            break;
            case "′":
                character = "&#x2032;";
            break;
            case "″":
                character = "&#x2033;";
            break;
            case "‹":
                character = "&#x2039;";
            break;
            case "›":
                character = "&#x203A;";
            break;
            case "‾":
                character = "&#x203E;";
            break;
            case "⁄":
                character = "&#x2044;";
            break;
            //endregion
            //region CURRENCY
            case "₠":
                character = "&#x20A0;";
            break;
            case "₢":
                character = "&#x20A2;";
            break;
            case "₣":
                character = "&#x20A3;";
            break;
            case "₤":
                character = "&#x20A4;";
            break;
            case "₥":
                character = "&#x20A5;";
            break;
            case "₦":
                character = "&#x20A6;";
            break;
            case "₧":
                character = "&#x20A7;";
            break;
            case "₨":
                character = "&#x20A8;";
            break;
            case "₩":
                character = "&#x20A9;";
            break;
            case "₪":
                character = "&#x20AA;";
            break;
            case "₫":
                character = "&#x20AB;";
            break;
            case "€":
                character = "&#x20AC;";
            break;
            case "₭":
                character = "&#x20AD;";
            break;
            case "₮":
                character = "&#x20AE;";
            break;
            case "₯":
                character = "&#x20AF;";
            break;
            case "₰":
                character = "₰";
            break;
            case "₱":
                character = "&#x20B1;";
            break;
            case "₲":
                character = "&#x20B2;";
            break;
            case "₳":
                character = "&#x20B3;";
            break;
            case "₴":
                character = "&#x20B4;";
            break;
            case "₵":
                character = "&#x20B5;";
            break;
            case "₶":
                character = "&#x20B6;";
            break;
            case "₷":
                character = "&#x20B7;";
            break;
            case "₸":
                character = "&#x20B8;";
            break;
            case "₹":
                character = "&#x20B9;";
            break;
            //endregion
            //region ARROW
            case "←":
                character = "&#x2190;";
            break;
            case "↑":
                character = "&#x2191;";
            break;
            case "→":
                character = "&#x2192;";
            break;
            case "↓":
                character = "&#8595;";
            break;
            case "↔":
                character = "&#8596;";
            break;
            case "↕":
                character = "&#x2195;";
            break;
            case "↖":
                character = "&#x2196;";
            break;
            case "↗":
                character = "&#x2197;";
            break;
            case "↘":
                character = "&#x2198;";
            break;
            case "↙":
                character = "&#x2199;";
            break;
            case "↚":
                character = "&#x219A;";
            break;
            case "↛":
                character = "&#x219B;";
            break;
            case "↜":
                character = "&#x219D";
            break;
            case "↝":
                character = "&#x219D;";
            break;
            case "↞":
                character = "&#x219E;";
            break;
            case "↟":
                character = "&#x219F;";
            break;
            case "↠":
                character = "&#x21A0;";
            break;
            case "↡":
                character = "&#x21A1;";
            break;
            case "↢":
                character = "&#x21A2;";
            break;
            case "↣":
                character = "&#x21A3;";
            break;
            case "↤":
                character = "&#x21A4;";
            break;
            case "↥":
                character = "&#x21A5;";
            break;
            case "↦":
                character = "&#x21A6;";
            break;
            case "↧":
                character = "&#x21A7;";
            break;
            case "↨":
                character = "&#x21A8;";
            break;
            case "↩":
                character = "&#x21a9;";
            break;
            case "↪":
                character = "&#x21AA;";
            break;
            case "↫":
                character = "&#x21AB;";
            break;
            case "↬":
                character = "&#x21AC;";
            break;
            case "↭":
                character = "&#x21AD;";
            break;
            case "↮":
                character = "";
            break;
            case "↯":
                character = "&#x21AF;";
            break;
            case "↰":
                character = "&#x21B0;";
            break;
            case "↱":
                character = "&#x21B1;";
            break;
            case "↲":
                character = "&#x21B2;";
            break;
            case "↳":
                character = "&#x21B3;";
            break;
            case "↴":
                character = "&#x21B4;";
            break;
            case "↵":
                character = "&#x21B5;";
            break;
            case "↶":
                character = "&#x21B6;";
            break;
            case "↷":
                character = "&#x21B7;";
            break;
            case "↸":
                character = "&#x21B8;";
            break;
            case "↹":
                character = "&#x21B9;";
            break;
            case "↺":
                character = "&#x21BA;";
            break;
            case "↻":
                character = "&#x21BB;";
            break;
            case "↼":
                character = "&#x21BC;";
            break;
            case "↽":
                character = "&#x21BD;";
            break;
            case "↾":
                character = "&#x21BE;";
            break;
            case "↿":
                character = "&#x21BF;";
            break;
            case "⇀":
                character = "&#x21C0;";
            break;
            case "⇁":
                character = "&#x21C1;";
            break;
            case "⇂":
                character = "&#x21C2;";
            break;
            case "⇃":
                character = "&#x21C3;";
            break;
            case "⇄":
                character = "&#x21C4;";
            break;
            case "⇅":
                character = "&#x21C5;";
            break;
            case "⇆":
                character = "&#x21C6;";
            break;
            case "⇇":
                character = "&#x21C7;";
            break;
            case "⇈":
                character = "&#x21C8;";
            break;
            case "⇉":
                character = "&#x21C9;";
            break;
            case "⇊":
                character = "&#x21CA;";
            break;
            case "⇋":
                character = "&#x21CB;";
            break;
            case "⇌":
                character = "&#x21CC;";
            break;
            case "⇍":
                character = "&#x21CD;";
            break;
            case "⇎":
                character = "&#x21CE;";
            break;
            case "⇏":
                character = "&#x21CF;";
            break;
            case "⇐":
                character = "&#x21D0;";
            break;
            case "⇑":
                character = "&#x21D1;";
            break;
            case "⇒":
                character = "&#x21D2;";
            break;
            case "⇓":
                character = "&#x21D3;";
            break;
            case "⇔":
                character = "&#x21D4;";
            break;
            case "⇕":
                character = "&#x21D5;";
            break;
            case "⇖":
                character = "&#x21D6;";
            break;
            case "⇗":
                character = "&#x21D7;";
            break;
            case "⇘":
                character = "&#x21D8;";
            break;
            case "⇙":
                character = "&#x21D9;";
            break;
            case "⇚":
                character = "&#x21DA;";
            break;
            case "⇛":
                character = "&#x21DB;";
            break;
            case "⇜":
                character = "&#x21DC;";
            break;
            case "⇝":
                character = "&#x21DD;";
            break;
            case "⇞":
                character = "&#x21DE;";
            break;
            case "⇟":
                character = "&#x21DF;";
            break;
            case "⇠":
                character = "&#x21E0;";
            break;
            case "⇡":
                character = "&#x21E1;";
            break;
            case "⇢":
                character = "&#x21E2";
            break;
            case "⇣":
                character = "&#x21E3;";
            break;
            case "⇤":
                character = "&#x21E4;";
            break;
            case "⇥":
                character = "&#x21E5;";
            break;
            case "⇦":
                character = "&#x21E6;";
            break;
            case "⇧":
                character = "&#x21E7;";
            break;
            case "⇨":
                character = "&#x21E8;";
            break;
            case "⇩":
                character = "&#x21E9;";
            break;
            case "⇪":
                character = "&#x21EA;";
            break;
            case "⇫":
                character = "&#x21EB;";
            break;
            case "⇬":
                character = "&#x21EC;";
            break;
            case "⇭":
                character = "&#x21ED;";
            break;
            case "⇮":
                character = "&#x21EE;";
            break;
            case "⇯":
                character = "&#x21EF;";
            break;
            case "⇰":
                character = "&#x21F0;";
            break;
            case "⇱":
                character = "&#x21F1;";
            break;
            case "⇲":
                character = "&#x21F2;";
            break;
            case "⇳":
                character = "&#x21F3;";
            break;
            case "⇴":
                character = "&#x21F4;";
            break;
            case "⇵":
                character = "&#x21F5;";
            break;
            case "⇶":
                character = "&#x21F6;";
            break;
            case "⇷":
                character = "&#x21F7;";
            break;
            case "⇸":
                character = "&#x21F8;";
            break;
            case "⇹":
                character = "&#x21F9;";
            break;
            case "⇺":
                character = "&#x21FA;";
            break;
            case "⇻":
                character = "&#x21FB;";
            break;
            case "⇼":
                character = "&#x21FC;";
            break;
            case "⇽":
                character = "&#x21FD;";
            break;
            case "⇾":
                character = "&#x21FE;";
            break;
            case "⇿":
                character = "&#x21FF;";
            break;
            //endregion
            //region MATH

            case "∀":
                character = "&#x2200;";
            break;
            case "∂":
                character = "&#x2202;";
            break;
            case "∃":
                character = "&#x2203;";
            break;
            case "∅":
                character = "&#x2205;";
            break;
            case "∇":
                character = "&#x2207;";
            break;
            case "∈":
                character = "&#x2208;";
            break;
            case "∉":
                character = "&#x2209;";
            break;
            case "∋":
                character = "&#x220B;";
            break;
            case "∏":
                character = "&#x220F;";
            break;
            case "∑":
                character = "&#x2211;";
            break;
            case "−":
                character = "&#x208B;";
            break;
            case "∗":
                character = "&#x2217;";
            break;
            case "√":
                character = "&#x221A;";
            break;
            case "∝":
                character = "&#x221D;";
            break;
            case "∞":
                character = "&#x221E;";
            break;
            case "∠":
                character = "&#x2220;";
            break;
            case "∧":
                character = "&#x2227;";
            break;
            case "∨":
                character = "&#x2228;";
            break;
            case "∩":
                character = "&#x2229;";
            break;
            case "∪":
                character = "&#x222A;";
            break;
            case "∫":
                character = "&#x222B;";
            break;
            case "∴":
                character = "&#x2234;";
            break;
            case "∼":
                character = "&#x223C;";
            break;
            case "≅":
                character = "&#x2245;";
            break;
            case "≈":
                character = "&#x2248;";
            break;
            case "≠":
                character = "&#x2260;";
            break;
            case "≡":
                character = "&#x2261;";
            break;
            case "≤":
                character = "&#x2264;";
            break;
            case "≥":
                character = "&#x2265;";
            break;
            case "⊂":
                character = "&#x2282;";
            break;
            case "⊃":
                character = "&#x2283;";
            break;
            case "⊄":
                character = "&#x2284;";
            break;
            case "⊆":
                character = "&#x2286;";
            break;
            case "⊇":
                character = "&#x2287;";
            break;
            case "⊕":
                character = "&#x2295;";
            break;
            case "⊗":
                character = "&#x2297;";
            break;
            case "⊥":
                character = "&#x22A5;";
            break;

            //endregion
            //region MISC
            case "♠":
                character = "&#x2660;";
            break;
            case "♣":
                character = "&#x2663;";
            break;
            case "♥":
                character = "&#x2665;";
            break;
            case "♦":
                character = "&#x2666;";
            break;
            case "♩":
                character = "&#x2669;";
            break;
            case "♪":
                character = "&#x266A;";
            break;
            case "♫":
                character = "&#x266B;";
            break;
            case "♬":
                character = "&#x266C;";
            break;
            case "♭":
                character = "&#x266D;";
            break;
            case "♮":
                character = "&#x266E;";
            break;
            case "☀":
                character = "&#x2600;";
            break;
            case "☁":
                character = "&#x2601;";
            break;
            case "☂":
                character = "&#x2602;";
            break;
            case "☃":
                character = "&#x2603;";
            break;
            case "☕":
                character = "&#x2615;";
            break;
            case "☘":
                character =  "&#x2618;";
            break;
            case "☯":
                character = "&#x262F;";
            break;
            case "✔":
                character = "&#x2714;";
            break;
            case "✖":
                character = "&#x2716;";
            break;
            case "❄":
                character = "&#x2744;";
            break;
            case "❛":
                character = "&#x275B;";
            break;
            case "❜":
                character = "&#x275C;";
            break;
            case "❝":
                character = "&#x275D;";
            break;
            case "❞":
                character = "&#x275E;";
            break;
            case "❤":
                character = "&#x2764;";
            break;

            //endregion
        }
        return character;
    },
    removeElements(text, selector) {
        let wrapped = $("<div>" + text + "</div>");
        let $selectors = wrapped.find(selector)
        if (selector === 'math') {
            const maths = $selectors.map((index, elem) => elem);
            $selectors.remove();
            return wrapped.html();
            /* for ( let i=0; i < maths.length; i+=1 ) {
             } */
        } else if ( selector === 'sup' ) {
            for(let i=0;i<$selectors.length;i++){
                if($selectors[i].childNodes[0].nodeName==='A'){
                    $selectors[i].remove();
                }
            }
            return wrapped.html();
        } else if ( selector === 'sub' ) {
            const sups = $selectors.map((index, elem) => elem);
            $selectors.remove();
            return wrapped.html();
        }
        else if ( selector === 'dfn' ) {
            $selectors.remove();
            return wrapped.html();
        }
    },
    removeTrackFlag(text) {
        let wrapped = $("<div>" + text + "</div>");
        wrapped.find('.no-track').removeClass('no-track');
        return wrapped.html();
    },
    prettyDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear() + ' @ ' + date.toLocaleTimeString();
    },
    getTaxonomicType(data) {
        let format = '';
        switch (true) {
            case (data.toLowerCase().indexOf("flashcards") !== -1):
                format = "flashcards";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-slideshow-video") !== -1):
                format = "gallery-video";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-slideshow-image") !== -1):
                format = "gallery-image";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-graph") !== -1):
                format = "graph";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-simulation") !== -1):
                format = "simulation";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-survey") !== -1):
                format = "survey";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-timeline") !== -1):
                format = "timeline";
                break;

            case (data.toLowerCase().indexOf("cite-interactive-fill-in-blank") !== -1):
                format = "fill-in-blank";
                break;
            case (data.toLowerCase().indexOf("cite-interactive-multiple-choice") !== -1):
                format = "mcq";
                break;
            case (data.toLowerCase().indexOf("cite-interactive-hotspot") !== -1):
                format = "hotspot";
                break;
            case (data.toLowerCase().indexOf("cite-accounting-tables") !== -1):
                format = "accountingtable";
                break;
            case (data.toLowerCase().indexOf("cite-interactive-video-with-interactive") !== -1):
                format = "video-mcq";
                break;
        }
        return format;
    },
    getTaxonomicFormat(data) {

        let type = [];

        switch (true) {
            case (data.toLowerCase().indexOf("mmi") !== -1):
                type = 'mmi';
                break;

            case (data.toLowerCase().indexOf("cite") !== -1):
                type = 'cite';
                break;

            case (data.toLowerCase().indexOf("tdx") !== -1):
                type = 'tdx';
                break;
        }

        return type;

    },


};
utils.SuffixTree.prototype = {
    dummy: {count: 1},

    node: function(word, num, parent) {
        return {
            count: 1,
            word: word,
            parent: parent
        };
    },

    duplicates: function(h) {
        this.dups = [];
        this.bypass(this.tree, h, 0);
        var l = this.dups.length;
        this.dups.sort(function(d1, d2) { return d1.depth > d2.depth ? 1 : -1; });
        for (var i = 0; i < l; ++i) {
            var d = this.dups[i];
            this.dups[i] = { s: " " + this.sentence(d.a) + " ", depth: d.depth, count: d.a.count };
        }
        for (var i = 0; i < l; ++i) {
            var d = this.dups[i];
        }
        for (var i = 0; i < l; ++i) {
            var d = this.dups[i];
            var fl = true;
            for (var j = i + 1; j < l; ++j) {
                if (this.dups[j].s.indexOf(d.s) != -1) fl = false;
            }
            if (fl) h(d.s.substr(1, d.s.length - 2), d.count);
        }
    },

    bypass: function(a, h, depth) {
        if (a.constructor != Object) return;
        var fl = true;
        for (var i in a) {
            if (i == 'parent') continue;
            var b = a[i];
            if (b.count == a.count) fl = false;
            this.bypass(b, h, depth + 1);
        }
        if (fl && a.count > 1) {
            this.dups.push({ a: a, depth: depth });
        }
    },

    sentence: function(a) {
        var s = a.word;
        while (a = a.parent) {
            s = a.word + " " + s;
        }
        return s;
    }
};

//module.exports = utils;
