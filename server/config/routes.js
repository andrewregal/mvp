
module.exports = function (app, express) {

  // Base URL
  // app.get('/', function(req, res) {
  //   res.send('hello world');
  // });

  app.get('/test', function(req, res) {
    res.send('test world');
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

};
