const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

const { createJWToken, verifyJWTToken } = require('../libs/auth');
const { db } = require('../libs/firebase');

router.post('/register', function(req, res) {
  const { firstName = '', lastName = '', email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 8);

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  };
  
  db.collection("users").add(user)
  .then(function(docRef) {
    return res.status(200).send({ auth: true, message: "registration successful", token: createJWToken({ sessionData: user, maxAge: 3600 }) });
  })
  .catch(function(error) {
    return res.status(500).send({ auth: false, token: null, message: 'There was a problem registering the user.' });
  });
});

router.post('/login', function(req, res) {
  db.collection("users").where("email", "==", req.body.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          const user = doc.data();
          if (bcryptjs.compareSync(req.body.password, user.password)) {
            return res.status(200).send({ auth: true, token: createJWToken({ sessionData: user, maxAge: 3600 }), name: user.firstName });
          } else {
            return res.status(500).send({auth: false, token: null, message: "invalid credentials"});
          }
      });
    })
    .catch(function(error) {
        return res.status(500).send({auth: false, token: null, message: "invalid credentials"});
    });
});

router.get('/logout', function(req, res) {
    return res.status(200).send({ auth: false, token: null });
});

module.exports = router;