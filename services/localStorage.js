
exports.loginLocalStorage = (data) => {
    try{
        console.log(data.id);

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          } 
          
          localStorage.setItem('userID', data.id);
          console.log(localStorage.getItem('userID'));
    return data;
    } catch(e) {

    }
    
  };