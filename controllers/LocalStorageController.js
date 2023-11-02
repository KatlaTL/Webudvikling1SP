const { User } = require('../models');

exports.loginLocalStorage = async (req,res) => {
    
    try{
        
        let LocalStorageData = await User.findOne({where: {id: Number(req.params.role_id )}});
        console.log(LocalStorageData);

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          } 
          
          console.log(req.params.name);
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