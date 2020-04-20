const fs = require('fs');
const path = require('path');

module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') {
      return;
    }
    const route = require(path.resolve(__dirname, file));
    app.use(route.routes()).use(route.allowedMethods());
  });
};
