'use strict';

require('./helper');

function* ls() {
  // Use 'await' inside 'async function's
  console.log('Executing ls function...');

  // Your implementation here
  let filenames = yield fs.readFile(__dirname);
  console.log(filenames);
}

module.exports = ls();

//# sourceMappingURL=ls-compiled.js.map