import * as fs from 'fs'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'

const SECRET_NAME = 'dev/translate-webhook'

const client = new SecretsManagerClient({
  region: 'ap-northeast-1'
})

interface SecretValue {
  MICROCMS_SERVICE_DOMAIN: string
  MICROCMS_API_KEY: string
  GOOGLE_APPLICATION_CREDENTIALS_JSON: string
}
const getSecret = async (): Promise<SecretValue> => {
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: SECRET_NAME,
      VersionStage: 'AWSCURRENT' // VersionStage defaults to AWSCURRENT if unspecified
    })
  )
  if (response.SecretString === undefined) {
    throw new Error('SecretString is undefined')
  }
  return JSON.parse(response.SecretString) as SecretValue
}

export const getMicroCmsApiKey = async (): Promise<string> => {
  const secret = await getSecret()
  return secret.MICROCMS_API_KEY
}
export const getMicroCmsDomain = async (): Promise<string> => {
  const secret = await getSecret()
  return secret.MICROCMS_SERVICE_DOMAIN
}
