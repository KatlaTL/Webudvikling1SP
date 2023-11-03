
exports.loginLocalStorage = (data) => {
    try{

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
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

        setTimeout(()=> {
            console.log('settimeout test1');
            localStorage.clear();
            console.log(localStorage.getItem('userID'));
        },'5000');

        
    } catch(e) {
        console.log('error');
    }
    
};



exports.localStorageLoggedOutRedirect = (req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./localStorage');
    }

    console.log(localStorage.getItem('userID'));

  try{
    if(localStorage.getItem('userID') == null) {
        return res.render('loggedOut');
    } else (
        console.log("localstorage is not empty")
    )
  }
  catch(e){
    console.log('error');
  }
};
