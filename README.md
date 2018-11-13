# Still Beta!

S3 integration for [Vulcan-Files](https://github.com/OrigenStudio/vulcan-files).

## 1. Installation

### Vulcan dependency

This package requires Vulcan `1.11.0` or greater.

### Install the package

In your project's root folder run:
`meteor add origenstudio:vulcan-files-s3`

## Documentation

You can create an S3 client easily with the `createS3Client` function: you only need to provide it your bucket configuration and your CloudFront domain. As always, a stub function is exported in client so you can use this function anywhere.

Since you'll want to have your S3 configuration in your settings, you can retrieve them with Vulcan's `getSetting` function.

```json
{
  "amazonAWSS3": {
    "mainBucket": {
      "cfdomain": "https://yourdomain.cloudfront.net",
      "client": {
        "key": "",
        "secret": "",
        "region": "eu-west-1",
        "bucket": "your-bucket-name"
      }
    }
  }
}
```

Now you can create the S3 client from your settings:

```js
import { getSetting } from 'meteor/vulcan:core';
import createS3Client from 'meteor/origenstudio:vulcan-files-s3';

// make sure the path of the settings match your own!
const s3Client = createS3Client(
  getSetting('amazonAWSS3.mainBucket.client'),
  getSetting('amazonAWSS3.mainBucket.cfdomain'),
);

if (Meteor.isClient) {
  // is empty object so you can safely retrieve properties from it
  console.log(s3Client); //-> {}
}

```

Once you have your client, you can use it to provide the 3rd party parameter that `createFSCollection` expects:

```js
const MyFilesS3 = createFSCollection({
  collectionName: 'MyFilesS3',
  storageProvider: s3Client,
})
```

## Roadmap

- [ ] Move from Knox to aws-sdk for S3 interfacing
