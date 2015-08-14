var loopback = require('loopback');
console.log(require.resolve('loopback'))
var app = loopback();

var ds = app.dataSource('db', {connector: 'memory'});
var Todo = app.model('Todo', {
  base: 'PersistedModel',
  public: true,
  dataSource: 'db'
});

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(loopback.rest());

module.exports = function(port, cb) {
  app.listen(port, cb);
};

var i = 1;
setInterval(function() {
  Todo.create({txt: 'todo ' + i++});
}, 1000);
