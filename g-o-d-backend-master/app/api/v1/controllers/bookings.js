const bookingModel = require('../models/bookings');
const notificationModel = require('../models/notifications');
const stripe = require('stripe')('sk_test_O2qSfByQxkt4HgDL2A0bwO7r00AwdfVrCq');
const userModel = require('../models/user')
const addressModel = require('../models/addresses');
const payoutModel = require('../models/payouts');
const accountModel = require('../models/accounts');
const striped = require('stripe')('pk_test_sntSe2uSuOohMsBh66biH34d00mLeSb2eh');
const jwt = require('jsonwebtoken');
const emailConfig = require('../../../../config/mailgun')();
var mailgunn = require('mailgun-js')({ apiKey: "pubkey-8b10b9b0c0d6b3bf4b9f68512f3c4167", domain: 'uk.glamourondemand.com' });
const mailgun = require('mailgun-js')(emailConfig);				

let providerEmail = (booking) => {
	return `
  <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #f1f1f1;
}

/* What it does: Stops email clients resizing small text. */
* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

/* What it does: Centers email on Android 4.4 */
div[style*="margin: 16px 0"] {
    margin: 0 !important;
}

/* What it does: Stops Outlook from adding extra spacing to tables. */
table,
td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}

/* What it does: Fixes webkit padding issue. */
table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
    margin: 0 auto !important;
}

/* What it does: Uses a better rendering method when resizing images in IE. */
img {
    -ms-interpolation-mode:bicubic;
}

/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
a {
    text-decoration: none;
}

/* What it does: A work-around for email clients meddling in triggered links. */
*[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
    border-bottom: 0 !important;
    cursor: default !important;
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
.a6S {
    display: none !important;
    opacity: 0.01 !important;
}

/* What it does: Prevents Gmail from changing the text color in conversation threads. */
.im {
    color: inherit !important;
}

/* If the above doesn't work, add a .g-img class to any image in question. */
img.g-img + div {
    display: none !important;
}

/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
/* Create one of these media queries for each additional viewport size you'd like to fix */

/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
/* iPhone 6, 6S, 7, 8, and X */
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}
/* iPhone 6+, 7+, and 8+ */
@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}
    </style>

    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    .primary{
	background: #17bebb;
}
.bg_white{
	background: #ffffff;
}
.bg_light{
	background: #f7fafa;
}
.bg_black{
	background: #000000;
}
.bg_dark{
	background: rgba(0,0,0,.8);
}
.email-section{
	padding:2.5em;
}

/*BUTTON*/
.btn{
	padding: 10px 15px;
	display: inline-block;
}
.btn.btn-primary{
	border-radius: 5px;
	background: #000000;
	color: #ffffff;
}
.btn.btn-white{
	border-radius: 5px;
	background: #ffffff;
	color: #000000;
}
.btn.btn-white-outline{
	border-radius: 5px;
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
}
.btn.btn-black-outline{
	border-radius: 0px;
	background: transparent;
	border: 2px solid #000;
	color: #000;
	font-weight: 700;
}
.btn-custom{
	color: rgba(0,0,0,.3);
	text-decoration: underline;
}

h1,h2,h3,h4,h5,h6{
	font-family: 'Work Sans', sans-serif;
	color: #000000;
	margin-top: 0;
	font-weight: 400;
}

body{
	font-family: 'Work Sans', sans-serif;
	font-weight: 400;
	font-size: 15px;
	line-height: 1.8;
	color: rgba(0,0,0,.4);
}

a{
	color: #17bebb;
}

table{
}
/*LOGO*/

.logo h1{
	margin: 0;
}
.logo h1 a{
	color: #e84671;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Work Sans', sans-serif;
}

/*HERO*/
.hero{
	position: relative;
	z-index: 0;
}

.hero .text{
	color: rgba(0,0,0,.3);
}
.hero .text h2{
	color: #000;
	font-size: 34px;
	margin-bottom: 15px;
	font-weight: 300;
	line-height: 1.2;
}
.hero .text h3{
	font-size: 20px;
	font-weight: 200;
}
.hero .text h2 span{
	font-weight: 600;
	color: #000;
}

/*PRODUCT*/
.product-entry{
	display: block;
	position: relative;
	float: left;
	padding-top: 20px;
}
.product-entry .text{
	width: calc(100% - 125px);
	padding-left: 20px;
}
.product-entry .text h3{
	margin-bottom: 0;
	padding-bottom: 0;
}
.product-entry .text p{
	margin-top: 0;
}
.product-entry img, .product-entry .text{
	float: left;
}

ul.social{
	padding: 0;
}
ul.social li{
	display: inline-block;
	margin-right: 10px;
}

/*FOOTER*/

.footer{
	border-top: 1px solid rgba(0,0,0,.05);
	color: rgba(0,0,0,.5);
}
.footer .heading{
	color: #000;
	font-size: 20px;
}
.footer ul{
	margin: 0;
	padding: 0;
}
.footer ul li{
	list-style: none;
	margin-bottom: 10px;
}
.footer ul li a{
	color: rgba(0,0,0,1);
}


@media screen and (max-width: 500px) {


}


    </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
	<center style="width: 100%; background-color: #f1f1f1;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
    	<!-- BEGIN BODY -->
     
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

          		<tr>
          			<td class="logo" style="text-align: left;">
			            
			  <img src="https://res.cloudinary.com/glamourod/image/upload/v1624197916/email2_kniiij.png" alt="" style="width: 200px; max-width: 400px; height: auto; margin: auto; display: block; padding-bottom: 20px">            
			          </td>

          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            	<tr>
            		<td style="padding: 0 2.5em; text-align: left;">
            			<div class="text">
            				<h2>Great! You've got a new booking</h2>
            				<h3>You have been booked by ${booking.clientName}.</h3>
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
	      	<table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	      		<tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					    <th width="80%" style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 20px">Service</th>
					    <th width="20%" style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 20px">Price</th>
					  </tr>
            ${booking.services.map((service)=> {
              `<tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					  	<td valign='middle' width='80%' style='text-align:left; padding: 0 2.5em;'>
					  		<div class='product-entry'>
					  			<img src="${service.pictureUrl}" alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block;">
					  			<div class="text">
					  				<h3>${service.serviceName}</h3>
					  				<p>${service.description}</p>
					  			</div>
					  		</div>
					  	</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">
					  		<span class="price" style="color: #000; font-size: 16px;">£${service.amount}</span>
					  	</td>
					  </tr>`
            })
          }

					  
					  <tr>
					  	<td valign="middle" width="80%" style="text-align:right; padding: 1.5em 0 0 2.5em;">Service fee 12%):</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">£${booking.serviceFee}</td>
					 
					  <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					  	<td valign="middle" width="80%" style="text-align:right; padding: 1.5em 0 0 2.5em;">
					  			<div class="text">
					  				<h3>Total:</h3>
					  			</div>
					  		</div>
					  	</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">
					  		<span class="price" style="color: #000; font-size: 20px;">£${booking.total}</span>
					  	</td>
					  </tr>
					   <tr>
			 <tr>
					  	
					  </tr>		  
	      	</table>
	      </tr><!-- end tr -->
      <!-- 1 Column Text + Button : END -->

        <tr>
          <td class="bg_white" style="text-align: center;">
          	<p>This inbox is auto generated, please don't reply to this email.</p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
  `
}

