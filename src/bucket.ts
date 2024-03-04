import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: process.env.STORJ_ACCESS_KEY_ID,
  secretAccessKey: process.env.STORJ_SECRET_KEY,
  endpoint: process.env.STORJ_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  httpOptions: { timeout: 0 },
});

export default s3;
