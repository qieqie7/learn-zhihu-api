const Koa = require('koa');
const KoaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const KoaStatic = require('koa-static');

const routing = require('./routes');
const { connectionStr } = require('./config');

const app = new Koa();

mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('mongodb连接成功'));
mongoose.connection.on('error', console.error);

app.use(KoaStatic(path.join(__dirname, 'public')));
app.use(
  error({
    postFormat: (error, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { ...rest, stack },
  }),
);
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true,
    },
  }),
);
app.use(parameter(app));
routing(app);

app.listen(4567, () => `127.0.0.1:4567`);
