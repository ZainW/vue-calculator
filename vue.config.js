const fs = require('fs');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('./src/assets/variables.scss', 'utf-8')
      }
    }
  },
  parallel: true
};
