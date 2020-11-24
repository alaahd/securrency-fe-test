module.exports = (function () {
  const fs = require('fs');

  try {
    fs.createReadStream('.env.sample').pipe(fs.createWriteStream('.env'));
    console.log('.env successfuly created');
  } catch (err) {
    console.log('.env creation error:', err.message);
  }
})();
