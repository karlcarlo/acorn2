var express = require('express');

// routes
var router_root = express.Router(),
    router_home = express.Router(),
    router_people = express.Router(),
    router_topics = express.Router();

// controllers
var home_controller = require('./home')
  , auth_controller = require('./auth')
  , people_controller = require('./people')
//   , upload_controller = require('./upload')
  , topics_controller = require('./topics')
//   , tags_controller = require('./tags')
//   , comments_controller = require('./comments')
//   , assets_controller = require('./assets');


router_root.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path, req.params);
  res.app.locals.messages = [];
  next();
});

router_root.use(auth_controller.authenticate);


/* GET home page. */
// '/'
router_root.get('/', home_controller.index);

// '/home'
router_root.get('/home', home_controller.index);

// auth
router_root.all('/signin', auth_controller.signin);
router_root.get('/signout', auth_controller.signout);
router_root.get('/signup', auth_controller.signup);


// notify
router_root.get('/notify', function(req, res){
  res.render('home/notify', { layout: 'layouts/blank' });
});


// Person
router_root.get('/people', people_controller.index);
// router_root.get('/profile', people_controller.profile);
// router_root.get('/set', people_controller.set);
// router_root.post('/set', people_controller.set);
// router_root.get('/set_password', people_controller.set_password);
// router_root.post('/set_password', people_controller.set_password);
// router_people.delete('/:id/delete', people_controller.destroy);
// router_people.put('/:id/set_active', people_controller.set_active);

// Topic
router_root.get('/topics.:format?', topics_controller.index);
router_root.post('/topics', topics_controller.create);
router_topics.get('/latest.:format?', topics_controller.latest);
router_topics.get('/new', topics_controller.new);
router_topics.get('/:id', topics_controller.show);
router_topics.get('/:id/edit', topics_controller.edit);
router_topics.post('/:id', topics_controller.update)
router_topics.delete('/:id/delete', topics_controller.destroy);



// exports
exports.root = router_root;
exports.people = router_people;
