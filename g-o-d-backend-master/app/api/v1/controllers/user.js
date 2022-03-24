const userModel = require('../models/user');
const resetModel = require('../models/passwordreset');
const addressModel = require('../models/addresses');
const lookbookModel = require('../models/lookbook');
const serviceModel = require('../models/services');
const billModel = require('../models/bills');
const saveproviderModel = require('../models/saveproviders')
const subscriptionModel = require('../models/subscription')
const reviewsModel = require('../models/servicereviews');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var cloud = require('../../../../config/cloudinary');
const saltRounds = bcrypt.genSaltSync(10);
const dayjs = require('dayjs');
const keyPublishable = 'pk_test_sntSe2uSuOohMsBh66biH34d00mLeSb2eh';
const keySecret = 'sk_test_O2qSfByQxkt4HgDL2A0bwO7r00AwdfVrCq';
const stripe = require("stripe")(keySecret);
const emailConfig = require('../../../../config/mailgun')();
var mailgunn = require('mailgun-js')({ apiKey: "pubkey-8b10b9b0c0d6b3bf4b9f68512f3c4167", domain: 'uk.glamourondemand.com' });
const mailgun = require('mailgun-js')(emailConfig);
const bookingModel = require('../models/bookings');
const notificationModel = require('../models/notifications');
const conversationModel = require('../models/conversation');
const Email = require('email-templates');
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');


//const activate = require('../../../../emails/activations/index.html')


let getHtml = (token) => {
	return `
		<center style="width: 100%; background-color: #f1f1f1;">
			<div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
				&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
			</div>
			<div style="max-width: 600px; margin: 40px auto; background-color: #fff" class="email-container">
				<!-- BEGIN BODY -->
				<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
					<tr>
						<td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td class="logo" style="text-align: center;">
										<h1><a href="#" style="color: #e84671;
											font-size: 24px;
											text-decoration: none;
											font-weight: 700;
											font-family: 'Lato', sans-serif;">G-O-D</a></h1>
									</td>
								</tr>
							</table>
						</td>
					</tr><!-- end tr -->
					<tr>
						<td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
							<img src="https://res.cloudinary.com/glamourod/image/upload/v1566343314/email2_o0uli2.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
						</td>
					</tr><!-- end tr -->
					<tr>
						<td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
							<table>
								<tr>
									<td>
										<div class="text" style="padding: 0 2.5em; text-align: center;">
											<h2 style="color: #000;
											font-size: 40px;
											margin-bottom: 0;
											font-weight: 400;
											line-height: 1.4;">Please
												verify your email</h2>
											<h3 style="font-size: 24px;
											font-weight: lighter;">We need to verify your email to finish setting up
												your account</h3>
											<p>
												<a href=${'http://glamourondemand.com/activate?token=' + token} class="btn btn-primary" style="border-radius: 5px;
													background: #000000;
													padding: 10px 15px;
													display: inline-block;
													text-decoration: none;
													color: #ffffff;">Verify account
												</a>
											</p>
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr><!-- end tr -->
					<!-- 1 Column Text + Button : END -->
				</table>
				<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
					<tr>
						<td valign="middle" class="bg_light footer email-section" style="border-top: 1px solid rgba(0, 0, 0, .05);
						color: rgba(0, 0, 0, .5); padding: 2.5em;">
							<table>
								<tr>
									<td valign="top" width="50%" style="padding-top: 20px;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="text-align: left; padding-right: 10px;">
													<h3 class="heading" style="color:#e84671;
													font-size: 20px;">About</h3>
													<p style="color: #808080; font-size: 14px;">
														On demand beauty service for
														everyday people.
														Be part of a thriving community bringing
														on-demand beauty services to Londoners.
													</p>
												</td>
											</tr>
										</table>
									</td>
									<td valign="top" width="25%" style="padding-top: 20px;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="text-align: left; padding-left: 5px; padding-right: 5px;">
													<h3 class="heading" style="color:#e84671;
													font-size: 20px;">Contact Info</h3>
													<ul style="list-style: none; padding: 0">
														<li style="margin-bottom: 10px;">
															<span>
																<a style="text-decoration: none; color: #808080; font-size: 14px;" href="mailto:support@glamourondemand.com">support@glamourondemand.com</a>
															</span>
														</li>
														<li>
															<span class="text">
																020 3570 3466
															</span>
														</li>
													</ul>
												</td>
											</tr>
										</table>
									</td>
									<td valign="top" width="25%" style="padding-top: 20px;">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="text-align: left; padding-left: 10px;">
													<h3 class="heading" style="color:#e84671;
													font-size: 20px;">Links</h3>
													<ul style="list-style: none; padding: 0;">
														<li><a style="text-decoration: none; color: #808080; font-size: 14px;" href="https://glamourondemand.com">Home</a></li>
														<li><a style="text-decoration: none; color: #808080; font-size: 14px;" href="https://glamourondemand.com/aboutus">About</a></li>
														<li><a style="text-decoration: none; color: #808080; font-size: 14px;" href="https://glamourondemand.com/serviceproviders">Services</a></li>
													</ul>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
		</center>
	`
}

