const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');

const app = express();

admin.initializeApp();

exports.stationCreated = functions.firestore
  .document("users/{userUid}/stations/{stationID}")
  .onCreate((snapshot, context) => {
    const { userUid, stationID } = context.params;
    const { CodeSession, CodeCustomer } = snapshot.data();
    return admin.firestore().doc(`stations/${stationID}`).set({
      userUid,
      CodeSession,
      CodeCustomer,
    });
});

exports.stationDeleted = functions.firestore
  .document("users/{userUid}/stations/{stationID}")
  .onDelete((snapshot, context) => {
    const { stationID } = context.params;
    return [admin.firestore().doc(`stations/${stationID}`).delete(), 
      admin.firestore().collection('sessions').where('stationID', '==', stationID).get().then(
        snapshots => {
          snapshots.forEach((session) => {
            admin.firestore().collection('sessions').doc(session.id).delete()
          })
        }
      )
    ];
});

app.post('/station/url/:CodeSession', async (req, res) => {
 
  // admin.firestore().collection('stations').doc(station.id).update({session_url: req.body.session_url,})

  if(req.body.session_id && req.body.session_url){

    await admin.firestore().collection('stations').where('CodeSession', '==', req.params['CodeSession']).get().then(
      snapshots => {
        if(snapshots.size > 0){
          snapshots.forEach((station) => {
            const {userUid} = station.data();
            admin.firestore().collection('sessions').doc(req.body.session_id).set({
              session_url: req.body.session_url,
              stationID: station.id,
              userUid: userUid,
            })
            res.status(200).json({session_id: req.body.session_id, session_url: req.body.session_url, stationID: station.id, userUid: userUid});
          })
        } else{
            res.status(400).json({error: "invalid url station"});
          }
      }
    )
  }
  else {
    res.status(400).json({error: "invalid request body"});
  }
});


app.get('/station/customer/:CodeCustomer', async (req, res) => {

  if(req.query.session_id){

    await admin.firestore().collection('sessions').doc(req.query.session_id).get().then((session) => {
      if(session.exists) {
        const {session_url, userUid, stationID} = session.data();
        
        admin.firestore()
          .collection('users')
          .doc(userUid)
          .collection('stations')
          .doc(stationID)
          .update({
            totalClicks: admin.firestore.FieldValue.increment(1),
          });

        res.status(302).redirect(session_url);
      }

      else{
        res.status(400).json({error: "invalid session"});
      }
    })
  }
  else{
    res.status(400).json({error: "no session_id provided"});
  }
});

exports.app = functions.https.onRequest(app);


//else if (check if customer/url station exists ... )
//else if (check if correct customer station short code ...)

//else if (check if session_url and session_id provided ... )
//else if (check if session_url includes http ... )

// ### if we check for station exist (and session exist) then we do not necessarily need authentication ...
// ### ... or is there even a way for us to authenticate if we do not send a token in the authentication header?

// delete sessions after certain time