let clientEmail = (booking) => {
	return `
  <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #f1f1f1;
}

/* What it does: Stops email clients resizing small text. */
* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

/* What it does: Centers email on Android 4.4 */
div[style*="margin: 16px 0"] {
    margin: 0 !important;
}

/* What it does: Stops Outlook from adding extra spacing to tables. */
table,
td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}

/* What it does: Fixes webkit padding issue. */
table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
    margin: 0 auto !important;
}

/* What it does: Uses a better rendering method when resizing images in IE. */
img {
    -ms-interpolation-mode:bicubic;
}

/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
a {
    text-decoration: none;
}

/* What it does: A work-around for email clients meddling in triggered links. */
*[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
    border-bottom: 0 !important;
    cursor: default !important;
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
.a6S {
    display: none !important;
    opacity: 0.01 !important;
}

/* What it does: Prevents Gmail from changing the text color in conversation threads. */
.im {
    color: inherit !important;
}

/* If the above doesn't work, add a .g-img class to any image in question. */
img.g-img + div {
    display: none !important;
}

/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
/* Create one of these media queries for each additional viewport size you'd like to fix */

/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
/* iPhone 6, 6S, 7, 8, and X */
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}
/* iPhone 6+, 7+, and 8+ */
@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}
    </style>

    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    .primary{
	background: #17bebb;
}
.bg_white{
	background: #ffffff;
}
.bg_light{
	background: #f7fafa;
}
.bg_black{
	background: #000000;
}
.bg_dark{
	background: rgba(0,0,0,.8);
}
.email-section{
	padding:2.5em;
}

/*BUTTON*/
.btn{
	padding: 10px 15px;
	display: inline-block;
}
.btn.btn-primary{
	border-radius: 5px;
	background: #17bebb;
	color: #ffffff;
}
.btn.btn-white{
	border-radius: 5px;
	background: #ffffff;
	color: #000000;
}
.btn.btn-white-outline{
	border-radius: 5px;
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
}
.btn.btn-black-outline{
	border-radius: 0px;
	background: transparent;
	border: 2px solid #000;
	color: #000;
	font-weight: 700;
}
.btn-custom{
	color: rgba(0,0,0,.3);
	text-decoration: underline;
}

h1,h2,h3,h4,h5,h6{
	font-family: 'Work Sans', sans-serif;
	color: #000000;
	margin-top: 0;
	font-weight: 400;
}

body{
	font-family: 'Work Sans', sans-serif;
	font-weight: 400;
	font-size: 15px;
	line-height: 1.8;
	color: rgba(0,0,0,.4);
}

a{
	color: #17bebb;
}

table{
}
/*LOGO*/

.logo h1{
	margin: 0;
}
.logo h1 a{
	color: #e84671;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Work Sans', sans-serif;
}

/*HERO*/
.hero{
	position: relative;
	z-index: 0;
}

.hero .text{
	color: rgba(0,0,0,.3);
}
.hero .text h2{
	color: #000;
	font-size: 34px;
	margin-bottom: 15px;
	font-weight: 300;
	line-height: 1.2;
}
.hero .text h3{
	font-size: 20px;
	font-weight: 200;
}
.hero .text h2 span{
	font-weight: 600;
	color: #000;
}

/*PRODUCT*/
.product-entry{
	display: block;
	position: relative;
	float: left;
	padding-top: 20px;
}
.product-entry .text{
	width: calc(100% - 125px);
	padding-left: 20px;
}
.product-entry .text h3{
	margin-bottom: 0;
	padding-bottom: 0;
}
.product-entry .text p{
	margin-top: 0;
}
.product-entry img, .product-entry .text{
	float: left;
}

ul.social{
	padding: 0;
}
ul.social li{
	display: inline-block;
	margin-right: 10px;
}

/*FOOTER*/

.footer{
	border-top: 1px solid rgba(0,0,0,.05);
	color: rgba(0,0,0,.5);
}
.footer .heading{
	color: #000;
	font-size: 20px;
}
.footer ul{
	margin: 0;
	padding: 0;
}
.footer ul li{
	list-style: none;
	margin-bottom: 10px;
}
.footer ul li a{
	color: rgba(0,0,0,1);
}


@media screen and (max-width: 500px) {


}


    </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
	<center style="width: 100%; background-color: #f1f1f1;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
    	<!-- BEGIN BODY -->
     
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">

          		<tr>
          			<td class="logo" style="text-align: left;">
			            
			  <img src="https://res.cloudinary.com/glamourod/image/upload/v1624197916/email2_kniiij.png" alt="" style="width: 200px; max-width: 400px; height: auto; margin: auto; display: block; padding-bottom: 20px">            
			          </td>

          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            	<tr>
            		<td style="padding: 0 2.5em; text-align: left;">
            			<div class="text">
            				<h2>Thanks for your booking</h2>
            				<h3>Here is your booking confirmation with ${booking.providerName}.</h3>
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
	      	<table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
	      		<tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					    <th width="80%" style="text-align:left; padding: 0 2.5em; color: #000; padding-bottom: 20px">Service</th>
					    <th width="20%" style="text-align:right; padding: 0 2.5em; color: #000; padding-bottom: 20px">Price</th>
					  </tr>

					 ${booking.services.map((service)=> {
              return `<tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					  	<td valign='middle' width='80%' style='text-align:left; padding: 0 2.5em;'>
					  		<div class='product-entry'>
					  			<img src="${service.pictureUrl}" alt="" style="width: 100px; max-width: 600px; height: auto; margin-bottom: 20px; display: block;">
					  			<div class="text">
					  				<h3>${service.serviceName}</h3>
					  				<p>${service.description}</p>
					  			</div>
					  		</div>
					  	</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">
					  		<span class="price" style="color: #000; font-size: 16px;">£${service.amount}</span>
					  	</td>
					  </tr>`
            })
          }
					  
					  <tr>
					  	<td valign="middle" width="80%" style="text-align:right; padding: 1.5em 0 0 2.5em;">Service fee 12%):</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">£${booking.serviceFee}</td>
					 
					  <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
					  	<td valign="middle" width="80%" style="text-align:right; padding: 1.5em 0 0 2.5em;">
					  			<div class="text">
					  				<h3>Total:</h3>
					  			</div>
					  		</div>
					  	</td>
					  	<td valign="middle" width="20%" style="text-align:right; padding: 0 2.5em;">
					  		<span class="price" style="color: #000; font-size: 20px;">£${booking.total}</span>
					  	</td>
					  </tr>
					   <tr>
					  
	      	</table>
	      </tr><!-- end tr -->

        <tr>
          <td class="bg_white" style="text-align: center;">
          	<p>This inbox is auto generated, please don't reply to this email.</p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
  `
}
module.exports = {

create: function(req, res, next) {
let reference = Math.floor(Math.random() * 10000000000);
bookingModel.create(
{ userId: req.body.userId, 
  providerId: req.body.providerId,
  services: req.body.services,
  amount: req.body.amount,
  addressId:req.body.addressId,
  reference:reference,
  time:req.body.time}).then(async(result)=>{
  //  console.log(result)
    notificationModel.create({
      title: 'Booking', 
      body: 'just booked your service',
      userId: result.providerId,
      providerId: result.userId,
      bookingId:result.id
      }).then(async(notification)=>{
          res.json({status:"success", message: "ok", data:{bookings: result}}); 
    
      }
  )
    })
// .catch(err => {
// res.status(500).send({error: "Could Not add notification"});
// })
// res.json({status:"success", message: "ok", data:{bookings: result}});
// }
// });
},

getall:function(req,res,next){
  bookingModel.find().exec()
  .then((result) => {
    // if (err) {
    //  next(err);
    // } else {
      let addressDictionary = {}
      addressModel.find({}).exec()
      .then(addresses => {
        addressDictionary = addresses.reduce((payload, address) => {
          payload[address._id] = `${address.aptNumber}, ${address.streetNumber}. ${address.city}`
          return payload
        }, {})

        userModel.find({}).exec()
        .then(users => {
          usersDictionary = users.reduce((payload, user) => {
            payload[user.id] = user
            return payload
          }, {})

          res.json({
            status:"success",
            message: "ok", 
            data: result.map(singleBooking => {
              return { 
                message: singleBooking, 
                address: addressDictionary[singleBooking.addressId],
                from: { 
                  name: usersDictionary[singleBooking.userId].fullname, 
                  userPhoto: usersDictionary[singleBooking.userId].pictureUrl
                },
                provider:{
                  name: usersDictionary[singleBooking.providerId].fullname, 
                  userPhoto: usersDictionary[singleBooking.providerId].pictureUrl
                }
              }
            })
          });
        })
      })
    // }
   })
   .catch(err => {
     next(err);
   })
  },
    
getallclient(req, res) {
      bookingModel.find({userId: req.body.userId, paymentStatus: 'completed'}, function(err, result){
        if (err) {
         next(err);
        } else {
          userModel.find({}).exec()
    .then(users => {
      usersDictionary = users.reduce((payload, user) => {
        payload[user.id] = user
        return payload
      }, {})
      res.json({
        status:"success",
        message: "ok", 
        data: result.map(singleBooking => {
          return { 
            message: singleBooking, 
            from: { 
              name: usersDictionary[singleBooking.providerId].fullname, 
              userPhoto: usersDictionary[singleBooking.providerId].pictureUrl
            }
          }
        })
      });
     
    })
        }
       });
      },

payout(req, res) {
bookingModel.find({bookingId: req.params.bookingId}).exec().then(booking =>{
accountModel.find({userId: req.body.userId}, function(err, account){
if (err) {
next(err);
} else { 
stripe.payouts.create({
amount: booking.amount,
currency: 'gbp',
});
}
})
})
},
    getallprovider(req, res) {
        bookingModel.find({providerId: req.body.userId, paymentStatus: 'completed'}, function(err, result){
          if (err) {
           next(err);
          } else {
            let addressDictionary = {}
            addressModel.find({}).exec()
            .then(addresses => {
              addressDictionary = addresses.reduce((payload, address) => {
                payload[address._id] = `${address.aptNumber}, ${address.streetNumber}. ${address.city}`
                return payload
              }, {})

              userModel.find({}).exec()
              .then(users => {
                usersDictionary = users.reduce((payload, user) => {
                  payload[user.id] = user
                  return payload
                }, {})

                res.json({
                  status:"success",
                  message: "ok", 
                  data: result.map(singleBooking => {
                    return { 
                      message: singleBooking, 
                      address: addressDictionary[singleBooking.addressId],
                      from: { 
                        name: usersDictionary[singleBooking.userId].fullname, 
                        userPhoto: usersDictionary[singleBooking.userId].pictureUrl
                      }
                    }
                  })
                });
              })
            })
          }
         });
        },

     
        deleteById: function(req, res, next) {
          bookingModel.deleteOne({"_id":req.params.bookingId}, function(err, bookingInfo){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Booking deleted successfully!!!"});
           }
          });
         },
      

         getById: function(req, res, next) {
            
            bookingModel.findById(req.params.bookingId, function(err, bookingInfo){
             if (err) {
              next(err);
             } else {
              res.json({status:"success", message: "ok", data:{bookingInfo}});
             }
            });
           },

       payment: function(req, res, next) {
            stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:req.body.currency,
            }).then((result)=>{
              console.log(result)
              res.json({status:"success", message: "ok", data:result});
            })
          },

