const config = require('config');

// for reading and writing to files
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = config.get('bucket');
const region = config.get('bucket_region');
const accessKeyId = config.get('aws_access_key');
const secretAccessKey = config.get('aws_secret_access_key');

// instatiating the class - creating an object (user) which lets aws' auth
// system know who's accessing whose and what resources
// console.log(accessKeyId, secretAccessKey); debugging purposes
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// uploads a file to s3
function uploadFile(file) {
    // pass in file name from multer containing the path and the file name
    const fileStream = fs.createReadStream(file.path);

    console.log(file);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.originalname
    };

    // no try-catch block because error middleware handles that
    return s3.upload(uploadParams).promise();
}

// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    };

    // returns the object that gets piped to the response from the server
    // image or video can only be viewed if embedded in a tag (img or video (source tag))
    return s3.getObject(downloadParams).createReadStream();
}

module.exports.uploadFile = uploadFile;
module.exports.getFileStream = getFileStream;
