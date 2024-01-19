import type { AWS } from '@serverless/typescript';

import translate from '@functions/translate';

const serverlessConfiguration: AWS = {
  service: 'translate-webhook',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    iam: {
      role: {
        name: 'translate-webhook-role',
        statements: [
          {
            Effect: 'Allow',
            Action: 'secretsmanager:GetSecretValue',
            Resource: 'arn:aws:secretsmanager:${aws:region}:${aws:accountId}:secret:dev/translate-webhook-*'
          }
        ]
      }
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      GOOGLE_CLOUD_PROJECT: 'ankoromochi-6482c',
      GOOGLE_APPLICATION_CREDENTIALS: '/var/task/credentials.json'
    },
    region: 'ap-northeast-1'
  },
  // import the function via paths
  functions: { translate },
  package: { 
    individually: true,
    patterns: [
      './credentials.json'
    ]
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
