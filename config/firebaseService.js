var admin = require("firebase-admin");
var serviceAccount = require("../clicklife-dba8a-firebase-adminsdk-79dpg-a9154d47cc.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// export
module.exports = admin;