module.exports = {
	clientcreate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }).then(function (check) {
			if (check !== null) {
				res.status(401).json({ status: "error", message: "Email Already In Use" });
			}
			else {
				mailgunn.validate(req.body.email, function (error, body) {
					const token = jwt.sign({ email: req.body.email }, req.app.get('secretKey'), { expiresIn: '1h' });
					if (body && body.is_valid) {
						userModel.create({
							fullname: req.body.fullnames,
							email: req.body.email,
							password: req.body.password,
							phone: req.body.phone,
							meta: req.body.meta,
							role: 'client',
							token: token,
							pictureUrl: 'https://res.cloudinary.com/glamourod/image/upload/v1565966103/avatar_x2pcle.png'
						},
							function (err, result) {
								if (err) {
									res.status(401).json({ status: "error", message: err });
								}
								else {
									const data = {
										from: 'Glamour on Demand <noreply@glamourondemand.com>',
										to: req.body.email,
										subject: 'Account Activation',
										html: getHtml(token)
									};

									mailgun.messages().send(data, function (error, body) {
										if (error) {
											res.status(401).json({ status: "error", message: 'unable to mail' });
										}
										else {
											res.json({ status: "ok", message: "registration successful" });
										}
									});
								}
							});
					}
					else {
						res.status(401).json({ status: "error", message: 'email is invalid' });
					}
				});
			}
		});
	},

	providercreate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }).then(function (check) {
			if (check !== null) {
				res.status(401).json({ status: "error", message: "Email Already Exists!" });
			}
			else {
				mailgunn.validate(req.body.email, function (error, body) {
					const token = jwt.sign({ email: req.body.email }, req.app.get('secretKey'), { expiresIn: '1h' });
					if (body && body.is_valid) {
						userModel.create({
							fullname: req.body.fullnames,
							email: req.body.email,
							password: req.body.password,
							phone: req.body.phone,
							meta: req.body.meta,
							role: 'provider',
							schedules: req.body.schedules,
							service: req.body.service,
							pictureUrl: 'https://res.cloudinary.com/glamourod/image/upload/v1565966103/avatar_x2pcle.png',
							bannerUrl: 'https://res.cloudinary.com/glamourod/image/upload/v1565966106/banner_rz9285.jpg',
							postcode: req.body.postcode,
							mileRadius: req.body.mileRadius,
							description: req.body.description,
							token: token,
						},
							function (err, result) {
								if (err) {
									res.status(401).json({ status: "error", message: err });
								}
								else {
									const data = {
										from: 'Glamour on Demand <noreply@glamourondemand.com>',
										to: req.body.email,
										subject: 'Account Activation',
										// text: 'http://glamourondemand.com/activate?token=' + token,
										html: getHtml(token)
									};
									mailgun.messages().send(data, function (error, body) {
										if (error) {
											res.status(401).json({ status: "error", message: 'unable to mail' });
										}
										else {
											res.json({ status: "ok", message: "registration successful" });
										}
									});
								}
							});
					}
					else {
						res.status(401).json({ status: "error", message: 'email is invalid' });
					}
				});
			}
		});
	},


	resendactivation: function (req, res, next) {
		mailgunn.validate(req.body.email, function (error, body) {
			const token = jwt.sign({ email: req.body.email }, req.app.get('secretKey'), { expiresIn: '1h' });
			if (body && body.is_valid) {
				userModel.updateOne({ "email": req.body.email },
					{ $set: { token: token } }, { new: true },
					function (err, result) {
						if (err) {
							res.status(401).json({ status: "error", message: err });
						}
						else {
							const data = {
								from: 'Glamour on Demand <noreply@glamourondemand.com>',
								to: req.body.email,
								subject: 'Account Activation',
								// text: 'http://glamourondemand.com/activate?token=' + token,
								html: getHtml(token)
							};
							mailgun.messages().send(data, function (error, body) {
								if (error) {
									res.status(401).json({ status: "error", message: 'unable to mail' });
								}
								else {
									res.json({ status: "ok", message: "registration successful" });
								}
							});
						}
					});
			}
			else {
				res.status(401).json({ status: "error", message: 'email is invalid' });
			}
		});
	},

	updateprovider: function (req, res, next) {
		userModel.updateOne({ "_id": req.body.userId },
			{
				$set: {
					fullname: req.body.fullname,
					phone: req.body.phone,
					schedules: req.body.schedules,
					service: req.body.service,
					postcode: req.body.postcode,
					mileRadius: req.body.mileRadius,
					description: req.body.description,
					instant: req.body.instant,
				}
			}, { new: true }, function (err, result) {
				if (err)
					next(err);
				else
					res.json({ status: "ok", message: "update successful", data: result });

			});
	},

	updateuserstatus: function (req, res, next) {
		userModel.updateOne({ "_id": req.params.userId },
			{
				$set: {
					isActive: req.body.status
				}
			}, { new: true }, function (err, result) {
				if (err)
					next(err);
				else
					res.json({ status: "ok", message: "update successful" });

			});
	},

	activateaccount: function (req, res, next) {
		userModel.updateOne({ "token": req.params.token },
			{
				$set: {
					isActive: 1
				}
			}, { new: true }, function (err, result) {
				if (err)
					next(err);
				else
					res.json({ status: "ok", message: "account activated" });

			});
	},


	updateclient: function (req, res, next) {
		userModel.updateOne({ "_id": req.body.userId },
			{
				$set: {
					fullname: req.body.fullname,
					phone: req.body.phone
				}
			}, { new: true }, function (err, result) {
				if (err)
					next(err);
				else
					res.json({ status: "ok", message: "update successful", data: result });

			});
	},

	authenticate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }, function (err, me) {
			if (err) {
				next(err);
			} else {

				if (me != null && bcrypt.compareSync(req.body.password, me.password)) {
					if (me.isActive == 1) {
						const token = jwt.sign({ id: me._id, user: me, email: me.email, role: me.role }, req.app.get('secretKey'), { expiresIn: '24h' });
						if (me.role === 'client') {
							res.json({ status: "ok", message: "successful", data: { user: { id: me._id, fullname: me.fullname, email: me.email, phone: me.phone, createdAt: me.createdAt, role: me.role, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl }, token: token } });
						}
						else if (me.role === 'provider') {
							res.json({ status: "ok", message: "successful", data: { user: { id: me._id, fullname: me.fullname, email: me.email, phone: me.phone, createdAt: me.createdAt, role: me.role, schedules: me.schedules, service: me.service, postcode: me.postcode, mileRadius: me.mileRadius, description: me.description, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl, subscriptionId: me.subscriptionId, subscriptionEnd: me.subscriptionEnd }, token: token } });
						}
						else if (me.role === 'admin') {
							res.json({ status: "ok", message: "successful", data: { user: { id: me._id, fullname: me.fullname, email: me.email, phone: me.phone, createdAt: me.createdAt, role: me.role, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl }, token: token } });
						}
					}
					else {
						res.status(405).json({ status: "error", message: "Account Inactive: Please check your email and activate your account" });
					}
				}
				else {
					res.status(400).json({ status: "error", message: "Invalid Details" });
				}
			}
		});
	},

	reset: function (req, res, next) {
		userModel.findOne({ email: req.body.email }).then(function (check) {
			mailgunn.validate(req.body.email, function (error, body) {
				const token = jwt.sign({ email: req.body.email }, req.app.get('secretKey'), { expiresIn: '1h' });
				if (body && body.is_valid) {
					userModel.updateOne({ "email": req.body.email },
						{
							$set: {
								token: token
							}
						}, { new: true }, function (err, result) {
							if (err) {
								res.status(401).json({ status: "error", message: err });
							}
							else {
								const data = {
									from: 'Glamour on Demand <noreply@glamourondemand.com>',
									to: req.body.email,
									subject: 'Reset Password',
									text: 'http://glamourondemand.com/forgotpassword/reset?token=' + token,
								};
								mailgun.messages().send(data, function (error, body) {
									if (error) {
										res.status(401).json({ status: "error", message: 'unable to mail' });
									}
									else {
										res.json({ status: "ok", message: "registration successful" });
									}
								});
							}
						});
				}
				else {
					res.status(401).json({ status: "error", message: 'email is invalid' });
				}
			});
		});
	},

	resetpassword: function (req, res, next) {
		userModel.findOne({ token: req.body.token }, function (err, me) {
			if (err) {
				next(err);
			}
			else {

				userModel.updateOne({ "_id": me.userId }, {
					$set: {
						password: bcrypt.hashSync(req.body.newpassword, saltRounds)
					}
				},
					{ new: true },
					function (err, result) {
						if (err)
							next(err);
						else
							res.json({ status: "ok", message: "password updated successful", data: result });
					});
			}

		});

	},

	changepassword: function (req, res, next) {
		userModel.findOne({ "_id": req.body.userId }, function (err, me) {
			if (err) {
				next(err);
			}
			else {
				if (me != null && bcrypt.compareSync(req.body.oldpassword, me.password)) {
					userModel.updateOne({ "_id": req.body.userId }, {
						$set: {
							password: bcrypt.hashSync(req.body.newpassword, saltRounds)
						}
					},
						{ new: true },
						function (err, result) {
							if (err)
								next(err);
							else
								res.json({ status: "ok", message: "password updated successful", data: result });
						});
				}
				else {
					res.status(500).send({
						success: false,
						error: 'incorrect password'
					})
				}
			}
		});
	},

	getall: function (req, res, next) {
		const promise = userModel.find().exec();
		promise.then(users => res.status(200).send({
			success: true,
			users
		}))
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},
	getallclients: function (req, res, next) {
		const promise = userModel.find({ role: "client" }).exec();
		promise.then(users => res.status(200).send({
			success: true,
			users
		}))
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},

	getallproviders: function (req, res, next) {
		const promise = userModel.find({ role: "provider" }).exec();

		promise.then(users => {
			reviewsModel.find().exec()
				.then(reviews => {
					serviceModel.find().exec()
						.then(services => {
							res.status(200).send({
								success: true,
								users: users.map(user => {
									let ratings = reviews.filter(review => review.providerId == user._id).map(rev => rev.rating)
									let sum = ratings.reduce((rating, start) => rating += start, 0)
									let ratingsLength = ratings.length


									let userServices = services.filter(service => JSON.stringify(service.userId) === JSON.stringify(user._id)).map(service => parseFloat(service.amount))
									let avgPrice = userServices.length > 0 ? Math.round(userServices.reduce((amount, start) => amount += start, 0) / userServices.length) : 0
									return {
										...user._doc,
										stars: sum / ratingsLength,
										ratingsCount: ratingsLength,
										avgPrice
									}
								})
							})
						})
						.catch(err => res.status(500).send({
							success: false,
							error: err
						}));
				})
		})
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},


	getcurrentlyloggedin: function (req, res, next) {
		userModel.findById(req.body.userId, function (err, me) {
			if (err) {
				next(err);
			} else {
				if (me.role == 'client') {
					res.json({ me: { id: me._id, fullname: me.fullname, email: me.email, phone: me.phone, createdAt: me.createdAt, role: me.role, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl } });
				}
				else {
					res.json({ me: { id: me._id, fullname: me.fullname, email: me.email, instant: me.instant, phone: me.phone, createdAt: me.createdAt, role: me.role, schedules: me.schedules, service: me.service, postcode: me.postcode, mileRadius: me.mileRadius, description: me.description, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl, subscriptionId: me.subscriptionId, subscriptionEnd: me.subscriptionEnd } });
				}
			}
		});
	},
	getproviderdetails: function (req, res, next) {
		//if(me.role == 'client'){
		userModel.findById(req.params.userId, function (err, me) {
			if (err) {
				next(err);
			} else {
				res.json({ me: { fullname: me.fullname, email: me.email, phone: me.phone, createdAt: me.createdAt, role: me.role, schedules: me.schedules, service: me.services, postcode: me.postcode, mileRadius: me.mileRadius, description: me.description, pictureUrl: me.pictureUrl, bannerUrl: me.bannerUrl } });

			}
		});
		//}
	},
	addaddress: function (req, res, next) {

		addressModel.create({
			userId: req.body.userId,
			aptNumber: req.body.aptNumber,
			streetNumber: req.body.streetNumber,
			postCode: req.body.postCode,
			city: req.body.city,
			instructions: req.body.instructions
		},
			function (err, result) {
				if (err)
					next(err);
				else
					//console.log(req.body)
					res.json({ status: "ok", message: "address added", data: result });

			});
	},

	updateAddress: function (req, res, next) {
		addressModel.updateOne(req.params.addressId, {
			aptNumber: req.body.aptNumber,
			streetNumber: req.body.streetNumber,
			postCode: req.body.postCode, city: req.body.city, instructions: req.body.instructions
		}, function (err, addressInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Address updated successfully!!!", data: addressInfo });
			}
		});
	},
	getaddress: function (req, res, next) {
		const promise = addressModel.find({ userId: req.body.userId }).exec();
		promise.then(addresses => res.status(200).send({
			success: true,
			addresses
		}))
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},

	getlook: function (req, res, next) {
		const promise = lookbookModel.find({ userId: req.params.userId }).exec();
		promise.then(looks => res.status(200).send({
			success: true,
			looks
		}))
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},
	deleteAddress: function (req, res, next) {
		addressModel.deleteOne({ "_id": req.params.addressId }, function (err, serviceInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Address deleted successfully!!!" });
			}
		});
	},

	deleteLook: function (req, res, next) {
		lookbookModel.deleteOne({ "_id": req.params.lookbookId }, function (err, look) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Deleted successfully!!!" });
			}
		});
	},
	// updateprofilepicture:function(req, res, next){
	// 	cloud.uploads(req.file.picture).then((result) => 
	// 	{
	// 	userModel.findOneAndUpdate(req.body.userId,{
	// 		pictureUrl: result.url}, function(err, userInfo){
	// 	if(err)
	// 		next(err);
	// 	   else {

	// 		res.json({status:"success", message: "Update Successful", data:userInfo});
	// 	   }
	// 	  });
	// 	})

	// },

	lookbook: function (req, res, next) {
		try {
			var imageDetails = {
				userId: req.body.userId,
				picture: req.files[0].path,

			}
			//console.log(imageDetails.picture)
			//console.log(req.body.picture)
			cloud.uploads(imageDetails.picture).then((result) => {
				//console.log(result)
				var imageDetails = {
					userId: req.body.userId,
					picture: result.url
				}

				lookbookModel.create({ userId: req.params.userId, pictureUrl: imageDetails.picture }, function (err, created) {

					if (err) {
						res.json({
							err: err,
							message: 'could not upload image, try again'
						})
					}
					else {
						res.json({
							created: created,
							message: "image uploaded successfully!!"
						})
					}
				})
			})
		}
		catch (execptions) {
			console.log(execptions)
		}


	},

	updatepicture: function (req, res, next) {
		try {
			var imageDetails = {
				userId: req.body.userId,
				picture: req.files[0].path,

			}
			//console.log(imageDetails.picture)
			//console.log(req.body.picture)
			cloud.uploads(imageDetails.picture).then((result) => {
				//console.log(result)
				var imageDetails = {
					userId: req.body.userId,
					picture: result.url
				}

				userModel.updateOne({ "_id": req.params.userId }, {
					$set: {
						pictureUrl: imageDetails.picture
					}
				}, { new: true }, function (err, created) {
					// console.log(req.params.userId)
					if (err) {
						res.json({
							err: err,
							message: 'could not upload image, try again'
						})
					}
					else {
						res.json({
							created: created,
							message: "image uploaded successfully!!"
						})
					}
				})
			})
		}
		catch (execptions) {
			console.log(execptions)
		}


	},

	updatebannerpicture: function (req, res, next) {
		try {
			var imageDetails = {
				userId: req.body.userId,
				picture: req.files[0].path,

			}
			// console.log(imageDetails.picture)
			//console.log(req.body.picture)
			cloud.uploads(imageDetails.picture).then((result) => {
				// console.log(result)
				var imageDetails = {
					userId: req.body.userId,
					picture: result.url
				}
				userModel.updateOne({ "_id": req.params.userId }, {
					$set: {
						bannerUrl: imageDetails.picture
					}
				}, { new: true }, function (err, created) {
					if (err) {
						res.json({
							err: err,
							message: 'could not upload image, try again'
						})
					}
					else {
						res.json({
							created: created,
							message: "image uploaded successfully!!"
						})
					}
				})
			})
		}
		catch (execptions) {
			console.log(execptions)
		}
	},

	save: function (req, res, next) {

		saveproviderModel.create({
			userId: req.body.userId,
			providerId: req.body.providerId,
		},
			function (err, result) {
				if (err)
					next(err);
				else
					//console.log(req.body)
					res.json({ status: "ok", message: "saved successfully", data: result });

			}
		);
	},

	deleteSave: function (req, res, next) {
		saveproviderModel.deleteOne({ "_id": req.params.saveproviderId }, function (err, serviceInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Deleted successfully!!!" });
			}
		});
	},
	getsave: function (req, res, next) {
		const promise = saveproviderModel.find({ userId: req.body.userId }).exec();
		promise.then(providers => res.status(200).send({
			success: true,
			providers
		}))
			.catch(err => res.status(500).send({
				success: false,
				error: err
			}));
	},





	payment: function (req, res, next) {
		stripe.paymentIntents.create({
			amount: req.body.amount,
			currency: req.body.currency,
		}).then((result) => {
			console.log(result)
			res.json({ status: "success", message: "ok", data: result });
		})
	},

	updatePaymentStatus: function (req, res, next) {
		subscriptionModel.findOne({ "_id": req.body.subscriptionId },

			function (err, sub) {
				console.log(sub)
				var subDetails = {
					amount: sub.amount,
					name: sub.name,
				}

				console.log(subDetails)
				if (err)
					next(err);
				else
					var date = dayjs().format('YYYY-MM-DD')
				var endDate = dayjs().add(parseInt(req.body.duration), 'day').format('YYYY-MM-DD');
				stripe.paymentIntents.retrieve(req.body.secret).then((result) => {
					userModel.updateOne({ "_id": req.params.userId }, {
						$set: {
							subscriptionId: req.body.subscriptionId,
							subscriptionStart: date,
							subscriptionEnd: endDate
						}
					}, { new: true },
						function (err, success) {
							if (err) {
								next(err);
							} else {
								billModel.create({
									userId: req.params.userId,
									description: 'payment for ' + subDetails.name + ' subscription',
									amount: subDetails.amount
								}).then((bill) => {
									res.json({
										created: sub,
										charge: result,
										message: "subscription successful"
									})
								})
							}
						}
					)
				});
			});
	},
	clientstatus: function (req, res, next) {
		bookingModel.findOne({ userId: req.body.userId, status: 'pending' }).exec()
			.then((bookings) => {
				conversationModel.findOne({ providerId: req.body.userId, providerstatus: 0 }).exec()
					.then((convo) => {
						notificationModel.findOne({ userId: req.body.userId, status: 0 }).exec()
							.then((notification) => {
								res.json({
									bookings: bookings > 0 ? true : false,
									notification: notification > 0 ? true : false
								})
							}
							)
					})
			})
	},
	providerstatus: function (req, res, next) {
		bookingModel.findOne({ providerId: req.body.userId, status: 'pending' }).exec()
			.then((bookings) => {
				conversationModel.findOne({ providerId: req.body.userId, providerstatus: 0 }).exec()
					.then((convo) => {
						notificationModel.findOne({ userId: req.body.userId, status: 0 }).exec()
							.then((notification) => {
								res.json({
									bookings: bookings > 0 ? true : false,
									notification: notification > 0 ? true : false,
									message: convo > 0 ? true : false,
								})
							}
							)
					})
			})
	},

}

