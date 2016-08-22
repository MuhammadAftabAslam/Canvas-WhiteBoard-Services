const controllers = require('./controllers');

const Router = require('express').Router;
const router = new Router();


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to canvas-services API!' });
});

router.route('/user')
  //.get(controllers.project.test.bind(controllers.project))
  .post(controllers.user.create.bind(controllers.user));

router.route('/user/:id')
  .put(controllers.user.update.bind(controllers.user))
  .get(controllers.user.findOne.bind(controllers.user))
  .delete(controllers.user.remove.bind(controllers.user));


router.route('/scene')
  .get(controllers.scene.find.bind(controllers.scene))
  .post(controllers.scene.create.bind(controllers.scene));

router.route('/scene/:id')
  .put(controllers.scene.update.bind(controllers.scene))
  .get(controllers.scene.findOne.bind(controllers.scene))
  .delete(controllers.scene.remove.bind(controllers.scene));


module.exports = router;
