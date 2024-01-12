import type { AWS } from '@serverless/typescript';

import translate from '@functions/translate';

const serverlessConfiguration: AWS = {
  service: 'translate-webhook',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  resources: {
    Resources: {
      TranslateLambdaRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'translate-lambda-role',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: ['lambda.amazonaws.com']
                },
                Action: ['sts:AssumeRole']
              }
            ]
          },
          ManagedPolicyArns: [
            'arn:aws:iam::${aws:accountId}:policy/translate-lambda-managed-policy',
            'arn:aws:iam::aws:policy/TranslateReadOnly'
          ]
        },
        DependsOn: ['TranslateLambdaManagedPolicy']
      },
      TranslateLambdaManagedPolicy: {
        Type: 'AWS::IAM::ManagedPolicy',
        Properties: {
          ManagedPolicyName: 'translate-lambda-managed-policy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'log',
                Effect: 'Allow',
                Action: ['logs:CreateLogStream', 'logs:CreateLogGroup', 'logs:PutLogEvents'],
                Resource: 'arn:aws:logs:${aws:region}:${aws:accountId}:log-group:/aws/lambda/translate-webhook-dev-translate:*'
              }
            ]
          }
        }
      }
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    region: 'ap-northeast-1',
    role: 'TranslateLambdaRole'
  },
  // import the function via paths
  functions: { translate },
  package: { individually: true },
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
