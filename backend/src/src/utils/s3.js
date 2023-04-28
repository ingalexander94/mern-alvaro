const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { AWS_KEY, AWS_SECRET, AWS_REGION, AWS_BUCKET } = process.env;

const client = new S3Client({
  region: AWS_REGION,
  apiVersion: "latest",
  credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
  },
});

const uploadFile = async (filename, contentType, avatar) => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET,
    Key: `prototype_mern/files/${filename}`,
    Body: avatar,
    ACL: "public-read",
    ContentType: contentType,
  });
  return await client.send(command);
};

const deleteFile = async (filePath) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET,
    Key: `prototype_mern/files/${filePath}`,
    ACL: "public-read",
  });
  return await client.send(command);
};

module.exports = {
  uploadFile,
  deleteFile,
};
