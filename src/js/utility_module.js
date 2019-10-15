/*--------- UTILITY FUNCTIONS ---------*/
import store from '../appstore/store';
import {
  admin,
  manager,
  editor,
  reviewer,
  defaultUser
} from "./constants/comment_permissions";
export const utility_modules = {

    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    getDocumentCookies: function () {

        var theCookies = document.cookie.split(';'),
            cookieObj = {},
            tmp, tmpName, tmpVal;

        //console.log("THE COOKIES: " + '', theCookies);

        for (var i = 1; i <= theCookies.length; i++) {

            tmp = theCookies[i - 1].split('=');
            //console.log("COOKIES TMP: " + '',tmp);
            //tmpName = decodeURIComponent(tmp[0].trim());
            //tmpVal = decodeURIComponent(tmp[1].trim());

            tmpName = tmp[0].trim();
            tmpVal = tmp[1].trim();

            if (tmpName.indexOf('[') > -1 && tmpName.indexOf(']') > -1) {

                cookieObj[tmpName.split('[')[0]] = cookieObj[tmpName.split('[')[0]] || {};
                cookieObj[tmpName.split('[')[0]][tmpName.split('[')[1].replace(']', '')] = tmpVal;

            } else {

                cookieObj[tmpName] = tmpVal;

            }
        }

        //console.log("COOKIE_OBJ:", cookieObj);

        return cookieObj;

    },
    hideLoader() {
        $('.loader').removeClass('active');
        $('.blocker').removeClass('active');
    },
    hasProjectPermission(permissionName) {
        const authStore = store.getState().auth;
        const { currentProject } = authStore;
        if (!currentProject || !currentProject.permissions) {
            //if is an admin an is assigned to current project
            return authStore.user.roleId === 'admin'
        }
        const { permissions } = currentProject;
        return  permissions.indexOf(permissionName) === -1 ? false : true;
        //return permissions[permissionName] === 'true'
    },
    checkIsAdmin() {
        const authStore = store.getState().auth;
        return authStore.user.isAdmin;
    },
    hasGlobalPermission(permissionName) {
        const authStore = store.getState().auth;
        if (authStore.user.isAdmin) return true;
        const { roleName, roles } = authStore;
        if (roleName == null) return false;
        let rolePermissions = roles.filter ( (data, index) => {
           return data.name == roleName;
        })
        const projectRolePermissions = rolePermissions[0].permissions;
        return (projectRolePermissions[permissionName] === 'true')
    },
    hasReviewerRole(){
        const authStore = store.getState().auth;
        return authStore.currentProject &&(authStore.currentProject.roleId ==="comment_only" || (authStore.currentProject.roleId !== "admin" && authStore.currentProject.roleId !== "manager" && authStore.currentProject.roleId !== "edit" &&  module.exports.hasProjectPermission('note_viewer'))) ? true:false
    },

    hasCustomToolbarRole(){
        const authStore = store.getState().auth;
        return authStore.currentProject &&(authStore.currentProject.roleId ==="comment_only"  &&  module.exports.hasProjectPermission('note_viewer'))? true:false
    },

    //EDITOR_TOOLS_MODULE UTILS FUNCTIONS
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
    getFilterType(context) {
        var filterType;
        ////console.log("GET INTERACTIVE FILTER CONTEXT: " + '',context);
        switch (context) {
            case "flashcards":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Flashcards'];
                break;

            case "timeline":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Timeline'];
                break;

            case "gallery-image":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Slideshow (Video)','Slideshow (Image)'];
                break;

            case "gallery-video":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Slideshow (Video)','Slideshow (Image)'];
                break;

            case "video-mcq":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Slideshow (Video)','Slideshow (Image)'];
                break;

            case "fill-in-blank":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Slideshow (Video)','Slideshow (Image)'];
                break;

            case "simulation":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Simulation'];
                break;

            case "survey":
                filterType = ['MMI'];//['MMI','CITE','Cite interactive: Survey'];
                break;

            case "graph":
                filterType = ['MMI'];//['MMI','Cite interactive: Graph'];
                break;

            case "metrodigi-interactive":
                filterType = ['MMI'];//['MMI','CITE','Metrodigi Interactive'];
                break;

            case "third-party-interactive":
                filterType = ['MMI'];//['MMI','CITE','3rd Party Interactive'];
                break;

            case "pdf":
                filterType = ['MMI'];//['MMI','CITE','PDF'];
                break;

            case "website":
                filterType = ['MMI'];//['MMI','CITE','Web Link'];
                break;

            default:
                filterType = ['MMI'];//['MMI','CITE'];
                break;

        }

        return filterType;
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
    checkCommentPermissions(userType, permissionName){
        function hasProjectPermission(permissionName) {
            const authStore = store.getState().auth;
            const { currentProject } = authStore;
            if (!currentProject || !currentProject.permissions) {
                //if is an admin an is assigned to current project
                return authStore.user.roleId === 'admin'
            }
            const { permissions } = currentProject;
            return  permissions.indexOf(permissionName) === -1 ? false : true;
        }
        switch (userType){
            case 'admin':
                return admin[permissionName]
            case 'manager':
                return manager[permissionName]
            case 'edit':
                return editor[permissionName]    
            case 'comment_only':
                return reviewer[permissionName]           
            case 'default_user':
                return defaultUser[permissionName]
            default:                                //Custom user permission handling
                return hasProjectPermission(permissionName)
        }
    }

};
