require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME || "my-private-image"
const region = process.env.AWS_BUCKET_REGION || 'us-east-1'
const accessKeyId = process.env.AWS_ACCESS_KEY || "AKIARAJ5M2VGRHGAKPSO"
const secretAccessKey = process.env.AWS_SECRET_KEY || "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream