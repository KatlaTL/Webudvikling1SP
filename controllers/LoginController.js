const { createUsers } = require('./UsersController');
const{ loginLocalStorage } = require('../services/localStorage');


exports.login = (req, res) => {
  return res.render('login');
};

exports.indexRedirect = (req, res) => {
  return res.render('index');
};

exports.redirect = (req, res) => {
  return res.redirect('http://localhost:8081/login/ssotoken?companyID=ucl_feedback_tool&ssoToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdmF0YXJVUkwiOiIiLCJlbWFpbCI6ImFua3IzODczMEBlZHUudWNsLmRrIiwiaWQiOjIyNDg2LCJuYW1lIjoiQW5kZXJzIEtyb2doIn0.d87KXlK-bGFvqiK-jRcb2Pa5synhSlDm0wJNxg_-xGY&redirect=https%3A%2F%2Ffeedback.webdock.io');
  /* return res.redirect('https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http%3A%2F%2Fwebdockproje.vps.webdock.cloud%2Flogin%2Fssoredirect%2Ftoken'); */
};

exports.ssoToken = ( req, res) => {
  try{ function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  let tokenKeyDecoded = parseJwt(req.query.ssoToken);
  
/*   console.log(req.query.ssoToken);
  console.log(tokenKeyDecoded.id); 
 */
 // createUsers(tokenKeyDecoded);
  loginLocalStorage(tokenKeyDecoded);
  return res.render( 'index', { 
    message: 'Succes'
  });
} catch (e) {
  console.log(e);
  return res.send('error');
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
        return res.render('login');
    } else (
      console.log(localStorage.getItem('userID')),
      res.redirect('index')
    )
  }
  catch(e){
    console.log('error');
  }
};


