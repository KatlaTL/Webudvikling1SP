exports.login = (req, res) => {
  return res.render('login');

  };

exports.redirect = (req, res) => {
  return res.redirect('https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http%3A%2F%2Fwebdockproje.vps.webdock.cloud%2Flogin%2Fssoredirect%2Ftoken');
};

exports.ssoToken = ( req, res) => {
  function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  let tokenKeyDecoded = parseJwt(req.query.ssoToken);
  
  console.log(req.query.ssoToken);
  console.log(tokenKeyDecoded);
  return res.render( 'login', {
    message: 'Succes'
  });
};