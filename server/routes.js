const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');

router.get('/listings', (req, res) => {
	db.Listing.findAll()
		.then(results => {
			res.send(results);
		})
		.catch(err => {
			console.log('Error: ', err);
		});
})

router.get('/user', (req, res) => {
	var {id, username} = req.user;
	res.send({id, username});
});

router.post('/listingStatus', (req, res) => {
	db.UserListings.findAndCountAll({
		where: {listing_id: req.body.listingId}
	})
	.then(results => {
		res.send(results);
	})
	.catch(err => {
		console.log('Error: ', err);
	});
});


router.get('/newListings', (req, res) => {

});

router.get('/joinedListings', (req, res) => {

});

router.get('/initiatedListings', (req, res) => {
	console.log('this is the user: ', req.user);
	db.Listing.findAll({
		where: {initializer: req.user.id}
	})
	.then(results => {
		res.send(results);
	})
	.catch(err => {
		console.log('Error: ', err);
	});
});

router.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = router;