const Router = require('koa-router');
const jwt = require('koa-jwt');
const { secret } = require('../config');
const topicCtl = require('../controllers/topic');

const router = new Router({ prefix: '/topics' });

const auth = jwt({ secret });

router.post('/', auth, topicCtl.create);
// router.delete('/:id', auth, topicCtl.delete);
router.patch('/:id', auth, topicCtl.update);
router.get('/', topicCtl.find);
router.get('/:id', topicCtl.findById);

module.exports = router;
