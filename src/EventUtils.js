let EventUtils =  {
    events:[],
    store : function (target, name, callback, scope) {
        EventUtils.events = []
        EventUtils.events.push({
            'ref':target,
            'name':name,
            'callback':callback,
            'scope':scope
        })
    },
    bind :function () {
        EventUtils.unbind();
        let eventType = null;
        if (window.addEventListener) {
            // For standards-compliant web browsers       
            eventType='addEventListener';
        }
        else {
            eventType='attachEvent';
        }
      //event binding is not working directly on react refs so each ref should have unique id;
        EventUtils.events.forEach((element,index)=>{
            if(document.getElementById(element.ref.id)){
                document.getElementById(element.ref.id)[eventType](element.name,element.callback)
            }
        })
    },
    unbind : function (target, names, callback) {
        let eventType = null;
        if (window.removeEventListener) {
            // For standards-compliant web browsers       
            eventType='removeEventListener';
        }
        else {
            eventType='detachEvent';
        }
        EventUtils.events.forEach((element,index)=>{
            if(document.getElementById(element.ref.id)){
                document.getElementById(element.ref.id)[eventType](element.name,element.callback)
            }
        })
    },
    fire : function (target, name, args) {
      
    },
    destroy :function () {
        EventUtils.events = {};
    },
    cancel : function (e) {
      if (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      return false;
    }
}
  export default EventUtils;