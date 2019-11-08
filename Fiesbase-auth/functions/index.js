const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, _context) => {
    //Get User And Add Custom Claim (Admin)
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} Has Been Made An Admin`
        }
    }).catch(err =>{
        return err;
    });
});