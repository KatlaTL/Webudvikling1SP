exports.index = async (req, res) => {
  //res.render('../views/pages/index');

  const page = req.query.page;

  let mainPage = "featureRequests";
  if (page) {
    mainPage = page;
  }
  res.render('../views/v2/layout/index', { mainPage: mainPage });
};