updatePaymentStatus: function(req, res, next) {
stripe.paymentIntents.retrieve(req.body.secret).then(async(result)=>{
bookingModel.updateOne({"_id": req.params.bookingId},{ $set:{status:'pending',
paymentStatus: 'completed'}}, { new: true },async(err, created) =>{
if(err){
res.json({
err: err,
message: 'error in process'
})
}
else {
  const book = await bookingModel.findOne({"_id": req.params.bookingId}).exec();
  const provider = await userModel.findOne({"_id": book.providerId}).exec();
  const client = await userModel.findOne({"_id": book.userId}).exec();
         const booking = {
           clientName:client.fullname,
           providerName: provider.fullname,
           total: book.amount/100,
           serviceFee: '12',
           services: book.services
         }
         console.log(booking)
           const data = {
             from: 'Glamour on Demand <noreply@glamourondemand.com>',
             to: provider.email,
             subject: 'You Just Got Booked',
             html: providerEmail(booking)
           };
 
           mailgun.messages().send(data, function (error, body) {
             if (error) {
               res.status(401).json({ status: "error", message: 'unable to mail' });
             }
             else {
               const data = {
                 from: 'Glamour on Demand <noreply@glamourondemand.com>',
                 to: client.email,
                 subject: 'Thank You For Your Booking',
                 html: clientEmail(booking)
               };
     
               mailgun.messages().send(data, function (error, body) {
                 if (error) {
                   res.status(401).json({ status: "error", message: 'unable to mail' });
                 }
                 else {
                  res.json({
                    created: created,
                    charge: result,
                    message: "paid successfully"
                    }) 
                 }
               });
 
             }
           });
}
})
});
          //   })
          // const charges = intent.charges.data;
},

