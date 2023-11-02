
exports.loginLocalStorage = (data) => {
    try{

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          } 
          
          localStorage.setItem('myFirstKey', 'myFirstValue');
          console.log(localStorage.getItem('myFirstKey'));
    return data;
    } catch(e) {

    }


    /* console.log(data.User);

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    } 

    localStorage.setItem('user', data);

    console.log(localStorage.getItem(data)); */


  
    /* let userArray = data.ssoToken; */
    /* console.log(userArray); */
  
    /* localStorage.setItem('user', JSON.stringify(userArray.name)); */
    
  };