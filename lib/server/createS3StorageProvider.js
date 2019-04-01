import S3 from 'aws-sdk/clients/s3';
import curryUploadToS3 from './curryUploadToS3';
import curryDeleteFromS3 from './curryDeleteFromS3';
import serveFilesFromS3 from './serveFilesFromS3';

/**
 * Creates an S3 storage provider, as needed by {@link createFSCollection}.
 *
 * @param {{key: String, secret: String, region: String, bucket: String}} config
 * @param {String} cfdomain
 * @return {{S3Client: Object, upload: curriedUploadToS3, delete: curriedDeleteFromS3, serve: serveFilesFromS3}}
 */
export default function createS3StorageProvider(config, cfdomain) {
  const S3Client = new S3({
    secretAccessKey: config.secret,
    accessKeyId: config.key,
    region: config.region,
    bucket: config.bucket,
    // sslEnabled: true, // optional
    httpOptions: {
      timeout: 6000,
      agent: false
    }
  });

  return {
    S3Client,
    upload: curryUploadToS3(S3Client, undefined, config.region, config.bucket),
    delete: curryDeleteFromS3(S3Client, config.region, config.bucket),
    serve: serveFilesFromS3,
  };
}
