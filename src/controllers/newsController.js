class newsController {
  //[GET] /news
  // index(req, res) {
  //   res.render('news');
  // }

  //[GET] /news/:slug
  show(req, res) {
    res.send('NEWS detail');
  }
}

module.exports = new newsController();