updateStatus: function(req, res, next) {
  bookingModel.updateOne({"_id": req.params.bookingId},{ $set:{
  status: req.body.status}}, { new: true }).then(async(result)=>{
  const book = await bookingModel.findOne({"_id": req.params.bookingId}).exec();
  notificationModel.create({
  title: 'Booking Update', 
  body: 'just marked your service as' + req.body.status,
  userId: book.userId,
  providerId: book.providerId,
  bookingId:req.params.bookingId
  }).then((notification)=>{
  res.json({data: result,
  message: "update successful"
  })
})
  })
  //,function(err, created){
  // if(err){
  // res.json({
  // err: err,
  // message: 'error in process'
  // })
  // }
  //else {
  //   notificationModel.create({
  //     title: 'Booking', 
  //     body: 'just marked your service as'+ '' + req.body.status,
  //     userId: created.userId,
  //     providerId: created.providerId,
  //     bookingId:req.params.bookingId
  //     }).exec()
  // res.json({
  // created: created,
  // message: "update successful"
  // })
  //}
  //});
            //   })
            // const charges = intent.charges.data;
  },
  
  getschedule:function(req, res, next){
    bookingModel.find({providerId:req.params.providerId}, function(err, schedule){
      if (err) 
      {next(err);
      } 
      else 
      {
        res.json({
          status: "ok", 
          message: "schedule", 
          data: schedule.filter(item => item.status !== 'completed')
        });
      }
    })
  },


getuserpayout:function(req,res,next){
  const promise = payoutModel.find({userId:req.body.userId}).exec();
  promise.then(payouts => res.status(200).send({
  success: true,
  payouts
  }))
  .catch(err => res.status(500).send({
  success: false,
  error: err
  }));
  },
  


}				