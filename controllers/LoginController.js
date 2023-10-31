exports.login = (req, res) => {
  return res.render('login');

  };

exports.redirect = (req, res) => {
  return res.redirect('https://webdock.io/en/login?companyID=ucl_feedback_tool&redirect=http%3A%2F%2Fwebdockproje.vps.webdock.cloud%2Flogin%2Fssoredirect%2Ftoken');
};
