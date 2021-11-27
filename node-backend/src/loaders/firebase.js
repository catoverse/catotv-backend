
const admin = require("firebase-admin");


module.exports = async () => {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
  
  // Initialise the admin functionality for the firebase backend
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}