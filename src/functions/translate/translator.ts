import { TranslationServiceClient } from "@google-cloud/translate"
import {GoogleAuth} from "google-auth-library";

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const location = 'global';

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-translation'
})
const translateClient = new TranslationServiceClient({ auth })
export const translateText = async (text: string): Promise<string> => {
  const request = {
    parent: translateClient.locationPath(projectId, location),
    contents: [text],
    mimeType: 'text/html',
    sourceLanguageCode: 'ja',
    targetLanguageCode: 'en'
  }
  const [response] = await translateClient.translateText(request)
  return response.translations[0].translatedText
}
