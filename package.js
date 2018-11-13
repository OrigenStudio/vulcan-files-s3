Package.describe({
  name: 'origenstudio:vulcan-files-s3',
  version: '1.0.0-alpha.1',
  summary: 'S3 integration for Vulcan-Files',
  git: 'https://github.com/OrigenStudio/vulcan-files-s3',
  documentation: 'README.md'
});

Package.onUse(api => {
  api.versionsFrom('1.6.0.1');

  api.use(['ecmascript']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
