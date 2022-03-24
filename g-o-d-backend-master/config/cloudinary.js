const cloudinary = require('cloudinary');

cloudinary.config({
cloud_name: 'glamourod',
api_key: '465923234616297',
api_secret: 'd1RaeTZQZebTJoX9Bl33VZe92kY'
});

exports.uploads = (file) =>{
return new Promise(resolve => {
cloudinary.uploader.upload(file, (result) =>{
resolve({url: result.url, id: result.public_id})
}, {resource_type: "auto"})
})
}