import store from '../../store.js';

//Call this function and pass 'id' to it after that we will handle all... ♀☺♪ 

export const openApoSearchFunction = (apoObject) => {

    let showApoCurrentlyLinked = false;
    if(apoObject.title&&apoObject.title.text){
        showApoCurrentlyLinked = true;    
    }

    store.dispatch({
        type: 'TOGGLE_APO_SEARCH',
        payload : {
            apoObject : apoObject,
            toggleApo : true,
            showApoCurrentlyLinked : showApoCurrentlyLinked
        }  
    });
    //Now use Id in API
    //....
}
