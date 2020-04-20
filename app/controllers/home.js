const path = require('path');

class HomeCtl {
  async index(ctx, next) {
    ctx.body = '<h1>这是主页</h1>';
    await next();
  }

  async upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }
}

module.exports = new HomeCtl();
