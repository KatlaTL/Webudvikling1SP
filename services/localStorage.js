exports.loginLocalStorage = (data) => {
    try{

        if (typeof localStorage === "undefined" || localStorage === null) {
            let LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./localStorage');
        } 
          
        localStorage.setItem('userID', data.id);

        /* console.log(localStorage.getItem('userID')); */

         
        /* for (var i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i))
        }; */


      /*   if(data.id == localStorageUserID) {
            console.log("id is the same");
        } else {
            
        }; */

        let timeoutID = setTimeout(()=> {
            console.log('settimeout test1');
            localStorage.clear();
            console.log(localStorage.getItem('userID'));
        },'10000');


        timeoutID();

        clearTimeout(timeoutID);        
    } catch(e) {
        console.log('error');
    }
    
};



