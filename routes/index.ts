const express = require('express');
const Client = require('instagram-private-api').V1;
var device = new Client.Device(process.env.SESSION_COOKIE_NAME);
var storage = new Client.CookieFileStorage(process.env.SESSION_COOKIE_NAME);
// import {IgApiClient} from 'instagram-private-api/src';
// const ig = new IgApiClient();

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard');
});

router.get('/bots', isAuthenticated, (req, res) => {
  res.render('pages/bots');
});

router.get('/connect', isAuthenticated, (req, res) => {
  res.render('pages/connect');
});

router.get('/dialogs', isAuthenticated, (req, res) => {
  res.render('pages/dialogs');
});

// async function loginToIG(instaUsername: string, instaPass: string) {
//     try {
//       ig.state.generateDevice(instaUsername);
//       const response = await ig.auth.login(instaUsername, instaPass);
//       const feed = await ig.feed.accountFollowersFeed(response.pk).get();
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

router.get('/connectinstagram', function(request, responce) {

  console.log("request query:", request.query)

  var instaUsername = request.query.instaName
  var instaPass = request.query.instaPass
  // loginToIG(instaUsername, instaPass)
  // And go for login
  Client.Session.create(device, storage, instaUsername, instaPass)
    .catch(Client.Exceptions.CheckpointError, function(error){
  		// Ok now we know that Instagram is asking us to
  		// prove that we are real users
  		// return challengeMe(error);
      console.log("There was challege error:", error)
  	})
  	.then(function(session) {
     		// Now you have a session, we can follow / unfollow, anything...
  		// And we want to follow Instagram official profile
      console.log("WE HAVE A SESSION!")
      console.log("Client acc:", Client.Account.showProfile())
      responce.send('{"success" : "Updated Successfully", "status" : 200}');
      session.getAccount()
        .then(function(account) {
      	console.log("ACC PARAMDS:", account.params)
      	// {username: "...", ...}
        })
  		// return [session, Client.Account.searchForUser(session, 'instagram')]
  	})
  	// .spread(function(session, account) {
  	// 	return Client.Relationship.create(session, account.id);
  	// })
  	// .then(function(relationship) {
  	// 	console.log("Relationship params:", relationship.params)
  	// })

});

mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);

module.exports = router;
